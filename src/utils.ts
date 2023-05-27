import { join } from "path";
import { green } from "colors";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";
import { compile } from "handlebars";

const templatesDir = `${__dirname}/templates`;

interface IOptions {
  [key: string]: string | boolean | undefined;
}

export const createComponent = (componentName: string, options: IOptions) => {
  console.log(options);
  const formatedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const componentPath = join(process.cwd(), formatedComponentName);

  mkdirpSync(componentPath);
  console.log(green("Folder created successfully"));

  const componentTemplate = readFileSync(
    `${templatesDir}/component.hbs`,
    "utf-8"
  );

  const componentTemplateContent = compile(componentTemplate)({
    componentName: formatedComponentName,
    withStyled: options["withStyled"] ? true : false,
  });

  writeFileSync(
    `${componentPath}/${formatedComponentName}.tsx`,
    componentTemplateContent
  );
  console.log(green("Component created successfully"));

  // TODO create barrels
  const indexComponentTemplate = readFileSync(
    `${templatesDir}/barrel.hbs`,
    "utf-8"
  );

  const indexComponentTemplateContent = compile(indexComponentTemplate)({
    componentName: formatedComponentName,
  });

  writeFileSync(`${componentPath}/index.ts`, indexComponentTemplateContent);
  console.log(green("Barrel created successfully"));

  if (options["withStyled"]) {
    const styledTemplate = readFileSync(
      `${templatesDir}/styled-component.hbs`,
      "utf-8"
    );
    const styledTemplateContent = compile(styledTemplate)({
      componentName: formatedComponentName,
    });
    writeFileSync(
      `${componentPath}/${formatedComponentName}.styles.ts`,
      styledTemplateContent
    );
    console.log(green("Styled created successfully"));
  }

  console.log(
    green(`Creation of ${formatedComponentName} component completed`)
  );
};
