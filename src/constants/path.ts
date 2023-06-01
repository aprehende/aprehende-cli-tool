import path from 'path';

export const PATH = {
  CONFIG_TEMPLATE: path.join(__dirname, '../templates/'),
  HOOK_TEMPLATE: path.join(__dirname, '../templates/hook'),
  COMPONENT_TEMPLATE: path.join(__dirname, '../templates/component'),
  SUBCOMPONENT_TEMPLATE: path.join(
    __dirname,
    '../templates/component/subcomponents'
  ),
};
