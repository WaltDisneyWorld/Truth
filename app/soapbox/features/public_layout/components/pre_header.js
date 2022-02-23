import * as React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { IconButton } from 'soapbox/components/ui';

const messages = defineMessages({
  close: { id: 'pre_header.close', defaultMessage: 'Close' },
});

export default () => {
  const intl = useIntl();

  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    localStorage.setItem('soapbox:welcome-banner', '0');
    setHidden(true);
  };

  React.useEffect(() => {
    const shouldBeHidden = localStorage.getItem('soapbox:welcome-banner') === '0';

    setHidden(shouldBeHidden);
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className='bg-primary-900 z-10'>
      <div className='max-w-7xl flex justify-between mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='h-14 flex items-center space-x-3'>
          <div className='space-x-1.5 flex items-center'>
            <p className='text-white font-semibold'>
              <span>Welcome to [redacted]</span>
            </p>

            <span
              className='rounded-md border border-solid border-white text-white text-xs font-semibold tracking-wide opacity-70 py-0.5 px-2 uppercase'
            >
              Beta
            </span>
          </div>

          <Link className='text-sea-blue text-sm lowercase hover:underline' to='/beta'>
            Learn More
          </Link>
        </div>

        <div className='flex items-center'>
          <IconButton
            src={require('@tabler/icons/icons/x.svg')}
            onClick={handleClose}
            title={intl.formatMessage(messages.close)}
            className='bg-transparent text-white text-opacity-75'
            iconClassName='w-5 h-5'
          />
        </div>
      </div>
    </div>
  );
};
