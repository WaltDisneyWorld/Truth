import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSoapboxConfig } from 'soapbox/actions/soapbox';
import BundleContainer from 'soapbox/features/ui/containers/bundle_container';
import { NotificationsContainer } from 'soapbox/features/ui/util/async-components';

import { logOut } from '../../actions/auth';
import Button from '../../components/button';
import { Stack, Text } from '../../components/ui';

const WaitlistPage = ({ account }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const logo = useSelector((state) => getSoapboxConfig(state).get('logo'));

  const waitlistPosition = account.getIn(['source', 'unapproved_position']);

  const onClickLogOut = (event) => {
    event.preventDefault();
    dispatch(logOut(intl));
  };

  return (
    <div className='h-screen w-full bg-gradient-to-tr from-primary-50 via-white to-cyan-50'>
      <main className='relative flex flex-col h-screen max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <header className='relative flex justify-between h-16'>
          <div className='flex-1 flex items-stretch justify-center relative'>
            <Link to='/' className='cursor-pointer flex-shrink-0 flex items-center'>
              <img alt='Logo' src={logo} className='h-7' />
            </Link>

            <div className='absolute inset-y-0 right-0 flex items-center pr-2 space-x-3'>
              <Button onClick={onClickLogOut} theme='primary' to='/auth/sign_out'>
                Sign out
              </Button>
            </div>
          </div>
        </header>

        <div className='-mt-16 flex flex-col justify-center items-center h-full'>
          <div className='max-w-2xl'>
            <Stack space={4}>
              <img src='/instance/images/waitlist.png' className='mx-auto w-32 h-32' alt='Waitlisted' />

              <Stack space={2}>
                <Text size='3xl' align='center' theme='primary' weight='bold'>#{waitlistPosition.toLocaleString()}</Text>
                <Text size='2xl' align='center' weight='bold'>You're on the Waitlist!</Text>
                <Text size='lg' theme='muted' align='center' weight='medium'>
                  Thanks for joining! Due to high demand, we have placed you on our
                  waitlist. We love you, and you are not just another number to us! But your
                  waitlist number is above <span role='img' aria-label='Smile'>🙂</span>
                </Text>
              </Stack>
            </Stack>
          </div>
        </div>
      </main>

      <BundleContainer fetchComponent={NotificationsContainer}>
        {(Component) => <Component />}
      </BundleContainer>
    </div>
  );
};

WaitlistPage.propTypes = {
  account: PropTypes.object,
};

export default WaitlistPage;
