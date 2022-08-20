import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import OrganisationAttribute from "./organisationAttribute.entity";

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

    @ManyToMany(
        () => OrganisationAttribute,
        (organisationAttribute) => organisationAttribute.organisationTypes,
    )
    @JoinTable({
        name: "enw_organisation_types_on_organisation_attributes",
        joinColumn: {
            name: "organisation_type_id",
        },
        inverseJoinColumn: {
            name: "organisation_attribute_id",
        },
    })
    organisationAttributes: OrganisationAttribute[];
}

export default OrganisationType;
