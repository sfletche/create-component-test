import React from 'react'; 
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import SampleComponent3 from '../sample-components/sample-component-3';

describe('SampleComponent3', () => {
  const props = {
    companyName: 'asdf',
    first: 'asdf',
    last: 'asdf',
    phone: 'asdf',
    email: 'asdf',
  };
  let component;

  beforeEach(() => {
    component = shallow(<SampleComponent3 {...props} />);
  });
  
});
