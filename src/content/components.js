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
      expect(component.find('${componentName}').props()).toEqual({${props.map(getPropString)}${trailingComma}${closingBracket});
    });
  });
`;
}

module.exports = getComponentTest;
