import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';

import PrimaryNavigation from 'soapbox/components/primary_navigation';
import LinkFooter from 'soapbox/features/ui/components/link_footer';
import BundleContainer from 'soapbox/features/ui/containers/bundle_container';
import {
  WhoToFollowPanel,
  TrendsPanel,
  PromoPanel,
  FeaturesPanel,
  SignUpPanel,
} from 'soapbox/features/ui/util/async-components';
import { getFeatures } from 'soapbox/utils/features';

import { Layout } from '../components/ui';

const mapStateToProps = state => {
  const me = state.get('me');
  const features = getFeatures(state.get('instance'));

  return {
    me,
    showTrendsPanel: features.trends,
    showWhoToFollowPanel: features.suggestions,
  };
};

export default @connect(mapStateToProps)
class DefaultPage extends ImmutablePureComponent {

  render() {
    const { me, children, showTrendsPanel, showWhoToFollowPanel } = this.props;

    return (
      <Layout>
        <Layout.Sidebar>
          <PrimaryNavigation />
        </Layout.Sidebar>

        <Layout.Main>
          {children}
        </Layout.Main>

        <Layout.Aside>
          {me ? (
            <BundleContainer fetchComponent={FeaturesPanel}>
              {Component => <Component key='features-panel' />}
            </BundleContainer>
          ) : (
            <BundleContainer fetchComponent={SignUpPanel}>
              {Component => <Component key='sign-up-panel' />}
            </BundleContainer>
          )}
          <BundleContainer fetchComponent={PromoPanel}>
            {Component => <Component key='promo-panel' />}
          </BundleContainer>
          {showTrendsPanel && (
            <BundleContainer fetchComponent={TrendsPanel}>
              {Component => <Component limit={3} key='trends-panel' />}
            </BundleContainer>
          )}
          {showWhoToFollowPanel && (
            <BundleContainer fetchComponent={WhoToFollowPanel}>
              {Component => <Component limit={5} key='wtf-panel' />}
            </BundleContainer>
          )}
          <LinkFooter key='link-footer' />
        </Layout.Aside>
      </Layout>
    );
  }

}
