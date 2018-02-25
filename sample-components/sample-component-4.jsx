import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SignedDocuments } from '../signed-documents';
import { ApplicationSummaryContainer, summaryPropTypes } from '../../application-summary';
import { GoBack } from '../../components';
import { actions as applicationActions } from '../../application';
import { viewSignedDocs as viewSignedDocsAction } from '../actions/actions';
import MainLayout from '../../main-layout';
import { UploadedDocuments } from '../uploaded-documents';
import { getSignedDocuments } from '../selectors/selectors';

const { fetchApplicationDetails } = applicationActions;

export class DocumentsContainer extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.applicationSummary)) {
      const appId = _.get(this.props, 'match.params.app_id');
      if (appId) {
        this.props.fetchApplicationDetails(appId);
      }
    }
  }

  getApplicationSummary(summary, location) {
    return (<ApplicationSummaryContainer
      summary={summary}
      location={location}
      link
    />);
  }

  render() {
    const {
      uploadedDocuments,
      applicationSummary,
      location,
      appId,
      programId,
      signedDocuments,
      viewSignedDocs,
    } = this.props;
    const canShowApplicationSummary = !_.isEmpty(applicationSummary);
    return (
      <MainLayout>
        {canShowApplicationSummary && this.getApplicationSummary(applicationSummary, location)}
        <article className="container">
          <hr className="f-pattern-component__divider f-pattern-component__divider" />
          <h3 className="h3 section-header" data-test-handle="documents-header">Documents</h3>
          <hr className="f-pattern-component__divider f-pattern-component__divider" />
          <UploadedDocuments uploadedDocuments={uploadedDocuments} />
          <SignedDocuments
            signedDocuments={signedDocuments}
            appId={appId}
            programId={programId}
            viewSignedDocs={viewSignedDocs}
          />
          <hr className="f-pattern-component__divider f-pattern-component__divider--large" />
          {canShowApplicationSummary && <GoBack target={`/applications/${appId}`} />}
        </article>
      </MainLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    uploadedDocuments: _.get(state, 'application.uploadedDocuments'),
    applicationSummary: _.get(state, 'application.summary'),
    location: _.get(state, 'location'),
    appId: _.get(state, 'application.details.applicationId'),
    programId: _.get(state, 'application.details.programId'),
    signedDocuments: getSignedDocuments(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchApplicationDetails,
    viewSignedDocs: viewSignedDocsAction,
  }, dispatch);
}

DocumentsContainer.propTypes = {
  uploadedDocuments: PropTypes.arrayOf(
    PropTypes.shape({
      requiredDocumentTypeLabel: PropTypes.string,
      receivedAt: PropTypes.string,
      fileName: PropTypes.string,
    })).isRequired,
  applicationSummary: summaryPropTypes.isRequired,
  location: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  appId: PropTypes.string.isRequired,
  programId: PropTypes.string.isRequired,
  fetchApplicationDetails: PropTypes.func.isRequired,
  viewSignedDocs: PropTypes.func.isRequired,
  signedDocuments: PropTypes.arrayOf(
    PropTypes.shape({
      documentType: PropTypes.string,
      signedDate: PropTypes.string,
    })),
};

DocumentsContainer.defaultProps = {
  appId: '',
  programId: '',
  signedDocuments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsContainer);
