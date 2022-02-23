import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FormGroup = (props) => {
  const { children, errors, labelText, hintText } = props;
  const formFieldId = useMemo(() => `field-${uuidv4()}`, []);
  const inputChildren = React.Children.toArray(children);
  const firstChild = React.cloneElement(
    inputChildren[0],
    { id: formFieldId },
  );

  return (
    <div>
      <label
        htmlFor={formFieldId}
        className='block text-sm font-medium text-gray-700'
      >
        {labelText}
      </label>

      <div className='mt-1'>
        {firstChild}
        {inputChildren.filter((_, i) => i !== 0)}

        {errors?.length > 0 && (
          <p className='mt-0.5 text-xs text-danger-900 bg-danger-200 rounded-md inline-block px-2 py-1 relative form-error'>
            {errors.join(', ')}
          </p>
        )}

        {hintText ? (
          <p className='mt-0.5 text-xs text-gray-400'>
            {hintText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

FormGroup.defaultProps = {
  errors: [],
};

FormGroup.propTypes = {
  children: PropTypes.node,
  hintText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelText: PropTypes.string.isRequired,
  errors: PropTypes.array,
};

export default FormGroup;
