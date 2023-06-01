import path from 'path';
import { mkdirpSync, readFileSync, writeFileSync } from 'fs-extra';
import { PATH } from '../constants';
import { delay } from '../utilities';

interface ITemplate {
  templateName: string;
}
export const generateTemplate = async ({ templateName }: ITemplate) => {
  const newTemplatePath = path.join(
    PATH.CUSTOM_TEMPLATE,
    `/templates/${templateName}.hbs`
  );

  delay(500);
  mkdirpSync(PATH.CUSTOM_TEMPLATE);

  delay(500);
  mkdirpSync(path.join(PATH.CUSTOM_TEMPLATE, '/templates'));

  delay(500);
  writeFileSync(newTemplatePath, '');
};
