import User, { userPrivateFields } from "src/modules/user/entities/user.entity";
import {
    AfterLoad,
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
import { OrganisationMedia } from "./organisationMedia.entity";
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

    @OneToMany(() => OrganisationMedia, (media) => media.organisation) // specify inverse side as a second parameter
    media: OrganisationMedia[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Organisation;
