import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Textarea = React.forwardRef(
  (props, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={classNames({
          'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md':
              true,
        })}
      />
    );
  },
);

Textarea.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Textarea;
