import { Injectable, Scope, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum ServiceLoggerLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    ERROR = 'ERROR',
    NONE = 'NONE'
}

@Injectable({ scope: Scope.TRANSIENT })
export class GreetingLogger extends Logger implements LoggerService {
    private _level: ServiceLoggerLevel;

    get level(): ServiceLoggerLevel {
        return this._level || ServiceLoggerLevel.INFO;
    }

    constructor(private readonly config: ConfigService) {
        super();
        this._level = ServiceLoggerLevel[config.get<string>('logger.level')];
    }

    log(message: string, context?: string) {
        if (this.level == ServiceLoggerLevel.NONE) return;

        if (this.level != ServiceLoggerLevel.ERROR) {
            super.log(message, context);
        }
    }


    info(message:string, context?: string) {
        this.log(message, context);
    }

    debug(message: string, context?: string) {
        if (this.level == ServiceLoggerLevel.NONE) return;

        if (this.level == ServiceLoggerLevel.DEBUG) {
            super.debug(message, context);
        }
    }

}