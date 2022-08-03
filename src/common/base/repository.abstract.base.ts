import { DeleteResult, Repository } from "typeorm";
import { BaseInterfaceRepository } from "./repository.interface.base";

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public create(data: T | any): Promise<T> {
        return this.entity.save(data);
    }

    public findOneById(id: number): Promise<T> {
        return this.entity.findOne(id);
    }

    public findByCondition(filterCondition: object): Promise<T> {
        return this.entity.findOne({ where: filterCondition });
    }

    public findAll(arg1?: unknown, arg2?: unknown, arg3?: unknown): Promise<T[]> {
        // filterOptions, limit, offset
        if (typeof arg1 === "object" && typeof arg2 === "number" && typeof arg3 === "number") {
            return this.entity.find({
                where: arg1 as object,
                take: arg2 as number,
                skip: arg3 as number,
            });
        }
        // limit, offset
        else if (typeof arg1 === "number" && typeof arg2 === "number") {
            return this.entity.find({
                take: arg1 as number,
                skip: arg2 as number,
            });
        }
        // filterOptions
        else if (typeof arg1 === "object") {
            return this.entity.find({
                where: arg1,
            });
        } else {
            return this.entity.find();
        }
    }

    public count(): Promise<number> {
        return this.entity.count();
    }

    public update(data: T | any): Promise<T> {
        return this.entity.save(data);
    }

    public remove(id: number): Promise<DeleteResult> {
        return this.entity.delete(id);
    }

    public findWithRelations(relations: any): Promise<T[]> {
        return this.entity.find(relations);
    }
}
