import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const spaces = {
  1: 'space-y-1',
  1.5: 'space-y-1.5',
  2: 'space-y-2',
  3: 'space-y-3',
  4: 'space-y-4',
};

const justifyContentOptions = {
  center: 'justify-center',
};

const alignItemsOptions = {
  center: 'items-center',
};

const Stack = (props) => {
  const { space, alignItems, justifyContent, ...filteredProps } = props;

  return (
    <div
      {...filteredProps}
      className={classNames('flex flex-col', {
        [spaces[space]]: typeof space !== 'undefined',
        [alignItemsOptions[alignItems]]: typeof alignItems !== 'undefined',
        [justifyContentOptions[justifyContent]]: typeof justifyContent !== 'undefined',
      })}
    />
  );
};

Stack.propTypes = {
  space: PropTypes.oneOf([0.5, 1, 1.5, 2, 3, 4, 5]),
  alignItems: PropTypes.oneOf(Object.keys(alignItemsOptions)),
  justifyContent: PropTypes.oneOf(Object.keys(justifyContentOptions)),
};

export default Stack;
