import { TuyaService } from './tuya.service';
export declare class TuyaController {
    private readonly tuyaService;
    constructor(tuyaService: TuyaService);
    syncDevices(userId: string, body: {
        tuyaToken?: string;
    }): Promise<any[]>;
    sendCommand(deviceId: string, command: any): Promise<{
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
