import React from 'react'; 
import moment from 'moment';
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import SampleComponent2 from '../sample-components/sample-component-2';

describe('SampleComponent2', () => {
  const props = {
    sentDate: moment.utc('2017-07-20T12:00:00Z').toDate(),
    signedDate: moment.utc('2017-07-20T12:00:00Z').toDate(),
    signerName: 'asdf',
  };
  let component;

  beforeEach(() => {
    component = shallow(<SampleComponent2 {...props} />);
  });
  
  describe('Signer', () => {
    it('is rendered with props', () => {
      expect(component.find('Signer').props()).toEqual({
        signer: props.signerName,
      });
    });
  });

  describe('StatusDate', () => {
    it('is rendered with props', () => {
      expect(component.find('StatusDate').props()).toEqual({
        date: props.sentDate,
        status: "Email Sent",
      });
    });
  });

  describe('StatusDate', () => {
    it('is rendered with props', () => {
      expect(component.find('StatusDate').props()).toEqual({
        date: props.signedDate,
        status: "Signed",
      });
    });
  });

});
