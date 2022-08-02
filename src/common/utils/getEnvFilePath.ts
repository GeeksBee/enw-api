const node_env_options = ["development", "test"];

export default function getEnvFilePath() {
    let path = "";
    if (node_env_options.includes(process.env.NODE_ENV)) {
        path = `.env.${process.env.NODE_ENV}`;
    } else {
        path = ".env";
    }
    return path;
}
