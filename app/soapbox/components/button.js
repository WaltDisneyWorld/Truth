import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Icon from './icon';

const useButtonStyles = ({
  theme,
  block,
  disabled,
  size,
}) => {
  const themes = {
    primary:
      'border-transparent text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
    secondary:
      'border-transparent text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
    ghost: 'shadow-none border-gray-200 text-gray-700 bg-white focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
    accent: 'border-transparent text-white bg-accent-500 hover:bg-accent-300 focus:ring-pink-500 focus:ring-2 focus:ring-offset-2',
    danger: 'border-transparent text-danger-700 bg-danger-100 hover:bg-danger-200 focus:ring-danger-500 focus:ring-2 focus:ring-offset-2',
  };

  const sizes = {
    xs: 'px-3 py-1 text-xs',
    sm: 'px-3 py-1.5 text-xs leading-4',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const buttonStyle = classNames({
    'inline-flex items-center border font-medium rounded-full focus:outline-none appearance-none transition-all': true,
    'select-none disabled:opacity-50 disabled:cursor-default': disabled,
    [`${themes[theme]}`]: true,
    [`${sizes[size]}`]: true,
    'flex w-full justify-center': block,
  });

  return buttonStyle;
};

const Button = React.forwardRef((props, ref) => {
  const { block, children, disabled, icon, onClick, size, text, theme, to, type } = props;

  const themeClass = useButtonStyles({
    theme,
    block,
    disabled,
    size,
  });

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    return <Icon src={icon} className='mr-2' />;
  };

  const handleClick = React.useCallback((event) => {
    if (onClick && !disabled) {
      onClick(event);
    }
  }, [onClick, disabled]);

  const renderButton = () => (
    <button
      className={themeClass}
      disabled={disabled}
      onClick={handleClick}
      ref={ref}
      type={type}
    >
      {renderIcon()}
      {text || children}
    </button>
  );

  if (to) {
    return (
      <Link to={to} tabIndex={-1} className='inline-flex'>
        {renderButton()}
      </Link>
    );
  }

  return renderButton();
});

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  style: PropTypes.object,
  text: PropTypes.node,
  to: PropTypes.string,
  theme: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'accent', 'danger']),
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  disabled: false,
  size: 'md',
  theme: 'accent',
  type: 'button',
};

export default Button;
