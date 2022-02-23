import PropTypes from 'prop-types';
import React from 'react';

import Helmet from 'soapbox/components/helmet';

import { Card, CardBody, CardHeader, CardTitle } from '../card/card';

const Column = React.forwardRef(({ children, label, transparent = false, withHeader = true }, ref) => {
  const renderChildren = () => {
    if (transparent) {
      return children;
    }

    return (
      <Card variant='rounded'>
        {withHeader ? (
          <CardHeader>
            <CardTitle title={label} />
          </CardHeader>
        ) : null}

        <CardBody>
          {children}
        </CardBody>
      </Card>
    );
  };

  return (
    <div role='region' ref={ref} aria-label={label} column-type={transparent ? 'transparent' : 'filled'}>
      <Helmet><title>{label}</title></Helmet>

      {renderChildren()}
    </div>
  );
});

Column.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  transparent: PropTypes.bool,
  withHeader: PropTypes.bool,
};

export default Column;
