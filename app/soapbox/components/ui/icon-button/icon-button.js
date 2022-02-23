import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'react-inlinesvg';

import Text from '../text/text';

const IconButton = React.forwardRef(({ src, className, iconClassName, text, ...filteredProps }, ref) => {
  return (
    <button
      ref={ref}
      type='button'
      className={classNames('bg-white flex items-center space-x-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500', {
        [className]: typeof className !== 'undefined',
      })}
      {...filteredProps}
    >
      <InlineSVG src={src} className={iconClassName} />

      {text ? (
        <Text tag='span' theme='muted' size='sm'>
          {text}
        </Text>
      ) : null}
    </button>
  );
});

IconButton.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  disabled: PropTypes.bool,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  title: PropTypes.string,
};

export default IconButton;
