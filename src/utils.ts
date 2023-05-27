import { join } from "path";
import { green } from "colors";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";
import { compile } from "handlebars";

const templatesDir = `${__dirname}/templates`;

export const createComponent = (componentName: string, options: unknown) => {
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
    withStyle: (options["with-css"] as Object) || false,
  });

  writeFileSync(`${componentPath}/index.ts`, indexComponentTemplateContent);
  console.log(green("Barrel created successfully"));

  console.log(
    green(`Creation of ${formatedComponentName} component completed`)
  );
};
