import { Module } from '@nestjs/common';
import { TuyaService } from './tuya.service';
import { TuyaController } from './tuya.controller';

@Module({
  providers: [TuyaService],
  controllers: [TuyaController]
})
export class TuyaModule {}
