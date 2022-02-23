import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { fetchFavourites } from 'soapbox/actions/interactions';
import LoadingIndicator from 'soapbox/components/loading_indicator';
import ScrollableList from 'soapbox/components/scrollable_list';
import { Modal } from 'soapbox/components/ui';
import AccountContainer from 'soapbox/containers/account_container';

const mapStateToProps = (state, props) => {
  return {
    accountIds: state.getIn(['user_lists', 'favourited_by', props.statusId]),
  };
};

export default @connect(mapStateToProps)
class FavouritesModal extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    statusId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    accountIds: ImmutablePropTypes.orderedSet,
  };

  fetchData = () => {
    const { dispatch, statusId } = this.props;

    dispatch(fetchFavourites(statusId));
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
    this.props.onClose('FAVOURITES', noPop);
  };

  render() {
    const { accountIds } = this.props;

    let body;

    if (!accountIds) {
      body = <LoadingIndicator />;
    } else {
      const emptyMessage = <FormattedMessage id='empty_column.favourites' defaultMessage='No one has liked this post yet. When someone does, they will show up here.' />;

      body = (
        <ScrollableList
          scrollKey='favourites'
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
        title={<FormattedMessage id='column.favourites' defaultMessage='likes' />}
        onClose={this.onClickClose}
        isScrollable
      >
        {body}
      </Modal>
    );
  }

}
