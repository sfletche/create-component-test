import React from 'react';
import PropTypes from 'prop-types';
import Signer from '../../components/signer';
import StatusDate from '../../components/status-date';

function SampleComponent2({ sentDate, signedDate, signerName }) {
  return (
    <div>
      <Signer signer={signerName} />
      {sentDate && <StatusDate date={sentDate} status="Email Sent" />}
      {signedDate && <StatusDate date={signedDate} status="Signed" />}

    </div>
  );
}

SampleComponent2.propTypes = {
  sentDate: PropTypes.instanceOf(Date),
  signedDate: PropTypes.instanceOf(Date),
  signerName: PropTypes.string.isRequired,
};

export default SampleComponent2;
