import { Address } from "./../../../common/interfaces/Address";
import { Organisation } from "src/modules/organisation/entities/organisation.entity";
import {
    AfterLoad,
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { JobGroup } from "./jobGroup.entity";
import { Skill } from "./skill.entity";

export enum SkillsEnum {
    "Master of Art (M.A)" = "Master of Art (M.A)",
    "Master of Science (M.Sc/M.S)" = "Master of Science (M.Sc/M.S)",
    "Bachelor of Veterinary Science" = "Bachelor of Veterinary Science",
    "Bachelor of Medicine" = "Bachelor of Medicine",
    "Bachelor of Surgery" = "Bachelor of Surgery",
    "Bachelor of Technology/Engineering (B.Tech/B.E)" = "Bachelor of Technology/Engineering (B.Tech/B.E)",
    "Master of Philosophy" = "Master of Philosophy",
    "Master of Veterinary Science" = "Master of Veterinary Science",
    "Mater of Technology/Engineering (M.Tech/M.E)" = "Mater of Technology/Engineering (M.Tech/M.E)",
}

export enum StateEnum {
    "Andhra Pradesh" = "Andhra Pradesh",
    "Arunachal Pradesh" = "Arunachal Pradesh",
    "Assam" = "Assam",
    "Bihar" = "Bihar",
    "Chhattisgarh" = "Chhattisgarh",
    "Goa" = "Goa",
    "Gujarat" = "Gujarat",
    "Haryana" = "Haryana",
    "Himachal Pradesh" = "Himachal Pradesh",
    "Jammu and Kashmir" = "Jammu and Kashmir",
    "Jharkhand" = "Jharkhand",
    "Karnataka" = "Karnataka",
    "Kerala" = "Kerala",
    "Madhya Pradesh" = "Madhya Pradesh",
    "Maharashtra" = "Maharashtra",
    "Manipur" = "Manipur",
    "Meghalaya" = "Meghalaya",
    "Mizoram" = "Mizoram",
    "Nagaland" = "Nagaland",
    "Odisha" = "Odisha",
    "Punjab" = "Punjab",
    "Rajasthan" = "Rajasthan",
    "Sikkim" = "Sikkim",
    "Tamil Nadu" = "Tamil Nadu",
    "Telangana" = "Telangana",
    "Tripura" = "Tripura",
    "Uttarakhand" = "Uttarakhand",
    "Uttar Pradesh" = "Uttar Pradesh",
    "West Bengal" = "West Bengal",
    "Chandigarh" = "Chandigarh",
    "Daman and Diu" = "Daman and Diu",
    "Delhi" = "Delhi",
    "Lakshadweep" = "Lakshadweep",
    "Puducherry" = "Puducherry",
    "Dadra and Nagar Haveli" = "Dadra and Nagar Haveli",
    "Andaman and Nicobar Islands" = "Andaman and Nicobar Islands",
}

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    organisationId: number;

    @ManyToOne(() => Organisation)
    organisation: Organisation;

    @OneToMany(() => JobGroup, (group) => group.jobs)
    @JoinColumn({
        name: "job_group_id",
    })
    jobGroup: JobGroup;

    @Column({ nullable: true })
    viewcount: number;

    @Column({
        type: "boolean",
        nullable: false,
        default: true,
    })
    published: boolean; // admin access

    @Column({
        type: "boolean",
        nullable: false,
        default: true,
    })
    visible: boolean; // employer access

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

    @Column({
        type: "enum",
        enum: StateEnum,
        nullable: true,
    })
    state: StateEnum;

    @Column({
        type: "date",
        nullable: true,
    })
    lastDateOfApplication: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Skill, (skill) => skill.jobs)
    @JoinColumn()
    skills: Skill[];
}
