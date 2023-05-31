import { PATH } from '../constants';
import { compile } from 'handlebars';
import { delay } from '../utilities';
import { mkdirpSync, readFileSync, writeFileSync } from 'fs-extra';

interface IOption {
  isOnlyJs?: boolean;
  componentName: string;
  componentPath: string;
}

export const createHook = async ({
  isOnlyJs,
  componentName,
  componentPath,
}: IOption) => {
  let hookTemplatePath;

  if (isOnlyJs) hookTemplatePath = `${PATH.HOOK_TEMPLATE}/javascript/hook.hbs`;
  else hookTemplatePath = `${PATH.HOOK_TEMPLATE}/typescript/hook.hbs`;

  const extension = isOnlyJs ? 'js' : 'ts';
  const extensionX = isOnlyJs ? 'jsx' : 'tsx';

  const hookPath = `${componentPath}/hooks`;
  const hookPathFolder = `${componentPath}/hooks/useHello`;

  const hookTemplate = readFileSync(hookTemplatePath, 'utf-8');
  const hookTemplateContent = compile(hookTemplate)({});

  const indexHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrelHook.hbs`,
    'utf-8',
  );
  const indexHookTemplateContent = compile(indexHookTemplate)({});

  const indexAsHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrelHook.hbs`,
    'utf-8',
  );
  const indexAsHookTemplateContent = compile(indexAsHookTemplate)({
    withAs: true,
  });

  await delay(500);
  mkdirpSync(hookPath);
  mkdirpSync(hookPathFolder);

  writeFileSync(`${hookPath}/index.${extension}`, indexAsHookTemplateContent);

  writeFileSync(
    `${hookPathFolder}/useHello.${extensionX}`,
    hookTemplateContent,
  );

  writeFileSync(
    `${hookPathFolder}/index.${extension}`,
    indexHookTemplateContent,
  );
};
