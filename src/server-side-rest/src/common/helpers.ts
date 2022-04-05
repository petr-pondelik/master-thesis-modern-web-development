import { existsSync } from "fs";
import { resolve } from "path";

export const apiPath = (controllerPath: string, tail?: number | string): string => {
  return tail ? `/${controllerPath}/${tail}` : `/${controllerPath}`;
};

// Get the configuration file path based on the environment
export function getConfigPath(basePath: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const defaultConfig: string = resolve(`${basePath}/.env`);
  const filename: string = env ? `${env}.env` : "local.env";
  let filePath: string = resolve(`${basePath}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = defaultConfig;
  }

  return filePath;
}
