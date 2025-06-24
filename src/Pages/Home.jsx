import React from 'react';
import Hero from '../component/Hero';
import OurServices from './OurServices';
import HowItWorks from './HowItWork';
import PartnersMarquee from './PartnersMarquee';
import FeatureSection from './FeatureSection';
import BeMarchande from './BeMarchande';
import FAQ from './FAQ';
import Rewiews from './CustomerReviews';
import CustomerReviews from './CustomerReviews';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <PartnersMarquee></PartnersMarquee>
            <FeatureSection></FeatureSection>
            <BeMarchande></BeMarchande>
            <CustomerReviews></CustomerReviews>
            <FAQ></FAQ>
            
            
        </div>
    );
};

export default Home;