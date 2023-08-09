'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import { useState } from 'react';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Text } from '@bigcommerce/big-design';
import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
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

export default function Stats({ customer }: { customer: Customer | null }) {
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

  const handleCancelClick = () =>
    window.top?.postMessage(
      JSON.stringify({ namespace: 'APP_EXT', action: 'CLOSE' }),
      '*'
    );
  const handleUseThisClick = () =>
    window.top?.postMessage(
      JSON.stringify({
        namespace: 'APP_EXT',
        action: 'CUSTOMER_VIEW',
        data: { customer },
      }),
      '*'
    );

  const statBoxStyles = `flexGrow: 1, flexShrink: 1, flexBasis: 0, padding: 'xSmall'`;

  return (
    <Flex flexDirection="column" padding="xSmall" style={{ minHeight: '90vh' }}>
      <FlexItem>
        {customer ? (
        <Box marginBottom="large">
          <>
            <H3>{customer.first_name} {customer.last_name}</H3>
            <Text color='secondary'>{customer.email}</Text>
          </>
          <>
            <Panel
              header='Customer Stats'
              >
                <Flex alignContent='stretch' flexDirection='row' flexGap='1rem'>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'> 
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Lifetime Value (LTV):</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>$1,000</H1>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Total Orders:</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>5</H1>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Average Order Value (AOV):</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>$200</H1>
                    </Box>
                  </FlexItem>
                </Flex>
                <Flex alignContent='stretch' flexDirection='row' flexGap='1rem' marginTop='small'>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>First Order Date:</Text>
                      <Text marginTop='none' marginBottom='none'>Jan 1, 2021</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Last Order Date:</Text>
                      <Text marginTop='none' marginBottom='none'>Aug 1, 2023</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Days Since Last Order:</Text>
                      <Text marginTop='none' marginBottom='none'>9</Text>
                    </Box>
                  </FlexItem>
                </Flex>
                <Flex alignContent='stretch' flexDirection='row' flexGap='1rem' marginTop='small'>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Original Source:</Text>
                      <Text marginTop='none' marginBottom='none'>Organic Search</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Latest Source:</Text>
                      <Text marginTop='none' marginBottom='none'>Email</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                  </FlexItem>
                </Flex>
            </Panel>
            <Panel
              header='Customer Segmentation & Promotions'
              >
                <Flex alignContent='stretch' flexDirection='column' flexGap='1rem'>
                  <FlexItem>
                    <Text><Text as="span" bold>Customer Segment:</Text> Frequent Purchases</Text>
                    <Text><Text as="span" bold>Segment Promotion:</Text> Free Shipping</Text>
                  </FlexItem>
                  <FlexItem>
                    <Flex alignContent='stretch' flexDirection='row' flexGap='1rem'>
                      <FlexItem>
                        <Button variant="primary">
                          Send Promo
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="secondary" iconRight={<OpenInNewIcon size='medium' />}>
                          View Segment
                        </Button>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>

            </Panel>

          </>
        </Box>
        ) : (
        <Box display="inline-flex" marginBottom="large">
          <Text>Customer Not Found</Text>
        </Box>
        )
        }

      </FlexItem>

    </Flex>
  );
}
 