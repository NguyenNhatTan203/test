import { QueryParamsDto } from "src/common/base/entities/dto/queryParams.dto";
import { SelectQueryBuilder } from "typeorm";

export interface PaginatedResult<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalDocs: number;
    totalPages: number;
}

export async function paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    page: number,
    pageSize: number
): Promise<PaginatedResult<T>> {

    const [data, totalDocs] = await queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

    const totalPages = Math.ceil(totalDocs / pageSize);

    return {
        data,
        currentPage: page,
        pageSize,
        totalDocs,
        totalPages,
    };
}
