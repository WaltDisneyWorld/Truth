import PropTypes from 'prop-types';
import * as React from 'react';

const Form = ({ onSubmit, children, ...filteredProps }) => {
  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();

    onSubmit(event);
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit} className='space-y-4' {...filteredProps}>
      {children}
    </form>
  );
};

Form.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
