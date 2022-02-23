import { default as ReachTooltip } from '@reach/tooltip';
import PropTypes from 'prop-types';
import React from 'react';

import './tooltip.css';

const Tooltip = ({
  children,
  text,
}) => {
  return (
    <ReachTooltip label={text}>
      {children}
    </ReachTooltip>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
