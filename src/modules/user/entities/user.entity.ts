import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum UserRole {
    SUPERUSER = 1,
    USER,
    ADMIN,
    GHOST, // TODO this property will be enabled when the user is created and will be changed to USER once the email of the user has been verified
    DELETED, // TODO soft delete feature
}

export const userPrivateFields = ["password", "isEmailConfirmed", "isPhoneConfirmed"];

@Entity({
    name: "enw_user",
})
export class User {
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

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default User;
