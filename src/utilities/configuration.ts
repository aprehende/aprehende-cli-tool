import path from 'path';
import { readFileSync } from 'fs-extra';

interface IConfiguration {
  component: {
    withBarrel: boolean;
    templatePath?: string;
    barrelTemplatePath?: string;
    subComponentTemplatePath?: string;
    subComponentWithBarrel: boolean;
    subHookTemplatePath?: string;
    subHookWithBarrel?: boolean;
  };
}

const defaultConfiguration: IConfiguration = {
  component: {
    withBarrel: true,
    subHookWithBarrel: true,
    subComponentWithBarrel: true,
  },
};

export const getConfiguration = (): IConfiguration => {
  const configurationPath = path.join(process.cwd(), '/.aprehenderc');
  const configurationFile = readFileSync(configurationPath, 'utf-8');

  if (!configurationFile) return defaultConfiguration;

  //TODO parse configuration file

  return defaultConfiguration;
};
