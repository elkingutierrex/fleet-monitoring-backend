import { Module } from '@nestjs/common';
import { SimulatorGateway } from './simulator/simulator.gateway';
import { SimulatorService } from './simulator/simulator.service';

@Module({
  providers: [SimulatorGateway, SimulatorService],
})
export class AppModule {}