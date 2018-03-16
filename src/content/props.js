function getPropValue(propType, propName) {
  switch (propType.split('.')[0]) {
    case 'string':
      return `'${propName}'`;
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
  const propValue = getPropValue(propType, propName);
  return `\n    ${propName}: ${propValue}`;
}

function getPropsDeclaration(props) {
  const propPairs = props.map(getPropPairs);
  const propPairsTrailingComma = propPairs.length ? ',' : '';
  return propPairs.length ? `const props = {${propPairs},\n  };\n  ` : ``;
}

module.exports = getPropsDeclaration;
