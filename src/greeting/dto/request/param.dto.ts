import * as Joi from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';


export class ParamsDTO {
    @ApiProperty()
    urlParam: string;
}

export const ParamSchema = Joi.object({
    urlParam:Joi.string().required()
    .label('urlParam').description('Append value to the start of the array')
});

export const ParamPipe = new JoiValidationPipe(ParamSchema);