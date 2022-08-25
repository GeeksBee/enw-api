import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    name: string;

    @ManyToMany(() => Job, (job) => job.jobGroup)
    jobs: Job[];
}
