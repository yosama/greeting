import { Injectable } from '@nestjs/common';

import { GetCountryDTO } from './dto/request/get.country.dto';
import {
    CountryDataDTO,
} from './dto/greeting.dto';
import { GreetingLogger } from '../logger/logger.service';
import { JsonbinService } from './jsonbin.service';
import {
    sort
} from './greeting.helpers';

@Injectable()
export class GreetingService {

    constructor(
        private readonly logger: GreetingLogger,
        private readonly jsonbinService: JsonbinService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    getCountryData(queryParams: GetCountryDTO): Promise<CountryDataDTO[]> {
        this.logger.debug(`Getting all countries data that
            contain ${queryParams.filter} and order ${queryParams.order}
        `);

        return this.jsonbinService.getCountries()
            .then(countries => {
                let response = countries;

                if (queryParams.filter) {
                    const regex = new RegExp(queryParams.filter, 'i');
                    response = countries.filter(({ country, code }) =>
                        regex.test(country) || regex.test(code));
                }
                return sort(response, queryParams.order);
            })
            .catch(err => {
                this.logger.error(` Error: ${err}`);

                return err;
            });
    }

    reverse(urlParam:string): string {
        this.logger.debug(`Reversing url param '${ urlParam }'`);

        return urlParam.split('')
            .reverse()
            .join('');
    }
}
