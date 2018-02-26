import React from 'react'; 
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import SampleComponent1 from '../sample-components/sample-component-1';

describe('SampleComponent1', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SampleComponent1 {...props} />);
  });
  
  describe('Logo', () => {
    it('is rendered with props', () => {
      expect(component.find('Logo').props()).toEqual({});
    });
  });

  describe('Navigation', () => {
    it('is rendered with props', () => {
      expect(component.find('Navigation').props()).toEqual({});
    });
  });

});
