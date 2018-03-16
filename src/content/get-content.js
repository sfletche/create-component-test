const _ = require('lodash');
const getPropsDeclaration = require('./props');
const getComponentTest = require('./components');

function getMomentImport(props) {
  if (_.some(props, ['propType', 'instanceOf(Date)'])) {
    return `import moment from 'moment';`;
  }
}

function getPathToComponent(pathToComponent, pathToUnitTest) {
  const pathToComponentMinusExt = pathToComponent.replace(/\.[^/.]+$/, '');
  if (pathToComponentMinusExt.indexOf(pathToUnitTest) === 0) {
    return './';
  }
  // handling path comparisons similar to the following
  // src/application/provide-documentation/components/emergency-hvac-verification.jsx
  // src/application/provide-documentation/__tests__/components
  // (and ignoring the first 3 segments as they are duplicates of each other)
  const componentPathSegments = pathToComponentMinusExt.split('/');
  const testPathSegments = pathToUnitTest.split('/');
  const dupes = _.reduce(componentPathSegments, (count, segment, index) => {
    count += segment === testPathSegments[index] ? 1 : 0;
    return count;
  }, 0);

  const pathToComponentWithoutDupes = componentPathSegments.slice(dupes).join('/');
  const relativeLocation = '../'.repeat(testPathSegments.length - dupes);
  return `${relativeLocation}${pathToComponentWithoutDupes}`;
}

function getContent({ pathToComponent, pathToUnitTest, componentName, componentProps, renderedComponents }) {
  const hasMoment = _.some(componentProps, ['propType', 'instanceOf(Date)']);
  const relativePathToComponent = getPathToComponent(pathToComponent, pathToUnitTest);

  return `import React from 'react'; ${hasMoment ? `\nimport moment from 'moment';` : ``}
import { shallow } from 'enzyme';
import ${componentName} from '${relativePathToComponent}${_.kebabCase(componentName)}';

describe('${componentName}', () => {
  ${getPropsDeclaration(componentProps)}let component;

  beforeEach(() => {
    component = shallow(<${componentName}${componentProps.length ? ` {...props}` : ``} />);
  });
  ${renderedComponents.map(getComponentTest).join('')}
});
`;
}

module.exports = getContent;
