import { join } from "path";
import { blue } from "colors";
import loading from "loading-cli";
import { PATH } from "../constants";
import { delay } from "../utilities";
import { compile } from "handlebars";
import { writeFileSync, readFileSync, mkdirpSync } from "fs-extra";
import {
  createStyles,
  createStyledComponent,
  createComponent as createComponentFunc,
  createSubcomponent,
} from "./generators";

interface IOptions {
  [key: string]: string | boolean | undefined;
}

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
  loader.clear();
  loader.text = "Creating component";

  await createComponentFunc({
    isOnlyJs,
    componentPath,
    componentName: formatedComponentName,
    withCss: Boolean(options["withCss"]),
    withStyled: Boolean(options["withStyled"]),
    withComponents: Boolean(options["withComponents"]),
  });

  loader.clear();
  loader.text = "Creating barrel";
  const indexComponentTemplate = readFileSync(
    `${PATH.COMPONENT_TEMPLATE}/barrel.hbs`,
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

  if (options["withCss"]) {
    loader.clear();
    loader.text = "Creating css file";
    await createStyles({
      componentPath,
      componentName: formatedComponentName,
    });
  }

  if (options["withStyled"]) {
    loader.clear();
    loader.text = "Creating styled component";
    await createStyledComponent({
      isOnlyJs,
      componentPath,
      componentName: formatedComponentName,
    });
  }
  if (options["withComponents"]) {
    loader.clear();
    loader.text = "Creating  subcomponents folder";
    await createSubcomponent({
      isOnlyJs,
      componentPath,
      componentName: formatedComponentName,
    });
  }

  loader.stop();
  loader.clear();
  console.log(blue(`Creation of ${formatedComponentName} component completed`));
};
