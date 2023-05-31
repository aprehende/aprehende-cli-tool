import { join } from "path";
import { blue } from "colors";
import loading from "loading-cli";
import { PATH } from "../constants";
import { delay } from "../utilities";
import { compile } from "handlebars";
import { createHook as createHookFunc } from "../generators";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";

interface IOptions {
  [key: string]: string | boolean | undefined;
}

export const createHook = async (hookName: string, options: IOptions) => {
  const loader = loading("Creating hook").start();
  const formatedHookName =
    "use" + hookName.charAt(0).toUpperCase() + hookName.slice(1);

  const hookPath = join(process.cwd(), formatedHookName);

  await delay(500);
  mkdirpSync(hookPath);

  const isOnlyJs = options["onlyJs"] ? true : false;
  const extension = isOnlyJs ? "js" : "ts";
  loader.clear();
  loader.text = "Creating hook";

  await createHookFunc({
    isOnlyJs,
    hookPath,
    hookName: formatedHookName,
  });

  loader.clear();
  loader.text = "Creating barrel";
  const indexHookTemplate = readFileSync(
    `${PATH.HOOK_TEMPLATE}/barrel.hbs`,
    "utf-8"
  );

  const indexHookTemplateContent = compile(indexHookTemplate)({
    hookName: formatedHookName,
  });

  await delay(500);
  writeFileSync(`${hookPath}/index.${extension}`, indexHookTemplateContent);

  loader.stop();
  loader.clear();
  console.log(blue(`Creation of ${formatedHookName} hook completed`));
};
