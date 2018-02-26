// sample-components/sample-component-1-test.js

import React from 'react'; 
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import SampleComponent1 from '../sample-components/sample-component-1';

describe('SampleComponent1', () => {
  const props = {
  };

  let component;

  beforeEach(() => {
    component = shallow(<SampleComponent1 {...props} />);
  });
  
  describe('Logo', () => {
    it('is rendered with props', () => {
      const expectedProps = {};
      expect(component.find('Logo').props()).toEqual(expectedProps);
    });
  });

  describe('Navigation', () => {
    it('is rendered with props', () => {
      const expectedProps = {};
      expect(component.find('Navigation').props()).toEqual(expectedProps);
    });
  });

});
