import { Chance } from 'chance';
const chance = new Chance();

import { CountryDataDTO } from '../../src/greeting/dto/greeting.dto';

export function newJsonbinData() {
  const countriesData: CountryDataDTO = {
    code: chance.country(),
    vat: chance.integer({ min: 0, max: 30 }),
    country: chance.country({ full: true })
  };
  return countriesData;
}

export const validJsonbinData = newJsonbinData();

const listLength = 10;

export const countriesList =
    new Array(listLength).fill(undefined).map(_ => newJsonbinData());

countriesList.splice(chance.integer({ min: 1, max: listLength }), 0, validJsonbinData);

export class JsonbinServiceMock {

  getCountries(): Promise<CountryDataDTO[]> {
    return Promise.resolve(countriesList);
  }
}


