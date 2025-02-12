'use client';

import Link from 'next/link'
import { useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Table, Text } from '@bigcommerce/big-design';
import { AddIcon, EditIcon } from '@bigcommerce/big-design-icons';
// import Loader from '~/components/Loader';
import StatusSwitch from '~/components/StatusSwitch';



export default function Segments({ storeHash, config }) {

  const segments = [
    { id: 1, segmentId: "d6c1bafb-7565-4943-8d7b-7b5efc967037", segment: 'Top Customers', status: true, goal: 'Reduce friction; maintain margins', promotion: '', promotionId: null },
    { id: 2, segmentId: "a529722a-b4a3-43d7-b7b2-9db02fd83858", segment: 'Loyal Customers', status: true, goal: 'Restart purchase pattern', promotion: '', promotionId: null },
    { id: 3, segmentId: "3e8b0d14-b33e-4c4e-b552-01aa1ce8e06e", segment: 'Dormant Customers', status: true, goal: 'Re-engage', promotion: '25% Off Next Purchase', promotionId: 3 },
    { id: 4, segmentId: "523a6bd4-32db-4d79-9e65-29b305fc1532", segment: 'High Potentials', status: true, goal: 'Expand catelog exposure', promotion: '', promotionId: null },
    { id: 5, segmentId: "5ff5765c-4a45-4e5d-8ae1-3c13ea8b12fe", segment: 'Small Buyers', status: true, goal: 'Increase AOV', promotion: '$50 Off Orders over $250', promotionId: 4 },
    { id: 6, segmentId: "3440430a-b378-4ba3-bbc3-fb9d4e0cbee6", segment: 'Worst Customers', status: false, goal: 'Maximize margins', promotion: '5% Off Next Purchase', promotionId: 5 },
    { id: 7, segmentId: "", segment: 'Other', status: false, goal: 'Re-engage', promotion: '15% Off Next Purchase', promotionId: null },
    { id: 8, segmentId: "", segment: 'Geography', status: false, goal: 'Regional growth', promotion: '', promotionId: null },
  ];


  return (
    <Flex flexDirection="column" padding="xSmall" style={{ minHeight: '90vh' }}>
      <FlexItem>
        <Box marginBottom="large">
          <>
            <Panel
              header='Customer Segmentation'
            >
                <Table
                  columns={[
                    { header: 'Segment', hash: 'segment', render: ({ segment }) => segment },
                    { header: 'Status', hash: 'status', render: ({ promotion, status }) => <StatusSwitch name={promotion} status={status} /> },
                    { header: 'Recommended Goal', hash: 'goal', render: ({ goal }) => goal },
                    { header: 'Promotion', hash: 'Promotion', render: ({ promotion }) => promotion },
                    { header: '', hash: 'action', render: ({ status, promotion, segmentId, segment }) => <PromotionAction status={status} promotion={promotion} id={segmentId} segment={segment} /> }
                  ]}
                  items={segments}
                />
            </Panel>
          </>
        </Box>
      </FlexItem>
    </Flex>
  );
}

const PromotionAction = ({ status, id: segmentId, promotion, segment: segmentName }) => {
  if(promotion.length > 0) {
    return <Text><EditIcon size='medium' color='' /> Edit</Text>
  }
  else if(!status) {
    return <Text></Text>
  }
  const params = new URLSearchParams({ segmentId, segmentName }).toString();
  return <Button iconLeft={<AddIcon />}><ButtonLink href={`/customerExperience/promotions/add?${params}`}>Add Promo</ButtonLink></Button>
}

const ButtonLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    background-color: #2852EB;
  }
`;
 
const Hr = styled(Flex)`
  margin-left: -${({ theme }) => theme.spacing.xLarge};
  margin-right: -${({ theme }) => theme.spacing.xLarge};
`;