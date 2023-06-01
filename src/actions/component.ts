import { join } from 'path';
import { blue } from 'colors';
import { PATH } from '../constants';
import { delay, generateLoader } from '../utilities';
import { compile } from 'handlebars';
import { writeFileSync, readFileSync, mkdirpSync } from 'fs-extra';
import {
  createStyles,
  createStyledComponent,
  createComponent as createComponentFunc,
  createSubcomponent,
  createSubHooks,
} from '../generators';

interface IOptions {
  [key: string]: string | boolean | undefined;
}

export const createComponent = async (
  componentName: string,
  options: IOptions
) => {
  const folderLoader = generateLoader(`Creating ${componentName} folder`);
  const formatedComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const componentPath = join(process.cwd(), formatedComponentName);

  await delay(500);
  mkdirpSync(componentPath);
  folderLoader.succeed('Folder created successfully');

  const isOnlyJs = options['onlyJs'] ? true : false;
  const extension = isOnlyJs ? 'js' : 'ts';

  const componentLoader = generateLoader(`Creating ${componentName} component`);
  await createComponentFunc({
    isOnlyJs,
    componentPath,
    componentName: formatedComponentName,
    withCss: Boolean(options['withCss']),
    withStyled: Boolean(options['withStyled']),
    withComponents: Boolean(options['withComponents']),
    withHooks: Boolean(options['withHooks']),
  });
  componentLoader.succeed('Component created successfully');

  const barrelLoader = generateLoader(`Creating ${componentName} barrel`);
  const indexComponentTemplate = readFileSync(
    `${PATH.COMPONENT_TEMPLATE}/barrel.hbs`,
    'utf-8'
  );

  const indexComponentTemplateContent = compile(indexComponentTemplate)({
    componentName: formatedComponentName,
  });

  await delay(500);
  writeFileSync(
    `${componentPath}/index.${extension}`,
    indexComponentTemplateContent
  );
  barrelLoader.succeed('Barrel created successfully');

  if (options['withCss'] || options['withFull']) {
    const cssLoader = generateLoader(`Creating ${componentName} css file`);
    await createStyles({
      componentPath,
      componentName: formatedComponentName,
    });
    cssLoader.succeed('Css file created successfully');
  }

  if (options['withStyled'] || options['withFull']) {
    const styledLoader = generateLoader(
      `Creating ${componentName} styled component`
    );
    await createStyledComponent({
      isOnlyJs,
      componentPath,
      componentName: formatedComponentName,
    });
    styledLoader.succeed('Styled component created successfully');
  }

  if (options['withComponents'] || options['withFull']) {
    const componentsLoader = generateLoader(
      `Creating ${componentName} components folder`
    );
    await createSubcomponent({
      isOnlyJs,
      componentPath,
    });
    componentsLoader.succeed('Components folder created successfully');
  }

  if (options['withHooks'] || options['withFull']) {
    const hooksLoader = generateLoader(
      `Creating ${componentName} hooks folder`
    );
    await createSubHooks({
      isOnlyJs,
      componentPath,
    });
    hooksLoader.succeed('Hooks folder created successfully');
  }
  console.log(blue(`Creation of ${formatedComponentName} component completed`));
};
