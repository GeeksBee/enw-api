import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrganisationMediaType {
    LOGO,
    BANNER,
    IMAGE,
}

@Entity({
    name: "enw_organisation_media",
})
export class OrganisationMedia {
    @PrimaryGeneratedColumn({
        name: "organisation_media_id",
    })
    id: number;

    @Column({
        type: "enum",
        name: "media_type",
        enum: OrganisationMediaType,
        default: OrganisationMediaType.IMAGE,
    })
    role: OrganisationMediaType;

    @Column({
        type: "varchar",
        nullable: false,
    })
    link: string;
}

export default OrganisationMediaType;
