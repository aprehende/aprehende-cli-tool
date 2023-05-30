import { join } from "path";
import { blue } from "colors";
import loading from "loading-cli";
import { compile } from "handlebars";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";
import { mkdir, mkdirSync } from "fs";

const templatesComponentDir = `${__dirname}/templates/component`;
const templatesComponentsDir = `${__dirname}/templates/components`;

interface IOptions {
  [key: string]: string | boolean | undefined;
}

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const createComponent = async (
  componentName: string,
  options: IOptions
) => {
  const loader = loading("Creating component").start();
  const formatedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const componentPath = join(process.cwd(), formatedComponentName);

  await delay(500);
  mkdirpSync(componentPath);

  const isOnlyJs = options["onlyJs"] ? true : false;
  const extension = isOnlyJs ? "js" : "ts";
  let componentTemplatePath;

  if (isOnlyJs)
    componentTemplatePath = `${templatesComponentDir}/javascript/component.hbs`;
  else
    componentTemplatePath = `${templatesComponentDir}/typescript/component.hbs`;

  loader.clear();
  loader.text = "Creating component";

  const componentTemplate = readFileSync(componentTemplatePath, "utf-8");
  const componentTemplateContent = compile(componentTemplate)({
    componentName: formatedComponentName,
    withCss: options["withCss"] ? true : false,
    withStyled: options["withStyled"] ? true : false,
  });

  await delay(500);
  writeFileSync(
    `${componentPath}/${formatedComponentName}.${extension}x`,
    componentTemplateContent
  );

  if (options?.withCss) {
    loader.clear();
    loader.text = "Creating css file";
    const cssTemplate = readFileSync(
      `${templatesComponentDir}/css.hbs`,
      "utf-8"
    );

    const cssTemplateContent = compile(cssTemplate)({
      componentName: formatedComponentName,
    });

    await delay(500);
    writeFileSync(
      `${componentPath}/${formatedComponentName}.css`,
      cssTemplateContent
    );
  }

  loader.clear();
  loader.text = "Creating barrel";
  const indexComponentTemplate = readFileSync(
    `${templatesComponentDir}/barrel.hbs`,
    "utf-8"
  );

  const indexComponentTemplateContent = compile(indexComponentTemplate)({
    componentName: formatedComponentName,
  });

  await delay(500);
  writeFileSync(
    `${componentPath}/index.${extension}`,
    indexComponentTemplateContent
  );

  if (options["withStyled"]) {
    loader.clear();
    loader.text = "Creating styled component";
    let styledTemplatePath;

    if (isOnlyJs)
      styledTemplatePath = `${templatesComponentDir}/javascript/styled-component.hbs`;
    else
      styledTemplatePath = `${templatesComponentDir}/typescript/styled-component.hbs`;

    const styledTemplate = readFileSync(styledTemplatePath, "utf-8");

    const styledTemplateContent = compile(styledTemplate)({
      componentName: formatedComponentName,
    });

    await delay(500);
    writeFileSync(
      `${componentPath}/${formatedComponentName}.styles.${extension}`,
      styledTemplateContent
    );
  }
  if (options["withComponents"]) {
    loader.clear();
    loader.text = "Creating  component button";
    let componentsTemplatePath;
    if (isOnlyJs)
      componentsTemplatePath = `${templatesComponentsDir}/javascript/button.hbs`;
    else
      componentsTemplatePath = `${templatesComponentsDir}/typescript/button.hbs`;

    const componentsPath = `${componentPath}/components`;
    const componentsFolderPath = `${componentsPath}/${formatedComponentName}`;

    const componentsTemplate = readFileSync(componentsTemplatePath, "utf-8");
    const componentsTemplateContent = compile(componentsTemplate)({
      componentName: formatedComponentName,
    });
    const componentsIndexTemplate = readFileSync(
      `${templatesComponentsDir}/barrel.hbs`,
      "utf-8"
    );
    const componentsIndexTemplateContent = compile(componentsIndexTemplate)({
      componentName: formatedComponentName,
    });
    const componentsIndexAsTemplate = readFileSync(
      `${templatesComponentsDir}/barrel.hbs`,
      "utf-8"
    );
    const componentsIndexAsTemplateContent = compile(componentsIndexAsTemplate)(
      {
        componentName: formatedComponentName,
        withAs: true,
      }
    );

    await delay(500);
    mkdirpSync(componentsPath);
    mkdirpSync(componentsFolderPath);
    writeFileSync(
      `${componentsPath}/index.${extension}`,
      componentsIndexAsTemplateContent
    );
    writeFileSync(
      `${componentsFolderPath}/index.${extension}`,
      componentsIndexTemplateContent
    );
    writeFileSync(
      `${componentsFolderPath}/${formatedComponentName}.${extension}x`,
      componentsTemplateContent
    );
  }

  loader.stop();
  loader.clear();
  console.log(blue(`Creation of ${formatedComponentName} component completed`));
};
