import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { fetchLegalPage } from 'soapbox/actions/legal';
import { getSettings } from 'soapbox/actions/settings';
import { getSoapboxConfig } from 'soapbox/actions/soapbox';

import { languages } from '../preferences';

const mapStateToProps = state => ({
  locale: getSettings(state).get('locale'),
  legalPages: getSoapboxConfig(state).get('legalPages'),
});

@connect(mapStateToProps)
@injectIntl
class LegalPage extends ImmutablePureComponent {

  state = {
    pageHtml: '',
    locale: this.props.locale,
  }

  loadPageHtml = () => {
    const { dispatch, match, legalPages } = this.props;
    const { locale } = this.state;
    const { slug } = match.params;
    const page = legalPages.get(slug || 'legal');
    const fetchLocale = page && locale !== page.get('default') && page.get('locales').includes(locale);
    dispatch(fetchLegalPage(slug, fetchLocale && locale)).then(html => {
      this.setState({ pageHtml: html });
    }).catch(error => {
      // TODO: Better error handling. 404 page?
      this.setState({ pageHtml: '<h1>Page not found</h1>' });
    });
  }

  setLocale = (locale) => () => {
    this.setState({ locale });
  };

  componentDidMount() {
    this.loadPageHtml();
  }

  componentDidUpdate(prevProps, prevState) {
    const { locale, match, legalPages } = this.props;
    const { locale: prevLocale, legalPages: prevLegalPages } = prevProps;
    const { locale: stateLocale } = this.state;
    const { locale: prevStateLocale } = prevState;

    const { slug } = match.params;
    const { slug: prevSlug } = prevProps.match.params;

    if (locale !== prevLocale) this.setState({ locale });

    if (
      slug !== prevSlug ||
      stateLocale !== prevStateLocale ||
      (!prevLegalPages.get(slug || 'legal') && legalPages.get(slug || 'legal'))
    )
      this.loadPageHtml();
  }

  render() {
    const { match, legalPages } = this.props;
    const { slug } = match.params;

    const page = legalPages.get(slug || 'legal');
    const defaultLocale = page && page.get('default');
    const alsoAvailable = page && (
      <div className='rich-formatting also-available'>
        <FormattedMessage id='legal.also_available' defaultMessage='Available in:' />
        {' '}
        <ul>
          <li>
            <a href='#' onClick={this.setLocale(defaultLocale)}>
              {languages[defaultLocale] || defaultLocale}
            </a>
          </li>
          {
            page.get('locales').map(locale => (
              <li key={locale}>
                <a href='#' onClick={this.setLocale(locale)}>
                  {languages[locale] || locale}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );

    return (
      <div className='mt-10'>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.pageHtml }}
        />
        {alsoAvailable}
      </div>
    );
  }

}

export default LegalPage;
