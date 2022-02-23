import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { fetchReblogs } from 'soapbox/actions/interactions';
import { fetchStatus } from 'soapbox/actions/statuses';
import LoadingIndicator from 'soapbox/components/loading_indicator';
import ScrollableList from 'soapbox/components/scrollable_list';
import AccountContainer from 'soapbox/containers/account_container';

import { Modal } from '../../../components/ui';

const mapStateToProps = (state, props) => {
  return {
    accountIds: state.getIn(['user_lists', 'reblogged_by', props.statusId]),
  };
};

export default @connect(mapStateToProps)
@injectIntl
class ReblogsModal extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    statusId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    accountIds: ImmutablePropTypes.orderedSet,
  };

  fetchData = () => {
    const { dispatch, statusId } = this.props;

    dispatch(fetchReblogs(statusId));
    dispatch(fetchStatus(statusId));
  }

  componentDidMount() {
    this.fetchData();
    this.unlistenHistory = this.context.router.history.listen((_, action) => {
      if (action === 'PUSH') {
        this.onClickClose(null, true);
      }
    });
  }

  componentWillUnmount() {
    if (this.unlistenHistory) {
      this.unlistenHistory();
    }
  }

  onClickClose = (_, noPop) => {
    this.props.onClose('REBLOGS', noPop);
  };

  render() {
    const { accountIds } = this.props;

    let body;

    if (!accountIds) {
      body = <LoadingIndicator />;
    } else {
      const emptyMessage = <FormattedMessage id='status.reblogs.empty' defaultMessage='No one has reposted this post yet. When someone does, they will show up here.' />;

      body = (
        <ScrollableList
          scrollKey='reblogs'
          emptyMessage={emptyMessage}
          className='space-y-3'
        >
          {accountIds.map(id =>
            <AccountContainer key={id} id={id} />,
          )}
        </ScrollableList>
      );
    }


    return (
      <Modal
        title={<FormattedMessage id='column.reblogs' defaultMessage='Reposts' />}
        onClose={this.onClickClose}
        isScrollable
      >
        {body}
      </Modal>
    );
  }

}
