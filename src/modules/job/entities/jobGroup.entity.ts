import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class JobGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    title: string;

    @ManyToOne(() => Job, (job) => job.jobGroup)
    jobs: Job[];

    @Column()
    path: string;

    @Column({
        nullable: true,
    })
    applicationLink: string;

    @Column({
        nullable: true,
    })
    description: string;

    @Column({
        default: false,
    })
    completed: boolean;
}
