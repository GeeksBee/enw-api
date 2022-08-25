import User, { userPrivateFields } from "src/modules/user/entities/user.entity";
import { SkillsEnum, StateEnum } from "./../../job/entities/job.entity";
import {
    AfterLoad,
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum CategoryEnum {
    GEN,
    GEN_EWS,
    OBC,
    OBC_NCL,
    ST,
    SC,
}

export enum ApplicantGender {
    MALE,
    FEMALE,
    OTHER,
}

export type ApplicantAddress = {
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    countryCode: string;
    district: string;
};
@Entity()
export class UserProfile extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: "user_profile_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    description: string;

    @Column({
        type: "int",
        nullable: true,
    })
    age: number;

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
    })
    isPWD: boolean;

    @Column({
        type: "enum",
        enum: CategoryEnum,
        nullable: false,
        default: CategoryEnum.GEN,
    })
    category: CategoryEnum;

    @Column({
        type: "enum",
        enum: ApplicantGender,
        nullable: false,
        default: ApplicantGender.MALE,
    })
    gender: ApplicantGender;

    @Column({
        type: "boolean",
        nullable: false,
        default: true,
    })
    isWillingToTravel: boolean;

    @Column({
        type: "enum",
        enum: StateEnum,
        nullable: true,
    })
    state: StateEnum;

    @Column({
        type: "json",
        nullable: true,
    })
    address: ApplicantAddress;

    @OneToOne(() => User, (user) => user.userProfile, { eager: true }) // specify inverse side as a second parameter
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({
        type: "simple-array",
        nullable: true,
    })
    skills: SkillsEnum[];

    @AfterLoad()
    serialize() {
        userPrivateFields.forEach((field) => (this.user[field] = undefined));
    }
}
