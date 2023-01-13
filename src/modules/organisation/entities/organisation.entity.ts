import { Job } from "src/modules/job/entities/job.entity";
import User from "src/modules/user/entities/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import OrganisationTypeEnum from "./organisationType.enum";

@Entity()
export class Organisation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    description: string;

    @Column({
        name: "organisation_type",
        type: "enum",
        enum: OrganisationTypeEnum,
        default: OrganisationTypeEnum.PUBLIC_SECTOR_UNDERTAKING,
    })
    organisationType: OrganisationTypeEnum;

    @OneToMany(() => Job, (job) => job.organisation)
    jobs: Job[];

    // details
    @Column({
        type: "varchar",
        nullable: true,
    })
    gstNumber: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    PANnumber: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    companyRegistrationNumber: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    location: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    address: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    industry: string;

    // end details

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
    })
    valid: boolean;

    @OneToOne(() => User, (user) => user.organisation) // specify inverse side as a second parameter
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Organisation;
