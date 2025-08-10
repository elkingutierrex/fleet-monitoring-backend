import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";

@Injectable()
export class SimulatorService {

  private vehicles = [
    { id: 1, lat: 10, lng: -84 },
    { id: 2, lat: 10.1, lng: -84.1 },
    { id: 3, lat: 9.9, lng: -84.05 },   
    { id: 4, lat: 10.6, lng: -84.15 },
    { id: 5, lat: 9.59, lng: -84.52 }
  ];

  @Interval(9000)
  simulate() {
    this.vehicles = this.vehicles.map(v => ({
      ...v,
      lat: v.lat + (Math.random() - 0.5) * 0.01,
      lng: v.lng + (Math.random() - 0.5) * 0.01
    }));
    console.log("📡 Vehículos simulados:", this.vehicles);
  }

  getVehicles() {
    return this.vehicles;
  }
}
