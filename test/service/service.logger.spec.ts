import { ConfigService } from '@nestjs/config';

import { GreetingLogger } from '../../src/logger/logger.service';

test('Testing log method', () => {
    const ONE_TIME = 1;
    const msg = 'message';
    const logger = new GreetingLogger(new ConfigService());
    const spy = jest.spyOn(logger, 'log');

    logger.log(msg);

    expect(spy).toHaveBeenCalledTimes(ONE_TIME);
});