import User from "src/modules/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: "enw_organisation",
})
export class Organisation {
    @PrimaryGeneratedColumn({
        name: "organisation_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    description: string;

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
    })
    valid: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.organisation) // specify inverse side as a second parameter
    @JoinColumn({ name: "user_id" })
    user: User;
}

export default Organisation;
