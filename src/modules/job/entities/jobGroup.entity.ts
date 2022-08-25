import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class JobGroup {
    @PrimaryGeneratedColumn({
        name: "job_group",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    name: string;

    @ManyToOne(() => Job, (job) => job.jobGroup)
    jobs: Job[];
}
