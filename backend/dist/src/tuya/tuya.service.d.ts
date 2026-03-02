import { PrismaService } from '../prisma.service';
export declare class TuyaService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    fetchUserDevices(userId: string, tuyaToken: string): Promise<any[]>;
    sendCommand(deviceId: string, command: Record<string, any>): Promise<{
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
