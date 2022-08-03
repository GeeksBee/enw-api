import { DeleteResult } from "typeorm";

export interface BaseInterfaceRepository<T> {
    create(data: T | any): Promise<T>;

    findOneById(id: number): Promise<T>;

    findByCondition(filterCondition: object): Promise<T>;

    findAll(): Promise<T[]>;

    findAll(filterCondition: object): Promise<T[]>;

    findAll(limit: number, offset: number): Promise<T[]>;

    findAll(filterCondition: object, limit: number, offset: number): Promise<T[]>;

    count(): Promise<number>;

    update(data: T | any): Promise<T>;

    remove(id: number): Promise<DeleteResult>;

    findWithRelations(relations: any): Promise<T[]>;
}
