import PropTypes from 'prop-types';
import * as React from 'react';

const FormActions = ({ children }) => (
  <div className='flex justify-end space-x-2'>
    {children}
  </div>
);

FormActions.propTypes = {
  children: PropTypes.node,
};

export default FormActions;
