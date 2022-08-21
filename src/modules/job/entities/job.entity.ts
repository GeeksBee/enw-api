import { Address } from "./../../../common/interfaces/Address";
import { Organisation } from "src/modules/organisation/entities/organisation.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    jobId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    organisationId: number;

    @ManyToOne(() => Organisation)
    organisation: Organisation;

    @Column()
    minAge: number;

    @Column()
    maxAge: number;

    @Column({
        type: "json",
    })
    salaryRange: {
        start: number;
        end: number;
        meta?: string;
    };

    @Column()
    yearsOfExperience: number;

    @Column()
    pincode: string;

    @Column({
        type: "json",
        nullable: true,
    })
    address: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
