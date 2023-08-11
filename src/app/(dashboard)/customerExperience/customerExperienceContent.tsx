'use client';
import {  useEffect, useState } from 'react';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Tabs, Text } from '@bigcommerce/big-design';
import * as db from '~/lib/db';
import ProductPairings from './productPairings';
import Promotions from './promotions';
import Segments from './segments';

export default function CustomerExperienceContent({ token, storeHash, config }) {

    const [activeTab, setActiveTab] = useState('tab-1');

    const tabs = [
        { ariaControls: 'tab-1', id: 'tab-1', title: 'Customer Segmentation' },
        { ariaControls: 'tab-2', id: 'tab-2', title: 'Promotions' },
        { ariaControls: 'tab-3', id: 'tab-3', title: 'Product Pairings' }
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
            {activeTab === 'tab-1' && <Segments storeHash={storeHash} config={config} />}
            {activeTab === 'tab-2' && <Promotions token={token} storeHash={storeHash} />}
            {activeTab === 'tab-3' && <ProductPairings />}
          </Box>
      </Box>
    );
}