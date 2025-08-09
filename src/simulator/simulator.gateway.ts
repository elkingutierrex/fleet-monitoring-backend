import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SimulatorService } from './simulator.service';

@WebSocketGateway({ cors: true })
export class SimulatorGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private simulatorService: SimulatorService) {}

  afterInit() {
    this.simulatorService.start(this.server);
  }
}
