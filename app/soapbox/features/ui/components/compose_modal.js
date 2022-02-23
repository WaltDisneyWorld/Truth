import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { cancelReplyCompose } from '../../../actions/compose';
import { openModal } from '../../../actions/modal';
import { Modal } from '../../../components/ui';
import ComposeFormContainer from '../../compose/containers/compose_form_container';

const messages = defineMessages({
  close: { id: 'lightbox.close', defaultMessage: 'Close' },
  confirm: { id: 'confirmations.delete.confirm', defaultMessage: 'Delete' },
});

const mapStateToProps = state => {
  const me = state.get('me');
  return {
    account: state.getIn(['accounts', me]),
    composeText: state.getIn(['compose', 'text']),
    privacy: state.getIn(['compose', 'privacy']),
    inReplyTo: state.getIn(['compose', 'in_reply_to']),
  };
};

class ComposeModal extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    intl: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    composeText: PropTypes.string,
    privacy: PropTypes.string,
    inReplyTo: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  onClickClose = () => {
    const { composeText, dispatch, onClose, intl } = this.props;

    if (composeText) {
      dispatch(openModal('CONFIRM', {
        icon: require('@tabler/icons/icons/trash.svg'),
        heading: <FormattedMessage id='confirmations.delete.heading' defaultMessage='Delete post' />,
        message: <FormattedMessage id='confirmations.delete.message' defaultMessage='Are you sure you want to delete this post?' />,
        confirm: intl.formatMessage(messages.confirm),
        onConfirm: () => dispatch(cancelReplyCompose()),
        onCancel: () => dispatch(openModal('COMPOSE')),
      }));
    } else {
      onClose('COMPOSE');
    }
  };

  renderTitle = () => {
    const { privacy, inReplyTo } = this.props;

    if (privacy === 'direct') {
      return <FormattedMessage id='navigation_bar.compose_direct' defaultMessage='Direct message' />;
    } else if (inReplyTo) {
      return <FormattedMessage id='navigation_bar.compose_reply' defaultMessage='Reply to post' />;
    } else {
      return <FormattedMessage id='navigation_bar.compose' defaultMessage='Compose new post' />;
    }
  }

  render() {
    return (
      <Modal title={this.renderTitle()} onClose={this.onClickClose}>
        <ComposeFormContainer />
      </Modal>
    );
  }

}

export default injectIntl(connect(mapStateToProps)(ComposeModal));
