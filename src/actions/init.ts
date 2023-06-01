import loading from 'loading-cli';

import { createConfigFile as createConfigFileFunc } from '../generators';

export const createConfigFile = async () => {
  const loader = loading('Creating config file').start();
  const configFilePath = process.cwd();
  await createConfigFileFunc({
    configFilePath,
  });
  loader.succeed('Config file created');
};
