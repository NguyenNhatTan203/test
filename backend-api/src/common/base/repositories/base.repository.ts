import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

export interface PaginatedResult<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalDocs: number;
    totalPages: number;
}

export class BaseRepository<T> extends Repository<T> {
    async paginate(
        queryBuilder: SelectQueryBuilder<T>,
        page: number = 1,
        pageSize: number = 10
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
}
