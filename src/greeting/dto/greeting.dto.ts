import { ApiProperty } from '@nestjs/swagger';

export class CountryDataDTO {
    @ApiProperty()
    country?: string;
    @ApiProperty()
    code?: string;
    @ApiProperty()
    vat?: number;
}