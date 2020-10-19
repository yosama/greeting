import {
    Controller, UseFilters,
    Get, Query, HttpStatus,
    Param, Put
} from '@nestjs/common';
import {
    ApiResponse, ApiTags,
    ApiQuery, ApiParam
} from '@nestjs/swagger';

import {
    GetCountryDTO, GetCountryPipe, Order
} from './dto/request/get.country.dto';
import { ParamPipe, ParamsDTO } from './dto/request/param.dto';
import {
    CreateGreetingDTO,
    CreateGreetingPipe,
} from './dto/request/create.greeting.dto';
import {
    CountryDataDTO,
} from './dto/greeting.dto';
import { GreetingService } from './greeting.service';

import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

@Controller()
@ApiTags('Greeting')
@UseFilters(HttpExceptionFilter)
export class GreetingController {
    constructor(private readonly greetingService: GreetingService) {}

    @Get('/countries')
    @ApiQuery({ name: 'filter', type: String, required: false })
    @ApiQuery({ name: 'order', type: String, enum: Order, required: false })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The data was successfully returned',
        type: CountryDataDTO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Request doesn\'t meet the schema',
        type: ServiceHttpResponse
    })
    getCountryData(
        @Query(GetCountryPipe) queryParams: GetCountryDTO
    ): Promise<CountryDataDTO[]> {
        return this.greetingService.getCountryData(queryParams);
    }

    @Get('/reverse/:urlParam')
    @ApiParam({ name: 'urlParam', type: String })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The data was successfully returned',
        type: String
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Request doesn\'t meet the schema',
        type: ServiceHttpResponse
    })
    readResource(@Param(ParamPipe) params: ParamsDTO): string {
        return this.greetingService.reverse(params.urlParam);
    }

    @Put('/append')
    @ApiQuery({ name: 'start', type: String, required: false })
    @ApiQuery({ name: 'end', type: String, required: false })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The data was successfully returned',
        type: String,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Request doesn\'t meet the schema',
        type: ServiceHttpResponse
    })
    updateGreetingList(
        @Query(CreateGreetingPipe) queryParams: CreateGreetingDTO
    ): string[] {
        return this.greetingService.updateGreetingList(queryParams);
    }

}
