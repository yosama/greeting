import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export enum Order {
    'ASC' = 'ASC',
    'DESC' = 'DESC'
}

const validOptions = Object.keys(Order);

export class GetCountryDTO {
    @ApiProperty()
    readonly filter: string;
    @ApiProperty({ enum: validOptions })
    readonly order: string;
}

export const GetCountrySchema = Joi.object({
    filter: Joi.string().optional()
        .label('filter').description('Filter by country or code'),
    order: Joi.string().optional()
        .valid(...validOptions).uppercase().default(Order.ASC)
        .label('order').description('Order list ascending or descending')
});

export const GetCountryPipe = new JoiValidationPipe(GetCountrySchema);