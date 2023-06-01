import { generateTemplate as generateTemplateFunc } from '../generators';
import { generateLoader } from '../utilities';

export const generateTemplate = async (templateName: string) => {
  const templateLoader = generateLoader(`Creating ${templateName} template`);
  await generateTemplateFunc({
    templateName,
  });
  templateLoader.succeed('Template created successfully');
};
