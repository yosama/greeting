import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { CountryDataDTO } from 'src/greeting/dto/greeting.dto';

@Injectable()
export class JsonbinService {
    private api: string;

    constructor(private readonly config: ConfigService) {
        this.api = this.config.get<string>('jsonbin.api');
    }

    getCountries(): Promise<CountryDataDTO[]> {
        return axios.get(this.api)
            .then(res => res.data);
    }
}