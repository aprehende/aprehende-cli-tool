import { PATH } from "../constants";
import { compile } from "handlebars";
import { delay } from "../utilities";
import { readFileSync, writeFileSync } from "fs-extra";

interface IOption {
  withCss?: boolean;
  isOnlyJs?: boolean;
  withStyled?: boolean;
  componentName: string;
  componentPath: string;
}

export const createComponent = async ({
  withCss,
  isOnlyJs,
  withStyled,
  componentName,
  componentPath,
}: IOption) => {
  let componentTemplatePath;
  const extension = isOnlyJs ? "js" : "ts";

  if (isOnlyJs)
    componentTemplatePath = `${PATH.COMPONENT_TEMPLATE}/javascript/component.hbs`;
  else
    componentTemplatePath = `${PATH.COMPONENT_TEMPLATE}/typescript/component.hbs`;

  const componentTemplate = readFileSync(componentTemplatePath, "utf-8");
  const componentTemplateContent = compile(componentTemplate)({
    componentName,
    withCss: withCss ? true : false,
    withStyled: withStyled ? true : false,
  });

  await delay(500);
  writeFileSync(
    `${componentPath}/${componentName}.${extension}x`,
    componentTemplateContent
  );
};
