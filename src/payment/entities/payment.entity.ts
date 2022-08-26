import User from "../../modules/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum PaymentType {
    NOTIFICATION_SERVICE_SUBSCRIPTION,
    NEWSLETTER_SERVICE_SUBSCRIPTION,
    JOB_ADVERTISEMENT_PAYMENT,
}

export enum PaymentStatus {
    UNPAID,
    PAID,
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "payment_entity",
        type: "varchar",
        nullable: false,
    })
    paymentEntity: string;

    @Column({
        name: "payment_entity_id",
        type: "varchar",
        nullable: false,
    })
    paymentEntityId: string;

    @Column({
        name: "payment_type",
        type: "enum",
        enum: PaymentType,
        default: PaymentType.JOB_ADVERTISEMENT_PAYMENT,
    })
    paymentType: PaymentType;

    @Column({
        name: "payment_status",
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.UNPAID,
    })
    paymentStatus: PaymentStatus;

    @Column({
        name: "receipt_id",
        type: "varchar",
        nullable: false,
    })
    receiptId: string;

    @ManyToOne(() => User, (user) => user.sessions, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default Payment;
