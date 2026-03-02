import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TuyaModule } from './tuya/tuya.module';

@Module({
  imports: [AuthModule, TuyaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
