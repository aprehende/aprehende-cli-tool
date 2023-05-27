import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export const createComponent = (componentName: string) => {
  const componentDirectory = path.join(process.cwd(), componentName);

  if (fs.existsSync(componentDirectory)) {
    console.error("Error: El componente ya existe");
    process.exit(1);
  }

  const componentPath = path.join(componentDirectory, `${componentName}.tsx`);
  const styleComponentPath = path.join(
    componentDirectory,
    `${componentName}.styles.ts`
  );
  fs.mkdirSync(componentDirectory);

  const templateFile = fs.readFileSync("./templates/component.hbs", "utf-8");
  const templateComponent = handlebars.compile(templateFile);
  const renderedTemplateComponent = templateComponent({
    componentName,
  });

  fs.writeFileSync(componentPath, renderedTemplateComponent);

  console.log(`Componente ${componentName} creado con éxito.`);
};
