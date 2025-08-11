import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SimulatorGateway } from './simulator.gateway';

@Injectable()
export class SimulatorService {
  private vehicles: any[] = [];

  constructor(private gateway: SimulatorGateway) {
    this.generateVehicles();
  }

  private generateVehicles() {
    for (let i = 1; i <= 5; i++) {
      this.vehicles.push(this.createRandomVehicle(i));
    }
  }

  private createRandomVehicle(id: number) {
    // Coordenadas aproximadas área metropolitana de Medellín
    const latMin = 6.15;
    const latMax = 6.35;
    const lngMin = -75.65;
    const lngMax = -75.45;

    const lat = parseFloat((Math.random() * (latMax - latMin) + latMin).toFixed(6));
    const lng = parseFloat((Math.random() * (lngMax - lngMin) + lngMin).toFixed(6));

    // Falla aleatoria ~20%
    const outOfRoute = Math.random() < 0.2;

    return { id, lat, lng, outOfRoute };
  }


  public getVehicles() {
    return this.vehicles;
  }

  @Interval(5000)
  updateVehicles() {
    this.vehicles = this.vehicles.map(v => this.createRandomVehicle(v.id));
    this.gateway.sendVehicles(this.vehicles); // emitimos a todos
  }
}
