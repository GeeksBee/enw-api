import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepository } from "src/common/base/repository.abstract.base";
import { Repository } from "typeorm";
import User from "./entities/user.entity";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";

@Injectable()
export class UserRepository
    extends BaseAbstractRepository<User>
    implements UserRepositoryInterface
{
    constructor(@InjectRepository(User) usersRepository: Repository<User>) {
        super(usersRepository);
    }
}
