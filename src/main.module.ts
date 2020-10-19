import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { GreetingModule } from './greeting/greeting.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[configuration]
        }),
        LoggerModule.forRoot({ isGlobal: true }),
        GreetingModule
    ]
})
export class MainModule {}
