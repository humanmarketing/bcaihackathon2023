'use client';

import React from 'react';

import styled from 'styled-components';
import useSWR from 'swr';
import { Flex, FlexItem, Text, Textarea, Panel, Box, Input } from '@bigcommerce/big-design';
import { ChevronRightIcon } from '@bigcommerce/big-design-icons';

// import Image from 'next/image';

interface PageProps {
  storeHash: string
}

export default function HomePage() {
  const setup = true;

  const storeHash = 'vdxg1jkwzi';


  return (
    <Box
      marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
      marginVertical={{ mobile: 'none', tablet: 'xxLarge' }}
    >
      {setup ? (
        <Panel header="Customer Segment Analysis">
            <Text>Show segment & chart</Text>
        </Panel>
      )
      : (
        <Panel header="Get Started">
          <Text>
            Create eye-catching product descriptions in a flash with the Product
            Description Generator. Using the product information from your catalog,
            the generator creates product descriptions in limitless styles and
            voices designed to drive traffic to your storefront and generate sales.
          </Text>
          <AIBox
            backgroundColor="secondary20"
            border="box"
            borderRadius="normal"
            padding="medium"
          >
            <Text>AI Text</Text>
          </AIBox>
          <AIBox
            backgroundColor="white"
            border="box"
            borderRadius="normal"
            marginTop="xLarge"
            padding="medium"
          >
            <Flex
              justifyContent="stretch"
              flexDirection="column"
            >
              <FlexItem
                flexGrow={1}
              >
                <Flex
                  justifyContent="stretch"
                  flexDirection="row"
                >
                  <FlexItem
                    flexGrow={1}
                  >
                    <AITextArea
                      rows={3}
                      placeholder="Placeholder"
                    />
                  </FlexItem>
                  <FlexItem
                    flexGrow={0}
                    flexShrink={1}
                  >
                    <Flex
                      alignItems="flex-end"
                      flexDirection="column"
                      justifyContent='flex-end'
                    >
                      <FlexItem
                        flexGrow={1}
                      >
                          <ChevronRightIcon />
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
              </FlexItem>
              
            </Flex>
          </AIBox>
        </Panel>
      )}
    </Box>
  );
}


const AIBox = styled(Box)`
  min-height: 6rem;
`;

const AITextArea = styled(Textarea)`
  border-color: red;
`;

// const AIBox() {
//   const StyledBox = styled(Box)`
//     box-sizing: content-box;
//     height: ${({ theme }) => theme.spacing.large};
//     width: ${({ theme }) => theme.spacing.large};
//   `;

//   return (
//     <StyledBox
//       backgroundColor="secondary20"
//       border="box"
//       borderRadius="circle"
//       padding="medium"
//     >
//       BC
//     </StyledBox>
//   );
// }