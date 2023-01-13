import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateAdminDto from "../dtos/admin/createAdmin.dto";
import Newsletter from "../entities/newsletter.entity";
import User from "../entities/user.entity";

@Injectable()
export default class NewsletterService {
    constructor(@InjectRepository(Newsletter) private readonly nsRepo: Repository<Newsletter>) {}

    public createNewsletter(filename: string): Promise<Newsletter> {
        const ns = this.nsRepo.create({ filename });
        return this.nsRepo.save(ns);
    }

    public findAll() {
        return this.nsRepo.find();
    }
}
