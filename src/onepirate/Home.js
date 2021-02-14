import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import SoundCloud from 'react-custom-soundcloud';
import 'react-custom-soundcloud/dist/style.css';
import styles from '../dante/Dante.module.css';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <div className={styles.player}>
        <SoundCloud
        className='img-responsive'
        playlist="774341907"
        mini={false}
        theme={'dark'}
      />
      </div>
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
