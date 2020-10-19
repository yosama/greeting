import { CountryDataDTO } from './dto/greeting.dto';
import { Order } from './dto/request/get.country.dto';

export function sort(
    countries: CountryDataDTO[],
    order: string
): CountryDataDTO[] {

    const result = countries.sort((a: any, b: any) => {

        return order?.toUpperCase() == Order.ASC
            ? a.vat - b.vat
            : b.vat - a.vat;
    });

    return result;
}
