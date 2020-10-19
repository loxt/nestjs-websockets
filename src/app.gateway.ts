import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8081, {
  path: '/websockets',
  serveClient: true,
  namespace: '/',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server): any {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.error(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.error(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text);
    // return { event: 'msgToClient', data: text };
  }
}
