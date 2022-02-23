import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const themes = {
  default: 'text-gray-900',
  danger: 'text-danger-600',
  primary: 'text-primary-600',
  muted: 'text-gray-500',
  subtle: 'text-gray-400',
  success: 'text-success-600',
  inherit: 'text-inherit',
};

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const trackingSizes = {
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

const Text = React.forwardRef(
  (props, ref) => {
    const {
      align,
      className,
      size,
      tag,
      theme,
      weight,
      tracking,
      ...filteredProps
    } = props;

    const Comp = tag;

    return (
      <Comp
        {...filteredProps}
        ref={ref}
        style={tag === 'abbr' ? { textDecoration: 'underline dotted' } : null}
        className={classNames({
          'font-sans': true,
          'cursor-default': tag === 'abbr',
          [sizes[size]]: true,
          [themes[theme]]: true,
          [weights[weight]]: true,
          [trackingSizes[tracking]]: true,
          [alignments[align]]: typeof align !== 'undefined',
          [className]: typeof className !== 'undefined',
        })}
      />
    );
  },
);

Text.defaultProps = {
  size: 'md',
  tag: 'p',
  theme: 'default',
  weight: 'normal',
  tracking: 'normal',
};

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes)),
  tag: PropTypes.oneOf(['p', 'span', 'time', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  theme: PropTypes.oneOf(Object.keys(themes)),
  tracking: PropTypes.oneOf(Object.keys(trackingSizes)),
  weight: PropTypes.oneOf(Object.keys(weights)),
  dateTime: PropTypes.string,
};

export default Text;
