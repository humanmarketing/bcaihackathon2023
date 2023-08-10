'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import { useState } from 'react';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Table, Text } from '@bigcommerce/big-design';
import { EditIcon } from '@bigcommerce/big-design-icons';
// import AiResults from '~/components/AiResults/AiResults';
// import { CustomPromptForm } from '~/components/PromptForm/CustomPromptForm';
// import { GuidedPromptForm } from '~/components/PromptForm/GuidedPromptForm';
// import { StyledButton } from '~/components/PromptForm/styled';
// import { prepareAiPromptAttributes } from '~/utils/utils';
// import Loader from '~/components/Loader';

const Hr = styled(Flex)`
  margin-left: -${({ theme }) => theme.spacing.xLarge};
  margin-right: -${({ theme }) => theme.spacing.xLarge};
`;

export default function Segments() {
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
                    { header: 'Goal', hash: 'goal', render: ({ goal }) => goal },
                    { header: 'Promotion', hash: 'Promotion', render: ({ promotion }) => promotion },
                    { header: '', hash: 'action', render: ({ id }) => <Text><EditIcon size='medium' color='' /> Edit {id}</Text> }

                  ]}
                  items={[
                    { id: 1, segment: 'Frequent Purchasers', goal: 'Reduce friction; maintain margins', promotion: 'Free Shipping' },
                    { id: 2, segment: 'Dormant Loyal Customers', goal: 'Restart purchase pattern', promotion: '20% Off Sitewide' },
                    { id: 3, segment: 'New Customers', goal: 'Expand catelog exposure', promotion: '50% Off Socks Category' },
                    { id: 4, segment: 'One-Time Purchasers', goal: 'Re-engage', promotion: '15% Off Next Purchase' },
                  ]}
                />

            </Panel>


          </>
        </Box>


      </FlexItem>

    </Flex>
  );
}
 