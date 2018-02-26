const _ = require('lodash');

function getPropString(propData) {
  const { name, value } = propData;
  const actualValue = value.includes('"') ? value : `props.${value}`;
  return `\n        ${name}: ${actualValue}`;
}

function getComponentTest(renderedComponent) {
  // input { componentName: Signer, props: [{ name: signer, value: signerName }] }
  const { componentName, props } = renderedComponent;
  const expectedProps = props.map(getPropString);
  const trailingComma = expectedProps.length ? ',\n' : '';
  const closingBracket = expectedProps.length ? '      }' : '}';
  return `
  describe('${componentName}', () => {
    it('is rendered with props', () => {
      const expectedProps = {${props.map(getPropString)}${trailingComma}${closingBracket};
      expect(component.find('${componentName}').props()).toEqual(expectedProps);
    });
  });
`;
}

function getPropValue(propType) {
  switch (propType.split('.')[0]) {
    case 'string':
      return `'asdf'`;
    case 'bool':
      return false;
    case 'array':
      return [];
    case 'func':
      return () => {};
    case 'number':
      return 23;
    case 'object':
      return {};
    case 'instanceOf(Date)':
      return `moment.utc('2017-07-20T12:00:00Z').toDate()`;
    default:
      return 'undefined';
  }
}

function getPropPairs(propData) {
  const { propName, propType } = propData;
  const propValue = getPropValue(propType);
  return `\n    ${propName}: ${propValue}`;
}

function getMomentImport(props) {
  if (_.some(props, ['propType', 'instanceOf(Date)'])) {
    return `import moment from 'moment';`;
  }
}

function getContent({ pathToComponent, componentName, componentProps, renderedComponents }) {
  const pathToComponentMinusExt = pathToComponent.replace(/\.[^/.]+$/, '');
  const hasMoment = _.some(componentProps, ['propType', 'instanceOf(Date)']);
  const propPairs = componentProps.map(getPropPairs);
  const propPairsTrailingComma = propPairs.length ? ',' : '';
  return `import React from 'react'; ${hasMoment ? `\nimport moment from 'moment';` : ``}
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import ${componentName} from '../${pathToComponentMinusExt}';

describe('${componentName}', () => {
  const props = {${propPairs}${propPairsTrailingComma}
  };

  let component;

  beforeEach(() => {
    component = shallow(<${componentName} {...props} />);
  });
  ${renderedComponents.map(getComponentTest).join('')}
});
`;
}

module.exports = getContent;
