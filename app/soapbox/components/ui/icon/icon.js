import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'react-inlinesvg';

const Icon = ({ src, count, ...filteredProps }) => {
  return (
    <div className='relative'>
      {count ? (
        <span className='absolute -top-2 -right-3 block px-1.5 py-0.5 bg-accent-500 text-xs text-white rounded-full ring-2 ring-white'>
          {count}
        </span>
      ) : null}

      <InlineSVG src={src} {...filteredProps} />
    </div>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  src: PropTypes.string.isRequired,
};

export default Icon;
