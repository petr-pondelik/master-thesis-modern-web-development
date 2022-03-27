import { existsSync } from 'fs';
import { resolve } from 'path';

// Get the configuration file path based on the environment
export function getConfigPath(basePath: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const defaultConfig: string = resolve(`${basePath}/.env`);
  const filename: string = env ? `${env}.env` : 'local.env';
  let filePath: string = resolve(`${basePath}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = defaultConfig;
  }

  return filePath;
}
