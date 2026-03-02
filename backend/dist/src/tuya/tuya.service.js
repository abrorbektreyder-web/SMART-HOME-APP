"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TuyaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuyaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TuyaService = TuyaService_1 = class TuyaService {
    prisma;
    logger = new common_1.Logger(TuyaService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchUserDevices(userId, tuyaToken) {
        this.logger.log(`Fetching Tuya devices for user ${userId}...`);
        const mockTuyaDevices = [
            { id: 'tuya_light_1', name: 'Oshxona chirog`i', type: 'LIGHT' },
            { id: 'tuya_plug_1', name: 'Muzlatgich Rozetkasi', type: 'PLUG' },
            { id: 'tuya_climate_1', name: 'Zal Konditsioneri', type: 'CLIMATE' },
        ];
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
                    type: dev.type,
                    roomId: defaultRoom.id,
                },
            });
            savedDevices.push(device);
        }
        return savedDevices;
    }
    async sendCommand(deviceId, command) {
        this.logger.log(`Sending command to device ${deviceId}: ${JSON.stringify(command)}`);
        const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
        if (!device)
            throw new Error('Device not found');
        let updateData = {};
        if (command.turnOn !== undefined) {
            updateData.isOn = command.turnOn;
        }
        if (command.temp !== undefined) {
            updateData.settings = { ...(device.settings || {}), temp: command.temp };
        }
        return this.prisma.device.update({
            where: { id: deviceId },
            data: updateData
        });
    }
};
exports.TuyaService = TuyaService;
exports.TuyaService = TuyaService = TuyaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TuyaService);
//# sourceMappingURL=tuya.service.js.map