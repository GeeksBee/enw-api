import { RedocOptions } from "nestjs-redoc";

export const redocConfig: RedocOptions = {
    // title: "Employee News Weekly API v1",
    title: "Redoc Module",
    logo: {
        url: "https://redocly.github.io/redoc/petstore-logo.png",
        backgroundColor: "#F0F0F0",
        altText: "PetStore Logo",
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: true,
    pathInMiddlePanel: true,
    auth: {
        enabled: true,
        user: "admin",
        password: "123",
    },
    tagGroups: [
        {
            name: "Authentication Routes",
            tags: ["Authentication"],
        },
    ],
};
