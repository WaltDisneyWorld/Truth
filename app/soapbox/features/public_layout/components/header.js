import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { logIn, verifyCredentials } from 'soapbox/actions/auth';
import { fetchInstance } from 'soapbox/actions/instance';
import { getSoapboxConfig } from 'soapbox/actions/soapbox';

import animationData from '../../../../images/circles.json';
import { openModal } from '../../../actions/modal';
import Button from '../../../components/button';
import { Form, HStack, IconButton, Input, Tooltip } from '../../../components/ui';

const messages = defineMessages({
  home: { id: 'header.home.label', defaultMessage: 'Home' },
  login: { id: 'header.login.label', defaultMessage: 'Log in' },
  register: { id: 'header.register.label', defaultMessage: 'Register' },
  emailAddress: { id: 'header.login.email.placeholder', defaultMessage: 'Email address' },
  password: { id: 'header.login.password.label', defaultMessage: 'Password' },
});

const defaultOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const Header = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const logo = useSelector((state) => getSoapboxConfig(state).get('logo'));
  const instance = useSelector((state) => state.get('instance'));
  const isOpen = instance.get('registrations', false) === true;

  const [isLoading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const [mfaToken, setMfaToken] = React.useState(false);

  const open = () => dispatch(openModal('LANDING_PAGE'));

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    dispatch(logIn(intl, email, password))
      .then(({ access_token }) => {
        return (
          dispatch(verifyCredentials(access_token))
            // Refetch the instance for authenticated fetch
            .then(() => dispatch(fetchInstance()))
            .then(() => setShouldRedirect(true))
        );
      })
      .catch((error) => {
        setLoading(false);

        const data = error.response && error.response.data;
        if (data && data.error === 'mfa_required') {
          setMfaToken(data.mfa_token);
        }
      });
  };

  if (shouldRedirect) return <Redirect to='/' />;
  if (mfaToken) return <Redirect to={`/login?token=${encodeURIComponent(mfaToken)}`} />;

  return (
    <header>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Header'>
        <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
          <div className='flex items-center relative'>
            <div className='hidden sm:block absolute z-0 left-0 top-0 -ml-[330px] -mt-[400px]'>
              <Lottie
                options={defaultOptions}
                height={800}
                width={800}
                isClickToPauseDisabled
              />
            </div>
            <Link to='/' className='z-10'>
              <img alt='Logo' src={logo} className='h-6 w-auto min-w-[160px] cursor-pointer' />
              <span className='hidden'>{intl.formatMessage(messages.home)}</span>
            </Link>
          </div>
          <div className='ml-10 flex space-x-6 items-center relative z-10'>
            <IconButton
              title='Open Menu'
              src={require('@tabler/icons/icons/menu-2.svg')}
              onClick={open}
              className='md:hidden bg-transparent text-gray-400 hover:text-gray-600'
            />

            <div className='hidden md:flex items-center space-x-6'>
              <HStack space={6} alignItems='center'>
                <a
                  href='https://apps.apple.com/us/app/truth-social/id1586018825'
                  target='_blank'
                  className='text-sm font-medium text-gray-500 hover:text-gray-900'
                >
                  Download
                </a>
                <a
                  href='#'
                  target='_blank'
                  className='text-sm font-medium text-gray-500 hover:text-gray-900'
                >
                  Help Center
                </a>
              </HStack>

              <HStack space={2} className='xl:hidden'>
                <Button to='/login' theme='secondary'>
                  {intl.formatMessage(messages.login)}
                </Button>

                {isOpen && (
                  <Button
                    to='/auth/verify'
                    theme='primary'
                  >
                    {intl.formatMessage(messages.register)}
                  </Button>
                )}
              </HStack>
            </div>

            <Form className='hidden xl:flex space-x-2 items-center' onSubmit={handleSubmit}>
              <Input
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type='text'
                placeholder={intl.formatMessage(messages.emailAddress)}
                className='max-w-[200px]'
              />

              <Input
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type='password'
                placeholder={intl.formatMessage(messages.password)}
                className='max-w-[200px]'
              />

              <Link to='/reset-password'>
                <Tooltip text='Forgot password?'>
                  <IconButton
                    src={require('@tabler/icons/icons/help.svg')}
                    className='bg-transparent text-gray-400 hover:text-gray-700 cursor-pointer'
                    iconClassName='w-5 h-5'
                  />
                </Tooltip>
              </Link>

              <Button
                theme='primary'
                type='submit'
                disabled={isLoading}
              >
                {intl.formatMessage(messages.login)}
              </Button>
            </Form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
