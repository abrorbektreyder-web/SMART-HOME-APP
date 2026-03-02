import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TuyaService {
    private readonly logger = new Logger(TuyaService.name);

    constructor(private prisma: PrismaService) { }

    // Bu funksiya orqali asl Tuya Cloud API chaqiriladi, hozir mock ma'lumotlar bilan ishlaymiz
    async fetchUserDevices(userId: string, tuyaToken: string) {
        this.logger.log(`Fetching Tuya devices for user ${userId}...`);

        // Tasavvur qilamiz: Tuya Cloud 3 ta qurilma qaytardi
        const mockTuyaDevices = [
            { id: 'tuya_light_1', name: 'Oshxona chirog`i', type: 'LIGHT' },
            { id: 'tuya_plug_1', name: 'Muzlatgich Rozetkasi', type: 'PLUG' },
            { id: 'tuya_climate_1', name: 'Zal Konditsioneri', type: 'CLIMATE' },
        ];

        // Bu qurilmalarni bazamizga sinxronizatsiya qilamiz
        // Default holatda 1 ta xona yratib (agar yo'q bo'lsa), shunga biriktiramiz
        let defaultRoom = await this.prisma.room.findFirst({ where: { userId } });
        if (!defaultRoom) {
            defaultRoom = await this.prisma.room.create({
                data: { name: 'Asosiy xona', userId }
            });
        }

        const savedDevices = [];
        for (const dev of mockTuyaDevices) {
            const device = await this.prisma.device.upsert({
                where: { tuyaId: dev.id },
                update: { name: dev.name },
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

        // Haqiqiy Tuya API "Send Command" metodi chaqirilishi kerak shu yerda.
        // MVP uchun biz bazadagi holatni (isOn) yangilab qo'yamiz.
        const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
        if (!device) throw new Error('Device not found');

        let updateData: any = {};
        if (command.turnOn !== undefined) {
            updateData.isOn = command.turnOn;
        }
        if (command.temp !== undefined) {
            updateData.settings = { ...((device.settings as any) || {}), temp: command.temp };
        }

        return this.prisma.device.update({
            where: { id: deviceId },
            data: updateData
        });
    }
}
