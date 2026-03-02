import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TuyaService } from './tuya.service';

@Controller('tuya')
export class TuyaController {
    constructor(private readonly tuyaService: TuyaService) { }

    @Post('sync/:userId')
    async syncDevices(@Param('userId') userId: string, @Body() body: { tuyaToken?: string }) {
        return this.tuyaService.fetchUserDevices(userId, body.tuyaToken || 'mock-token');
    }

    @Post('command/:deviceId')
    async sendCommand(@Param('deviceId') deviceId: string, @Body() command: any) {
        return this.tuyaService.sendCommand(deviceId, command);
    }
}
