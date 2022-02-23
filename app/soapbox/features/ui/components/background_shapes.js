import React from 'react';
import InlineSVG from 'react-inlinesvg';

export default () => (
  <div className='fixed inset-0 left-40 dark:hidden'>
    <InlineSVG src={require('../../../../images/bg-shape.svg')} />
  </div>
);
