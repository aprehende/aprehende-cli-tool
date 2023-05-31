import { PATH } from '../constants';
import { compile } from 'handlebars';
import { delay } from '../utilities';
import { mkdirpSync, readFileSync, writeFileSync } from 'fs-extra';
import { createHook as createHookFunc } from '../generators';

interface IOption {
  isOnlyJs?: boolean;
  componentPath: string;
}

export const createSubHooks = async ({ isOnlyJs, componentPath }: IOption) => {
  let hookTemplatePath;
  const hookName = 'useHello';

  if (isOnlyJs) hookTemplatePath = `${PATH.HOOK_TEMPLATE}/javascript/hook.hbs`;
  else hookTemplatePath = `${PATH.HOOK_TEMPLATE}/typescript/hook.hbs`;

  const extension = isOnlyJs ? 'js' : 'ts';

  const hookPath = `${componentPath}/hooks`;
  const hookPathFolder = `${componentPath}/hooks/useHello`;

  const indexHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrelHook.hbs`,
    'utf-8'
  );
  const indexHookTemplateContent = compile(indexHookTemplate)({
    hookName: hookName,
  });

  const indexAsHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrelHook.hbs`,
    'utf-8'
  );
  const indexAsHookTemplateContent = compile(indexAsHookTemplate)({
    withAs: true,
    hookName: hookName,
  });

  await delay(500);
  mkdirpSync(hookPath);
  mkdirpSync(hookPathFolder);

  writeFileSync(`${hookPath}/index.${extension}`, indexAsHookTemplateContent);

  createHookFunc({
    isOnlyJs,
    hookPath: hookPathFolder,
    hookName: 'useHello',
  });

  writeFileSync(
    `${hookPathFolder}/index.${extension}`,
    indexHookTemplateContent
  );
};
