import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "enw_organisation_attribute",
})
export class OrganisationAttribute {
    @PrimaryGeneratedColumn({
        name: "organisation_attribute_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;
}

export default OrganisationAttribute;
