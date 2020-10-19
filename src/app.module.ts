import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [],
  providers: [ChatGateway, AlertGateway],
  controllers: [AlertController],
})
export class AppModule {}
