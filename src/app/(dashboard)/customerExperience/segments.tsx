'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import Link from 'next/link'
import { useState } from 'react';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Table, Text } from '@bigcommerce/big-design';
import { AddIcon, EditIcon } from '@bigcommerce/big-design-icons';
// import AiResults from '~/components/AiResults/AiResults';
// import { CustomPromptForm } from '~/components/PromptForm/CustomPromptForm';
// import { GuidedPromptForm } from '~/components/PromptForm/GuidedPromptForm';
// import { StyledButton } from '~/components/PromptForm/styled';
// import { prepareAiPromptAttributes } from '~/utils/utils';
// import Loader from '~/components/Loader';
import StatusSwitch from '~/components/StatusSwitch';

const Hr = styled(Flex)`
  margin-left: -${({ theme }) => theme.spacing.xLarge};
  margin-right: -${({ theme }) => theme.spacing.xLarge};
`;

export default function Segments({ storeHash, config }) {
  // const { results, setResults, handleDescriptionChange } =
  //   useDescriptionsHistory(customer.id);
  // const [isPrompting, setIsPrompting] = useState(false);
  // const [description, setDescription] = useState(
  //   results.at(0)?.description || ''
  // );

  // const {
  //   isFormGuided,
  //   setIsFormGuided,
  //   currentAttributes,
  //   guidedAttributes,
  //   customAttributes,
  //   setGuidedAttributes,
  //   setCustomAttributes,
  // } = usePromptAttributes();

  // const handleGenerateDescription = async () => {
  //   setIsPrompting(true);
  //   const res = await fetch('/api/generateDescription', {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       prepareAiPromptAttributes(currentAttributes, product)
  //     ),
  //   });

  //   if (!res.ok) {
  //     setIsPrompting(false);
  //     throw new Error('Cannot generate description, try again later');
  //   }

  //   const { description } = (await res.json()) as { description: string };
  //   setResults({ promptAttributes: currentAttributes, description });
  //   setIsPrompting(false);
  // };

  // const descriptionChangeWrapper = (index: number, description: string) => {
  //   setDescription(description);
  //   handleDescriptionChange(index, description);
  // };


  const segments = [
    { id: 1, segment: 'Top Customers', status: true, goal: 'Reduce friction; maintain margins', promotion: '', promotionId: null },
    { id: 2, segment: 'Loyal Customers', status: true, goal: 'Restart purchase pattern', promotion: '20% Off Sitewide', promotionId: null },
    { id: 3, segment: 'High Potentials', status: true, goal: 'Expand catelog exposure', promotion: '50% Off Socks Category', promotionId: null },
    { id: 4, segment: 'Small Buyers', status: true, goal: 'Re-engage', promotion: '15% Off Next Purchase', promotionId: null },
    { id: 5, segment: 'Dormant Customers', status: true, goal: 'Re-engage', promotion: '15% Off Next Purchase', promotionId: null },
    { id: 6, segment: 'Worst Customers', status: false, goal: 'Re-engage', promotion: '15% Off Next Purchase', promotionId: null },
    { id: 7, segment: 'Other', status: false, goal: 'Re-engage', promotion: '15% Off Next Purchase', promotionId: null },
    { id: 8, segment: 'Geography', status: false, goal: 'Regional growth', promotion: '15% Off Next Purchase', promotionId: null },
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
                    { header: '', hash: 'action', render: ({ promotion, id, segment }) => <PromotionAction promotion={promotion} id={id} segment={segment} /> }
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

const PromotionAction = ({ id: segmentId, promotion, segment: segmentName }) => {
  if(promotion.length > 0) {
    return <Text><EditIcon size='medium' color='' /> Edit {segmentId}</Text>
  }
  const params = new URLSearchParams({ segmentId, segmentName }).toString();
  return <Button iconLeft={<AddIcon />}><Link href={`/customerExperience/promotions/add?${params}`}>Add Promo</Link></Button>
}
 

// const segments = [
//   { id: 1, segment: 'Top Customers', status: true, goal: 'Reduce friction; maintain margins', promotion: 'Free Shipping' },
//   { id: 2, segment: 'Loyal Customers', status: true, goal: 'Restart purchase pattern', promotion: '20% Off Sitewide' },
//   { id: 3, segment: 'High Potentials', status: true, goal: 'Expand catelog exposure', promotion: '50% Off Socks Category' },
//   { id: 4, segment: 'Small Buyers', status: true, goal: 'Re-engage', promotion: '15% Off Next Purchase' },
//   { id: 5, segment: 'Dormant Customers', status: true, goal: 'Re-engage', promotion: '15% Off Next Purchase' },
//   { id: 6, segment: 'Worst Customers', status: false, goal: 'Re-engage', promotion: '15% Off Next Purchase' },
//   { id: 7, segment: 'Other', status: false, goal: 'Re-engage', promotion: '15% Off Next Purchase' },
//   { id: 8, segment: 'Geography', status: false, goal: 'Regional growth', promotion: '15% Off Next Purchase' },
// ];