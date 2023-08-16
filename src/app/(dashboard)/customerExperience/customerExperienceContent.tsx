'use client';
import {  useState } from 'react';
import { Box, H1, Tabs } from '@bigcommerce/big-design';
import ProductPairings from './productPairings';
import Promotions from './promotions';
import Segments from './segments';

interface ComponentProps {
  token: string,
  storeHash: string,
  config: any
}


export default function CustomerExperienceContent({ token, storeHash, config }) {
    const [activeTab, setActiveTab] = useState('tab-1');

    const tabs = [
      { ariaControls: 'tab-1', id: 'tab-1', title: 'Promotions' },
      { ariaControls: 'tab-2', id: 'tab-2', title: 'Customer Segmentation' },
      { ariaControls: 'tab-3', id: 'tab-3', title: 'Post Purchase Upsells' }
    ];



    

    return (
      <Box
        marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
        marginVertical={{ mobile: 'none', tablet: 'medium' }}
      >
          <H1>Customer Experience</H1>
          <Tabs 
            activeTab={activeTab}
            id="cx-tabs"
            items={tabs}
            onTabClick={(setActiveTab)}
          />
          <Box marginTop="medium">
            {activeTab === 'tab-1' && <Promotions token={token} storeHash={storeHash} />}
            {activeTab === 'tab-2' && <Segments storeHash={storeHash} config={config} />}
            {activeTab === 'tab-3' && <ProductPairings />}
          </Box>
      </Box>
    );
}