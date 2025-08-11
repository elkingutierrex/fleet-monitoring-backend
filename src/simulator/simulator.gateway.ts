import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SimulatorGateway {
  @WebSocketServer()
  server: Server;


  public sendVehicles(vehicles: any[]) {
    this.server.emit('vehicles', vehicles);
    console.log('Vehicles sent to clients:', vehicles);
  }
}
