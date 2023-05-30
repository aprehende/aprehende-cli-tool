import { PATH } from "../constants";
import { delay } from "../utilities";
import { compile } from "handlebars";
import { readFileSync, writeFileSync } from "fs-extra";

interface IOptions {
  componentName: string;
  componentPath: string;
}

export const createStyles = async ({
  componentName,
  componentPath,
}: IOptions) => {
  const cssTemplate = readFileSync(
    `${PATH.COMPONENT_TEMPLATE}/css.hbs`,
    "utf-8"
  );

  const cssTemplateContent = compile(cssTemplate)({
    componentName: componentName,
  });

  await delay(500);
  writeFileSync(`${componentPath}/${componentName}.css`, cssTemplateContent);
};
