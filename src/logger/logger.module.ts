import { DynamicModule, Module } from '@nestjs/common';

import { GreetingLogger } from './logger.service';

type LoggerModuleOptions = {
    isGlobal?: boolean;
};

@Module({
    imports: [],
    providers: [GreetingLogger],
    exports: [GreetingLogger]
})
export class LoggerModule {
    static forRoot(options: LoggerModuleOptions = {}): DynamicModule {
        return {
            module: LoggerModule,
            global: options.isGlobal
        };
    }
}