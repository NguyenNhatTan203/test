import { IsOptional, IsString, IsInt, IsDateString, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class QueryParamsDto {
    @IsOptional()
    page: number;

    @IsOptional()
    pageSize: number;

    @IsOptional()
    @IsDateString()
    departureDate: string;

    @IsOptional()
    @IsString()
    startTime: string;

    @IsOptional()
    @IsString()
    companyName: string;

    @IsOptional()
    @IsString()
    startPoint: string;

    @IsOptional()
    @IsString()
    destination: string;

    @IsOptional()
    @IsDateString()
    returnDate: string;

    @IsOptional()
    @IsString()
    departureTime: string;

    @IsOptional()
    @IsString()
    busOperator: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    pickupPoint: string;

    @IsOptional()
    @IsString()
    dropOffPoint: string;

    @IsOptional()
    @IsBoolean()
    popularFilter: boolean;

    @IsOptional()
    @IsString()
    setPosition: string;

    @IsOptional()
    @IsString()
    typeOfSeat: string;

    @IsOptional()
    @IsInt()
    Rating: number;

    @IsOptional()
    @IsString()
    sort: string;

    @IsOptional()
    @IsString()
    sortType: string;

    @IsOptional()
    search: string

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    routeId: string;
}
