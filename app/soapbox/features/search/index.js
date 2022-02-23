import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import { Column } from 'soapbox/components/ui';
import SearchContainer from 'soapbox/features/compose/containers/search_container';
import SearchResultsContainer from 'soapbox/features/compose/containers/search_results_container';

const messages = defineMessages({
  heading: { id: 'column.search', defaultMessage: 'Search' },
});

const Search = ({ intl }) => (
  <Column label={intl.formatMessage(messages.heading)}>
    <div className='space-y-4'>
      <SearchContainer autoFocus autoSubmit />
      <SearchResultsContainer />
    </div>
  </Column>
);

Search.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Search);
