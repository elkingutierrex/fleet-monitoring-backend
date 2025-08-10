import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SimulatorService } from "./simulator/simulator.service";
import { SimulatorGateway } from "./simulator/simulator.gateway";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [SimulatorService, SimulatorGateway],
})
export class AppModule {}
