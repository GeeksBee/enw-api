import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "enw_organisation_attribute_value",
})
export class OrganisationAttributeValue {
    @PrimaryGeneratedColumn({
        name: "organisation_attribute_value_id",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    value: string;
}

export default OrganisationAttributeValue;
