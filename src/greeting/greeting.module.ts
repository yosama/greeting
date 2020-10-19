import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';
import { JsonbinService } from './jsonbin.service';

@Module({
    imports:[ConfigModule],
    controllers: [GreetingController],
    providers: [GreetingService, JsonbinService]
})
export class GreetingModule {}
