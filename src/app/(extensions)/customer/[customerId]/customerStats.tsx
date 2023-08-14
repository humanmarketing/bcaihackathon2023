'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import { useState } from 'react';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Badge, Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Text } from '@bigcommerce/big-design';
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

interface CustomerDetails {
  customer_id: string;
  first_order_date: string;
  first_order_total: string;
  most_recent_order_date: string;
  most_recent_order_total: string;
  number_of_discounted_orders: string;
  order_count: string;
  order_frequency_days: string;
  total_discounts_value: string;
  cltv: string;
  days_between_first_last_order: string;
  date_created: string;
}


export default function Stats({ customer, details }: { customer: Customer | null, details: CustomerDetails }) {
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


  const rfmSegment = performRFMSegmentation(details);
  const mappedSegments = mapRFMSegmentToSegments(rfmSegment);


  const statBoxStyles = `flexGrow: 1, flexShrink: 1, flexBasis: 0, padding: 'xSmall'`;

  return (
    <Flex flexDirection="column" padding="xSmall" style={{ minHeight: '90vh' }}>
      <FlexItem>
        {customer ? (
        <Box marginBottom="large">
          <>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="medium"
            >
              <FlexItem>
                <H3 marginBottom="xxSmall">{customer.first_name} {customer.last_name}</H3>
                <Text color='secondary'>{customer.email}</Text>
              </FlexItem>
              <FlexItem>
                <Flex
                  flexDirection='column'
                >
                  <FlexItem>
                    <Badge 
                      label={mappedSegments.segment}
                      variant="success"
                    />
                  </FlexItem>
                  <FlexItem>
                    <Text color='secondary'>RFM: {rfmSegment.recency} - {rfmSegment.frequency} - {rfmSegment.monetary}</Text>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Flex>
          </>
          <>
            <Panel
              header='Customer Stats'
              >
                <Flex alignContent='stretch' flexDirection='row' flexGap='1rem'>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Total Orders:</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>{details.order_count}</H1>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'> 
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Lifetime Value (LTV):</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>${details.cltv}</H1>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Average Order Value (AOV):</Text>
                      <H1 as="h4" marginTop='none' marginBottom='none'>${getAov(parseFloat(details.cltv), parseFloat(details.order_count))}</H1>
                    </Box>
                  </FlexItem>
                </Flex>
                <Flex alignContent='stretch' flexDirection='row' flexGap='1rem' marginTop='small'>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>First Order Date:</Text>
                      <Text marginTop='none' marginBottom='none'>{formatDate(details.first_order_date)}</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Last Order Date:</Text>
                      <Text marginTop='none' marginBottom='none'>{formatDate(details.most_recent_order_date)}</Text>
                    </Box>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexShrink={1} flexBasis='0'>
                    <Box border='box' padding='xSmall'>
                      <Text bold marginBottom='xSmall'>Days Since Last Order:</Text>
                      <Text marginTop='none' marginBottom='none'>{calculateDaysDifference(details.most_recent_order_date)}</Text>
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
                    <Text><Text as="span" bold>Customer Segment:</Text> Frequent Purchaser (200 Others)</Text>
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
 
function getAov(ltv: number, order_count: number) {
  if(order_count === 0) return 0;
  
  return (ltv / order_count).toFixed(2);
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  
  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function calculateDaysDifference(inputDate: string): number {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const inputDateTime = new Date(inputDate).getTime();
  const currentDateTime = new Date().getTime();

  const timeDifference = currentDateTime - inputDateTime;
  const daysDifference = Math.floor(timeDifference / oneDayInMilliseconds);

  return daysDifference;
}

function calculateRFMScore(value, quantiles) {
  if (value <= quantiles[0]) {
    return 1;
  } else if (value <= quantiles[1]) {
    return 2;
  } else if (value <= quantiles[2]) {
    return 3;
  } else {
    return 4;
  }
}

function performRFMSegmentation(customer) {
  // Calculate quantiles for Recency, Frequency, and Monetary Value
  const recencyQuantiles = [0.25, 0.5, 0.75];
  const frequencyQuantiles = [0.25, 0.5, 0.75];
  const monetaryQuantiles = [0.25, 0.5, 0.75];
  
  // Calculate RFM scores for the provided customer
  const recency = calculateRFMScore(customer.days_between_first_last_order, recencyQuantiles);
  const frequency = calculateRFMScore(customer.order_count, frequencyQuantiles);
  const monetary = calculateRFMScore(customer.most_recent_order_total, monetaryQuantiles);
  
  // Create and return the RFM segment for the customer
  const segment = {
    customer_id: customer.customer_id,
    recency,
    frequency,
    monetary,
  };
  
  return segment;
}

function mapRFMSegmentToSegments(rfm) {
    let segment = '';
    let goal = '';
    let promotion = '';
    let status = true; // Default to true for segments without specific status

    // Map RFM segments to your defined segments and set goals and promotions

    if (rfm.recency === 1 && rfm.frequency === 4 && rfm.monetary === 4) {
      segment = 'Top Customers';
      goal = 'Reduce friction; maintain margins';
    } else if (rfm.recency === 2 && rfm.frequency === 3 && rfm.monetary === 3) {
      segment = 'Loyal Customers';
      goal = 'Restart purchase pattern';
      promotion = '20% Off Sitewide';
    } else if (rfm.recency === 2 && rfm.frequency === 1 && rfm.monetary === 2) {
      segment = 'High Potentials';
      goal = 'Expand catalog exposure';
      promotion = '50% Off Socks Category';
    } else if (rfm.recency === 3 && rfm.frequency === 2 && rfm.monetary === 1) {
      segment = 'Small Buyers';
      goal = 'Re-engage';
      promotion = '15% Off Next Purchase';
    } else if (rfm.recency === 4 && rfm.frequency === 1 && rfm.monetary === 1) {
      segment = 'Dormant Customers';
      goal = 'Re-engage';
      promotion = '15% Off Next Purchase';
    } else if (rfm.recency === 4 && rfm.frequency === 4 && rfm.monetary === 4) {
      segment = 'Worst Customers';
      goal = 'Re-engage';
      promotion = '15% Off Next Purchase';
      status = false;
    } else if (rfm.recency === 3 && rfm.frequency === 3 && rfm.monetary === 3) {
      segment = 'Other';
      goal = 'Re-engage';
      promotion = '15% Off Next Purchase';
      status = false;
    } else if (rfm.recency === 3 && rfm.frequency === 4 && rfm.monetary === 4) {
      segment = 'Geography';
      goal = 'Regional growth';
      promotion = '15% Off Next Purchase';
      status = false;
    }

    return {
      id: rfm.customer_id,
      segment,
      status,
      goal,
      promotion,
      promotionId: null
    };
}

