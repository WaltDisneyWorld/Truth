import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const justifyContentOptions = {
  between: 'justify-between',
  center: 'justify-center',
};

const alignItemsOptions = {
  top: 'items-start',
  bottom: 'items-end',
  center: 'items-center',
  start: 'items-start',
};

const spaces = {
  '0.5': 'space-x-0.5',
  1: 'space-x-1',
  1.5: 'space-x-1.5',
  2: 'space-x-2',
  3: 'space-x-3',
  4: 'space-x-4',
  6: 'space-x-6',
};

const HStack = (props) => {
  const { space, alignItems, justifyContent, className, ...filteredProps } = props;

  return (
    <div
      {...filteredProps}
      className={classNames('flex', {
        [alignItemsOptions[alignItems]]: typeof alignItems !== 'undefined',
        [justifyContentOptions[justifyContent]]: typeof justifyContent !== 'undefined',
        [spaces[space]]: typeof space !== 'undefined',
        [className]: typeof className !== 'undefined',
      })}
    />
  );
};

HStack.defaultProps = {

};

HStack.propTypes = {
  space: PropTypes.oneOf([0.5, 1, 1.5, 2, 3, 4, 6]),
  alignItems: PropTypes.oneOf(Object.keys(alignItemsOptions)),
  justifyContent: PropTypes.oneOf(Object.keys(justifyContentOptions)),
  className: PropTypes.string,
};

export default HStack;
