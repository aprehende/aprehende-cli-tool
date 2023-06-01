import { join } from 'path';
import { blue } from 'colors';
import { PATH } from '../constants';
import { delay } from '../utilities';
import { compile } from 'handlebars';
import { generateLoader } from '../utilities';
import { createHook as createHookFunc } from '../generators';
import { writeFileSync, readFileSync, mkdirpSync } from 'fs-extra';

interface IOptions {
  [key: string]: string | boolean | undefined;
}

export const createHook = async (hookName: string, options: IOptions) => {
  const folderLoader = generateLoader(`Creating ${hookName} folder`);
  const formatedHookName =
    'use' + hookName.charAt(0).toUpperCase() + hookName.slice(1);

  const hookPath = join(process.cwd(), formatedHookName);

  await delay(500);
  mkdirpSync(hookPath);
  folderLoader.succeed('Folder created successfully');

  const isOnlyJs = options['onlyJs'] ? true : false;
  const extension = isOnlyJs ? 'js' : 'ts';

  const hookLoader = generateLoader(`Creating ${hookName} hook`);
  await createHookFunc({
    isOnlyJs,
    hookPath,
    hookName: formatedHookName,
  });
  hookLoader.succeed('Hook created successfully');

  const barrelLoader = generateLoader(`Creating ${hookName} barrel`);
  const indexHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrel.hbs`,
    'utf-8'
  );

  const indexHookTemplateContent = compile(indexHookTemplate)({
    hookName: formatedHookName,
  });

  await delay(500);
  writeFileSync(`${hookPath}/index.${extension}`, indexHookTemplateContent);
  barrelLoader.succeed('Barrel created successfully');

  console.log(blue(`Creation of ${formatedHookName} hook completed`));
};
