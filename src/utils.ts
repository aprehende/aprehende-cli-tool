import { join } from "path";
import { blue, green } from "colors";
import { compile } from "handlebars";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";

const templatesComponentDir = `${__dirname}/templates/component`;

interface IOptions {
  [key: string]: string | boolean | undefined;
}

export const createComponent = (componentName: string, options: IOptions) => {
  const formatedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const componentPath = join(process.cwd(), formatedComponentName);

  mkdirpSync(componentPath);
  console.log(green("Folder created successfully"));

  const isOnlyJs = options["onlyJs"] ? true : false;
  const extension = isOnlyJs ? "js" : "ts";
  let componentTemplatePath;

  if (isOnlyJs)
    componentTemplatePath = `${templatesComponentDir}/javascript/component.hbs`;
  else
    componentTemplatePath = `${templatesComponentDir}/typescript/component.hbs`;

  const componentTemplate = readFileSync(componentTemplatePath, "utf-8");

  const componentTemplateContent = compile(componentTemplate)({
    componentName: formatedComponentName,
    withCss: options["withCss"] ? true : false,
    withStyled: options["withStyled"] ? true : false,
  });

  writeFileSync(
    `${componentPath}/${formatedComponentName}.${extension}x`,
    componentTemplateContent
  );
  console.log(green("Component created successfully"));

  if (options?.withCss) {
    const cssTemplate = readFileSync(
      `${templatesComponentDir}/css.hbs`,
      "utf-8"
    );

    const cssTemplateContent = compile(cssTemplate)({
      componentName: formatedComponentName,
    });

    writeFileSync(
      `${componentPath}/${formatedComponentName}.css`,
      cssTemplateContent
    );
    console.log(green("Css created successfully"));
  }

  // TODO create barrels
  const indexComponentTemplate = readFileSync(
    `${templatesComponentDir}/barrel.hbs`,
    "utf-8"
  );

  const indexComponentTemplateContent = compile(indexComponentTemplate)({
    componentName: formatedComponentName,
  });

  writeFileSync(
    `${componentPath}/index.${extension}`,
    indexComponentTemplateContent
  );
  console.log(green("Barrel created successfully"));

  if (options["withStyled"]) {
    let styledTemplatePath;

    if (isOnlyJs)
      styledTemplatePath = `${templatesComponentDir}/javascript/styled-component.hbs`;
    else
      styledTemplatePath = `${templatesComponentDir}/typescript/styled-component.hbs`;

    const styledTemplate = readFileSync(styledTemplatePath, "utf-8");

    const styledTemplateContent = compile(styledTemplate)({
      componentName: formatedComponentName,
    });
    writeFileSync(
      `${componentPath}/${formatedComponentName}.styles.${extension}`,
      styledTemplateContent
    );
    console.log(green("Styled created successfully"));
  }

  console.log(blue(`Creation of ${formatedComponentName} component completed`));
};
