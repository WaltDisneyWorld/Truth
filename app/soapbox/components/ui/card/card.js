import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const sizes = {
  md: 'p-4 sm:rounded-xl',
  lg: 'p-4 sm:p-6 sm:rounded-xl',
  xl: 'p-4 sm:p-10 sm:rounded-3xl',
};

const messages = defineMessages({
  back: { id: 'card.back.label', defaultMessage: 'Back' },
});

const Card = React.forwardRef(({ children, variant, size = 'md', className, ...filteredProps }, ref) => (
  <div
    ref={ref}
    {...filteredProps}
    className={classNames({
      'space-y-4': true,
      'bg-white sm:shadow-lg overflow-hidden': variant === 'rounded',
      [sizes[size]]: true,
      [className]: typeof className !== 'undefined',
    })}
  >
    {children}
  </div>
));

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['rounded']),
  size: PropTypes.oneOf(Object.keys(sizes)),
  className: PropTypes.string,
};

const CardHeader = ({ children, backHref, onBackClick }) => {
  const intl = useIntl();

  const renderBackButton = () => {
    if (!backHref && !onBackClick) {
      return null;
    }

    const Comp = backHref ? Link : 'button';
    const backAttributes = backHref ? { to: backHref } : { onClick: onBackClick };

    return (
      <Comp {...backAttributes} className='mr-2' aria-label={intl.formatMessage(messages.back)}>
        <InlineSVG src={require('@tabler/icons/icons/arrow-left.svg')} className='h-6 w-6' />
        <span className='sr-only'>Back</span>
      </Comp>
    );
  };

  return (
    <div className='mb-4 flex flex-row items-center'>
      {renderBackButton()}

      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  backHref: PropTypes.string,
  onBackClick: PropTypes.func,
};

const CardTitle = ({ title }) => (
  <h1 className='text-xl font-bold'>{title}</h1>
);

CardTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const CardBody = ({ children }) => (
  <div>{children}</div>
);

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Card, CardHeader, CardTitle, CardBody };
