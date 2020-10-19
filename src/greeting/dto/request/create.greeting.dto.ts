import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export class CreateGreetingDTO {
    @ApiProperty()
    readonly start: string;
    @ApiProperty()
    readonly end: string;
}

export const CreateGreetingSchema = Joi.object({
    start: Joi.string().optional()
        .label('start').description('Append value to the start of the array'),
    end: Joi.string().optional()
        .label('end').description('Append value to the end of the array')
});

export const CreateGreetingPipe = new JoiValidationPipe(CreateGreetingSchema);