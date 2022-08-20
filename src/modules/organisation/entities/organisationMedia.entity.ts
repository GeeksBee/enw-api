import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Organisation from "./organisation.entity";

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

    @ManyToOne(() => Organisation, (org) => org.media)
    @JoinColumn({ name: "organisation_id" })
    organisation: Organisation;
}

export default OrganisationMediaType;
