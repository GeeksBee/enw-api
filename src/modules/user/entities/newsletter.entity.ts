import Session from "../../../authentication/entities/session.entity";
import {
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

@Entity()
export class Newsletter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    filename: string;

    @Column({
        type: "boolean",
        nullable: true,
        default: true,
    })
    published: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default Newsletter;
