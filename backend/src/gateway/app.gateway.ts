import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { TuyaService } from '../tuya/tuya.service';

@WebSocketGateway({
    cors: {
        origin: '*', // Ilovaga ruxsat
    },
})
export class AppGateway {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(AppGateway.name);

    constructor(private readonly tuyaService: TuyaService) { }

    afterInit() {
        this.logger.log('WebSocket Gateway Initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client Connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }

    @SubscribeMessage('ping')
    handlePing(): string {
        return 'pong';
    }

    // Real time buyruqni qabul qilish va barcha qurilmalarga tarqatish
    @SubscribeMessage('toggle_device')
    async handleToggleDevice(
        @MessageBody() payload: { deviceId: string; turnOn?: boolean; temp?: number },
        @ConnectedSocket() client: Socket,
    ) {
        this.logger.log(`Toggle Device Requested via WS: ${payload.deviceId} - data: ${JSON.stringify(payload)}`);

        // DB ni va Tuya Service ni yangilaymiz
        const updatedDevice = await this.tuyaService.sendCommand(payload.deviceId, {
            turnOn: payload.turnOn,
            temp: payload.temp
        });

        // O'zgarish bo'lganini hamma ulanganlarga aytamiz (real-time UI update)
        this.server.emit('device_state_changed', updatedDevice);

        return updatedDevice;
    }
}
