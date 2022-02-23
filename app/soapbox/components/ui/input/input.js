import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { defineMessages, useIntl } from 'react-intl';

import Icon from '../../icon';
import Tooltip from '../tooltip/tooltip';

const messages = defineMessages({
  showPassword: { id: 'input.password.show_password', defaultMessage: 'Show password' },
  hidePassword: { id: 'input.password.hide_password', defaultMessage: 'Hide password' },
});

const Input = React.forwardRef(
  (props, ref) => {
    const intl = useIntl();

    const { type, icon, className, ...filteredProps } = props;

    const [revealed, setRevealed] = React.useState(false);

    const isPassword = type === 'password';

    const togglePassword = React.useCallback(() => {
      setRevealed((prev) => !prev);
    }, []);

    return (
      <div className='mt-1 relative rounded-md shadow-sm'>
        {icon ? (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Icon src={icon} className='h-4 w-4 text-gray-400' aria-hidden='true' />
          </div>
        ) : null}

        <input
          {...filteredProps}
          type={revealed ? 'text' : type}
          ref={ref}
          className={classNames({
            'block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500':
                true,
            'pr-7': isPassword,
            'pl-8': typeof icon !== 'undefined',
            [className]: typeof className !== 'undefined',
          })}
        />

        {isPassword ? (
          <Tooltip
            text={
              revealed ?
                intl.formatMessage(messages.hidePassword) :
                intl.formatMessage(messages.showPassword)
            }
          >
            <div className='absolute inset-y-0 right-0 flex items-center'>
              <button
                type='button'
                onClick={togglePassword}
                tabIndex='-1'
                className='text-gray-400 hover:text-gray-500 h-full px-2 focus:ring-primary-500 focus:ring-2'
              >
                <InlineSVG
                  src={revealed ? require('@tabler/icons/icons/eye-off.svg') : require('@tabler/icons/icons/eye.svg')}
                  className='h-4 w-4'
                />
              </button>
            </div>
          </Tooltip>
        ) : null}
      </div>
    );
  },
);

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password']),
};

export default Input;
