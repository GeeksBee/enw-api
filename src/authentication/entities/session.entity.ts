import User from "../../modules/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
    name: "enw_session",
})
export class Session {
    @PrimaryGeneratedColumn({
        name: "session_id",
    })
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
