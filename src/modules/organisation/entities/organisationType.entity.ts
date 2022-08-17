import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: "enw_organisation_type",
})
export class OrganisationType {
    @PrimaryGeneratedColumn({
        name: "organisation_type_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;
}

export default OrganisationType;
