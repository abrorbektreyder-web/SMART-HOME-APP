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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const tuya_service_1 = require("../tuya/tuya.service");
let AppGateway = AppGateway_1 = class AppGateway {
    tuyaService;
    server;
    logger = new common_1.Logger(AppGateway_1.name);
    constructor(tuyaService) {
        this.tuyaService = tuyaService;
    }
    afterInit() {
        this.logger.log('WebSocket Gateway Initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client Connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }
    handlePing() {
        return 'pong';
    }
    async handleToggleDevice(payload, client) {
        this.logger.log(`Toggle Device Requested via WS: ${payload.deviceId}`);
        const updatedDevice = await this.tuyaService.sendCommand(payload.deviceId, { turnOn: payload.turnOn });
        this.server.emit('device_state_changed', updatedDevice);
        return updatedDevice;
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppGateway.prototype, "handlePing", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('toggle_device'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleToggleDevice", null);
exports.AppGateway = AppGateway = AppGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [tuya_service_1.TuyaService])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map