import { Server, Socket } from 'socket.io';
import { TuyaService } from '../tuya/tuya.service';
export declare class AppGateway {
    private readonly tuyaService;
    server: Server;
    private readonly logger;
    constructor(tuyaService: TuyaService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handlePing(): string;
    handleToggleDevice(payload: {
        deviceId: string;
        turnOn: boolean;
    }, client: Socket): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tuyaId: string | null;
        type: import("@prisma/client").$Enums.DeviceType;
        isOn: boolean;
        settings: import("@prisma/client/runtime/client").JsonValue | null;
        roomId: string;
    }>;
}
