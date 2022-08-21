export default () => ({
    healthCheckMessage: "OK",
    internalServerErrorMessage: "Something went wrong",
    etherealAccountName: "Jayne Altenwerth",
});

export type publicConfigurationProps = {
    healthCheckMessage: string;
    internalServerErrorMessage: string;
    etherealAccountName: string;
};
