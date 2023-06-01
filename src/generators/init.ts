import path from 'path';
import { readFileSync } from 'fs';
import { PATH } from '../constants';
import { compile } from 'handlebars';
import { writeFileSync } from 'fs-extra';

interface IOption {
  configFilePath: string;
}

export const createConfigFile = async ({ configFilePath }: IOption) => {
  const configTemplate = readFileSync(
    path.join(PATH.CONFIG_TEMPLATE, 'config.hbs'),
    'utf-8'
  );

  const configTemplateContent = compile(configTemplate)({});

  writeFileSync(
    path.join(configFilePath, '/.aprehenderc'),
    configTemplateContent
  );
};
