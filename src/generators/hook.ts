import { PATH } from "../constants";
import { compile } from "handlebars";
import { delay } from "../utilities";
import { readFileSync, writeFileSync } from "fs-extra";

interface IOption {
  hookPath: string;
  hookName: string;
  isOnlyJs?: boolean;
}

export const createHook = async ({ isOnlyJs, hookName, hookPath }: IOption) => {
  let hookTemplatePath;
  const extension = isOnlyJs ? "js" : "ts";

  if (isOnlyJs) hookTemplatePath = `${PATH.HOOK_TEMPLATE}/javascript/hook.hbs`;
  else hookTemplatePath = `${PATH.HOOK_TEMPLATE}/typescript/hook.hbs`;

  const hookTemplate = readFileSync(hookTemplatePath, "utf-8");
  const hookTemplateContent = compile(hookTemplate)({
    hookName,
  });

  await delay(500);
  writeFileSync(`${hookPath}/${hookName}.${extension}`, hookTemplateContent);
};
