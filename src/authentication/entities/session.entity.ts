import User from "../../modules/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "boolean",
        nullable: false,
        default: true,
    })
    valid: boolean;

    @ManyToOne(() => User, (user) => user.sessions, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}

export default Session;
