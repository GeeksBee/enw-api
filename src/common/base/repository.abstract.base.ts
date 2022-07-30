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

    public findByCondition(filterCondition: any): Promise<T> {
        return this.entity.findOne({ where: filterCondition });
    }

    public findAll(): Promise<T[]> {
        return this.entity.find();
    }

    public remove(id: number): Promise<DeleteResult> {
        return this.entity.delete(id);
    }

    public findWithRelations(relations: any): Promise<T[]> {
        return this.entity.find(relations);
    }
}
