import React from 'react'; 
import { shallow } from 'enzyme';
import SampleComponent3 from './sample-components/sample-component-3';

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
