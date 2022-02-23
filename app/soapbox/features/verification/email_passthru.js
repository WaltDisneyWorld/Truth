import PropTypes from 'prop-types';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import snackbar from 'soapbox/actions/snackbar';
import { confirmEmailVerification } from 'soapbox/actions/verification';
import LoadingIndicator from 'soapbox/components/loading_indicator';

const Statuses = {
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

const EmailPassThru = ({ match }) => {
  const { token } = match.params;

  const intl = useIntl();
  const dispatch = useDispatch();

  const [status, setStatus] = React.useState(Statuses.IDLE);

  React.useEffect(() => {
    if (token) {
      dispatch(confirmEmailVerification(token))
        .then(() => {
          setStatus(Statuses.SUCCESS);
          dispatch(snackbar.success(intl.formatMessage({ id: 'email_passthru.success', defaultMessage: 'Your email has been verified!' })));
        })
        .catch(() => {
          setStatus(Statuses.FAIL);
          dispatch(
            snackbar.error(
              intl.formatMessage({
                id: 'email_passthru.fail',
                defaultMessage: 'Your email token has expired.',
              }),
            ),
          );
        });
    }
  }, [token]);

  if (!token || status === Statuses.SUCCESS || status === Statuses.FAIL) {
    return <Redirect to='/auth/verify' />;
  }

  return (
    <LoadingIndicator />
  );
};

EmailPassThru.propTypes = {
  match: PropTypes.object,
};

export default withRouter(EmailPassThru);
