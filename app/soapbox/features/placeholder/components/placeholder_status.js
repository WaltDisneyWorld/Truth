import * as React from 'react';

import PlaceholderAvatar from './placeholder_avatar';
import PlaceholderDisplayName from './placeholder_display_name';
import PlaceholderStatusContent from './placeholder_status_content';

const PlaceholderStatus = () => (
  <div className='status-placeholder bg-white px-4 py-6 shadow sm:shadow-xl sm:p-6 sm:rounded-xl'>
    <div className='w-full animate-pulse overflow-hidden'>
      <div>
        <div className='flex space-x-3 items-center'>
          <div className='flex-shrink-0'>
            <PlaceholderAvatar size={48} />
          </div>

          <div className='min-w-0 flex-1'>
            <PlaceholderDisplayName minLength={3} maxLength={25} />
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <PlaceholderStatusContent minLength={5} maxLength={120} />
      </div>
    </div>
  </div>
);

export default React.memo(PlaceholderStatus);
