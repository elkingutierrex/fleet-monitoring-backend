import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  status: 'OK' | 'FALLA';
}

@Injectable()
export class SimulatorService {
  private vehicles: Vehicle[] = [];

  constructor() {
    for (let i = 1; i <= 5; i++) {
      this.vehicles.push({
        id: `V${i}`,
        lat: 10 + Math.random(),
        lng: -84 + Math.random(),
        status: 'OK',
      });
    }
  }

  start(server: Server) {
    setInterval(() => {
      this.vehicles = this.vehicles.map((v) => {
        const dx = (Math.random() - 0.5) * 0.01;
        const dy = (Math.random() - 0.5) * 0.01;
        const fail = Math.random() < 0.15;

        return {
          ...v,
          lat: v.lat + dx,
          lng: v.lng + dy,
          status: fail ? 'FALLA' : 'OK',
        };
      });

      server.emit('vehicle-positions', this.vehicles);
    }, 3000);
  }
}
