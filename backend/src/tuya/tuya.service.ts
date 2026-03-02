import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';

@Injectable()
export class TuyaService {
    private readonly logger = new Logger(TuyaService.name);
    private tuya: TuyaContext | null = null;

    constructor(private prisma: PrismaService) {
        // Tuya API ga ulash uchun konfiguratsiyani `.env` dan uqiymiz
        const accessKey = process.env.TUYA_ACCESS_KEY;
        const secretKey = process.env.TUYA_SECRET_KEY;
        const baseUrl = process.env.TUYA_BASE_URL || 'https://openapi.tuyaeu.com'; // O'zbekiston / Yevropa uchun

        if (accessKey && secretKey) {
            this.tuya = new TuyaContext({
                baseUrl,
                accessKey,
                secretKey,
            });
            this.logger.log('Tuya SDK muvaffaqiyatli initsializatsiya qilindi.');
        } else {
            this.logger.warn('Tuya API kalitlari (TUYA_ACCESS_KEY, TUYA_SECRET_KEY) .env faylda topilmadi! Dastur hozircha "Yolg\'ondakam (Mock) Rejim" da ishlaydi.');
        }
    }

    // Bu funksiya orqali asl Tuya Cloud API chaqiriladi, yo'y bo'lsa mock ishlaydi
    async fetchUserDevices(userId: string, tuyaUserId?: string) {
        this.logger.log(`Fetching Tuya devices for user ${userId}...`);

        let apiDevices = [];

        // Agar haqiqiy Tuya API ulangan bo'lsa
        if (this.tuya && tuyaUserId) {
            try {
                // Tuya tizimidagi foydalanuvchining qurilmalarini olish
                const response = await this.tuya.request({
                    path: `/v1.0/users/${tuyaUserId}/devices`,
                    method: 'GET',
                });

                if (response && response.success) {
                    apiDevices = response.result.map(d => ({
                        id: d.id,
                        name: d.name,
                        type: this.mapTuyaCategoryToOurType(d.category),
                    }));
                }
            } catch (err) {
                this.logger.error('Tuya API dan qurilmalarni olishda xatolik:', err);
            }
        }

        // Agar Hech vaqo kelmasa YOKI Tuya umuman ulanmagan bo'lsa MOCK array
        if (apiDevices.length === 0) {
            apiDevices = [
                { id: 'tuya_light_1', name: 'Oshxona chirog`i', type: 'LIGHT' },
                { id: 'tuya_plug_1', name: 'Muzlatgich Rozetkasi', type: 'PLUG' },
                { id: 'tuya_climate_1', name: 'Zal Konditsioneri', type: 'CLIMATE' },
            ];
        }

        // Bu qurilmalarni bazamizga sinxronizatsiya qilamiz
        let defaultRoom = await this.prisma.room.findFirst({ where: { userId } });
        if (!defaultRoom) {
            defaultRoom = await this.prisma.room.create({
                data: { name: 'Asosiy xona', userId }
            });
        }

        const savedDevices: any[] = [];
        for (const dev of apiDevices) {
            const device = await this.prisma.device.upsert({
                where: { tuyaId: dev.id },
                update: { name: dev.name, type: dev.type as any },
                create: {
                    name: dev.name,
                    tuyaId: dev.id,
                    type: dev.type as any, // Enum
                    roomId: defaultRoom.id,
                },
            });
            savedDevices.push(device);
        }

        return savedDevices;
    }

    async sendCommand(deviceId: string, command: Record<string, any>) {
        this.logger.log(`Sending command to device ${deviceId}: ${JSON.stringify(command)}`);

        // Tuya formatidagi buyruqlar massivi (commands array)
        const tuyaCommands = [];

        if (command.turnOn !== undefined) {
            tuyaCommands.push({ code: 'switch', value: command.turnOn });
            tuyaCommands.push({ code: 'switch_led', value: command.turnOn }); // chiroqlar uchun parallel yuboramiz
            tuyaCommands.push({ code: 'switch_1', value: command.turnOn }); // ba'zi pluglar uchun
        }

        if (command.temp !== undefined) {
            // Konditsionerlar temp set funksiyasi turi
            tuyaCommands.push({ code: 'temp_set', value: command.temp });
        }

        // Agar Haqiqiy API bo'lsa Real buyruq beramiz
        if (this.tuya && !deviceId.startsWith('tuya_')) {
            try {
                await this.tuya.request({
                    path: `/v1.0/devices/${deviceId}/commands`,
                    method: 'POST',
                    body: { commands: tuyaCommands },
                });
            } catch (err) {
                this.logger.error('Tuya API ga buyruq yuborishda xatolik:', err);
                // Shunday bo'lsa ham pastdagi o'zimizning bazaga saqlab qoyaveramiz, client optimistik ko'radi
            }
        }

        // MVP uchun biz bazadagi holatni (isOn, temp) o'zimizda ham saqlab yangilab qo'yamiz.
        const device = await this.prisma.device.findUnique({ where: { tuyaId: deviceId } });
        if (!device) return { success: false };

        let updateData: any = {};
        if (command.turnOn !== undefined) updateData.isOn = command.turnOn;
        if (command.temp !== undefined) updateData.settings = { ...((device.settings as any) || {}), temp: command.temp };

        return this.prisma.device.update({
            where: { id: device.id },
            data: updateData
        });
    }

    private mapTuyaCategoryToOurType(category: string): string {
        switch (category) {
            case 'dj': // chiroq
            case 'dd': // led
                return 'LIGHT';
            case 'cz': // switch/socket
            case 'pc': // power strip
                return 'PLUG';
            case 'kt': // air conditioner
                return 'CLIMATE';
            default:
                return 'OTHER';
        }
    }
}
