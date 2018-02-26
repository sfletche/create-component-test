const _ = require('lodash');
const getPropsDeclaration = require('./props');
const getComponentTest = require('./components');

function getMomentImport(props) {
  if (_.some(props, ['propType', 'instanceOf(Date)'])) {
    return `import moment from 'moment';`;
  }
}

function getContent({ pathToComponent, componentName, componentProps, renderedComponents }) {
  const pathToComponentMinusExt = pathToComponent.replace(/\.[^/.]+$/, '');
  const hasMoment = _.some(componentProps, ['propType', 'instanceOf(Date)']);
  return `import React from 'react'; ${hasMoment ? `\nimport moment from 'moment';` : ``}
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import ${componentName} from '../${pathToComponentMinusExt}';

describe('${componentName}', () => {
  ${getPropsDeclaration(componentProps)}let component;

  beforeEach(() => {
    component = shallow(<${componentName} {...props} />);
  });
  ${renderedComponents.map(getComponentTest).join('')}
});
`;
}

module.exports = getContent;
