export enum OrganisationTypeEnum {
    PUBLIC_SECTOR_UNDERTAKING,
    PRIVATE_SECTOR,
    GOVERNMENT_ORGANISATION,
    GOVERNMENT_MINISTRY,
}

export const organisationTypes = [
    {
        option: "Public Sector Undertaking",
        value: 0,
    },
    {
        option: "Private Sector",
        value: 1,
    },
    {
        option: "Government Organisation",
        value: 2,
    },
    {
        option: "Government Ministry",
        value: 3,
    },
];

export default OrganisationTypeEnum;
