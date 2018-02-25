import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Contractor({ companyName, name, phone, email }) {
  const fullName = !_.isEmpty(name) ? `${name.first} ${name.last}` : '';
  return (
    <section>
      <div> {companyName} </div>
      <div> {fullName} </div>
      <div> {phone} </div>
      <a href={`mailto:${email}`}> {email} </a>
    </section>
  );
}

Contractor.propTypes = {
  companyName: PropTypes.string,
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }).isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Contractor.defaultProps = {
  companyName: '',
};

export default Contractor;
