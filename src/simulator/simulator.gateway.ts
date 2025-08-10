import {
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { SimulatorService } from "./simulator.service";
import { Interval } from "@nestjs/schedule";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class SimulatorGateway {
  @WebSocketServer()
  server: Server;

  constructor(private simulatorService: SimulatorService) {}

  @Interval(5000)
  sendUpdates() {
    const vehicles = this.simulatorService.getVehicles();
    this.server.emit("vehiclesUpdate", vehicles);
    console.log("Emitiendo vehículos al frontend");
  }
}
