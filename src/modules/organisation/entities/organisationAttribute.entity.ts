import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import OrganisationType from "./organisationType.entity";

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

    @ManyToMany(
        () => OrganisationType,
        (organisationType) => organisationType.organisationAttributes,
    )
    organisationTypes: OrganisationType[];
}

export default OrganisationAttribute;
