import {
    Column,
    Entity,
    EntityRepository,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn({
        name: "skill",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    name: string;

    @ManyToMany(() => Job, (job) => job.jobGroup)
    jobs: Job[];
}
