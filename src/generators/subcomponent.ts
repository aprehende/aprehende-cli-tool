import { mkdirpSync, readFileSync, writeFileSync } from "fs-extra";
import { PATH } from "../constants";
import { compile } from "handlebars";
import { delay } from "../utilities";

interface IOptions {
  isOnlyJs?: boolean;
  componentPath: string;
}

export const createSubcomponent = async ({
  isOnlyJs,
  componentPath,
}: IOptions) => {
  let componentsTemplatePath;
  const extension = isOnlyJs ? "js" : "ts";
  if (isOnlyJs)
    componentsTemplatePath = `${PATH.SUBCOMPONENT_TEMPLATE}/javascript/button.hbs`;
  else
    componentsTemplatePath = `${PATH.SUBCOMPONENT_TEMPLATE}/typescript/button.hbs`;

  const componentsPath = `${componentPath}/components`;
  const componentsFolderPath = `${componentsPath}/Button`;

  const componentsTemplate = readFileSync(componentsTemplatePath, "utf-8");
  const componentsTemplateContent = compile(componentsTemplate)({});
  const componentsIndexTemplate = readFileSync(
    `${PATH.SUBCOMPONENT_TEMPLATE}/barrel.hbs`,
    "utf-8"
  );
  const componentsIndexTemplateContent = compile(componentsIndexTemplate)({
    componentName: "Button",
  });
  const componentsIndexAsTemplate = readFileSync(
    `${PATH.SUBCOMPONENT_TEMPLATE}/barrel.hbs`,
    "utf-8"
  );
  const componentsIndexAsTemplateContent = compile(componentsIndexAsTemplate)({
    componentName: "Button",
    withAs: true,
  });

  await delay(500);
  mkdirpSync(componentsPath);
  mkdirpSync(componentsFolderPath);

  //barrel with alias
  writeFileSync(
    `${componentsPath}/index.${extension}`,
    componentsIndexAsTemplateContent
  );

  //barrel without alias
  writeFileSync(
    `${componentsFolderPath}/index.${extension}`,
    componentsIndexTemplateContent
  );

  //subcomponent
  writeFileSync(
    `${componentsFolderPath}/Button.${extension}x`,
    componentsTemplateContent
  );
};
