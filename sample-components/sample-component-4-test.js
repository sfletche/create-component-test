// sample-components//sample-component-4-test.js

import React from 'react';
undefined
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import SampleComponent4 from '../sample-components/sample-component-4';

describe('SampleComponent4', () => {
  const props = {
    requiredDocumentTypeLabel: 'asdf',
    receivedAt: 'asdf',
    fileName: 'asdf',
    id: 'asdf',
    name: 'asdf',
    appId: 'asdf',
    programId: 'asdf',
    fetchApplicationDetails: () => {},
    viewSignedDocs: () => {},
    documentType: 'asdf',
    signedDate: 'asdf',
  };

  let component;

  beforeEach(() => {
    component = shallow(<SampleComponent4 {...props} />);
  });
  
  describe('UploadedDocuments', () => {
    it('is rendered with props', () => {
      const expectedProps = {
        uploadedDocuments: props.uploadedDocuments
      };
      expect(component.find('UploadedDocuments').props()).toEqual(expectedProps);
    });
  });

  describe('GoBack', () => {
    it('is rendered with props', () => {
      const expectedProps = {
        target: props.`/applications/$appId`
      };
      expect(component.find('GoBack').props()).toEqual(expectedProps);
    });
  });

});
