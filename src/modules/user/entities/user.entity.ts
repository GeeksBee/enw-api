import Session from "../../../authentication/entities/session.entity";
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
import Organisation from "src/modules/organisation/entities/organisation.entity";
import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Remainder } from "../../user-profile/entities/remainder.entity";

export enum UserRole {
    SUPERADMIN,
    ADMIN,
    EMPLOYER,
    APPLICANT,
    GHOST, // TODO this property will be enabled when the user is created and will be changed to USER once the email of the user has been verified
    DELETED, // TODO soft delete feature
}
const roles = Object.values(UserRole).filter((item) => typeof item === "string");
export type userRoles = typeof roles[number];

export const userPrivateFields = ["password", "isEmailConfirmed", "isPhoneConfirmed"];
export type userPrivateKeys = "password" | "isEmailConfirmed" | "isPhoneConfirmed";

@Entity({
    name: "enw_user",
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: "user_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: true,
        unique: true,
    })
    email: string;

    @Column({ default: false, name: "is_email_confirmed" })
    public isEmailConfirmed: boolean;

    @Column({
        type: "varchar",
        nullable: true,
        unique: true,
    })
    phone: string;

    @Column({ default: false, name: "is_phone_confirmed" })
    public isPhoneConfirmed: boolean;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role: UserRole;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    })
    previousRole: UserRole;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

    @OneToOne(() => Organisation, (organisation) => organisation.user)
    organisation: Organisation;

    @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
    userProfile: UserProfile;

    @OneToMany(() => Remainder, (remainder) => remainder.user, { eager: true })
    @JoinColumn()
    remainders: Remainder[];
}

export default User;
