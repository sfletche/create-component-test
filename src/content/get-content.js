const _ = require('lodash');
const getPropsDeclaration = require('./props');
const getComponentTest = require('./components');

function getMomentImport(props) {
  if (_.some(props, ['propType', 'instanceOf(Date)'])) {
    return `import moment from 'moment';`;
  }
}

function getRelativeLocation(pathToComponent, pathToUnitTest) {
  if (pathToComponent.indexOf(pathToUnitTest) === 0) {
    return './';
  }
  const testPathSegments = pathToUnitTest.split('/');
  return '../'.repeat(testPathSegments.length);
}

function getContent({ pathToComponent, pathToUnitTest, componentName, componentProps, renderedComponents }) {
  const pathToComponentMinusExt = pathToComponent.replace(/\.[^/.]+$/, '');
  const hasMoment = _.some(componentProps, ['propType', 'instanceOf(Date)']);
  const relativeLocation = getRelativeLocation(pathToComponent, pathToUnitTest);
  return `import React from 'react'; ${hasMoment ? `\nimport moment from 'moment';` : ``}
import { shallow } from 'enzyme';
import ${componentName} from '${relativeLocation}${pathToComponentMinusExt}';

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
