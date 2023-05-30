import { PATH } from "../constants";
import { compile } from "handlebars";
import { delay } from "../utilities";
import { readFileSync, writeFileSync } from "fs-extra";

interface IOptions {
  isOnlyJs?: boolean;
  componentName: string;
  componentPath: string;
}
export const createStyledComponent = async ({
  isOnlyJs,
  componentName,
  componentPath,
}: IOptions) => {
  let styledTemplatePath;
  let extension = isOnlyJs ? "js" : "ts";

  if (isOnlyJs)
    styledTemplatePath = `${PATH.COMPONENT_TEMPLATE}/javascript/styled-component.hbs`;
  else
    styledTemplatePath = `${PATH.COMPONENT_TEMPLATE}/typescript/styled-component.hbs`;

  const styledTemplate = readFileSync(styledTemplatePath, "utf-8");

  const styledTemplateContent = compile(styledTemplate)({
    componentName,
  });

  await delay(500);
  writeFileSync(
    `${componentPath}/${componentName}.styles.${extension}`,
    styledTemplateContent
  );
};
