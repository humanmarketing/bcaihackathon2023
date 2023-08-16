'use client';

import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { Button, Flex, FlexItem, Text, Textarea, Panel, Box, Input } from '@bigcommerce/big-design';
import { ChevronRightIcon } from '@bigcommerce/big-design-icons';
import ChatPrompt from '~/components/ChatPrompt/ChatPrompt';

// import Image from 'next/image';

interface PageProps {
  storeHash: string
}

const APP_NAME = 'Ecommerce Copilot AI';

export default function HomePage() {
  const setup = false;

  const storeHash = 'vdxg1jkwzi';
  const otherAttributes = {}


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
            Let's get you set up.
          </Text>
          <ChatPrompt endpoint='/api/onboardingGuidedChat' initialMessage={`Welcome to ${APP_NAME}! It only takes a few minutes to get started. Are you ready?`} otherAttributes={otherAttributes} token={''} storeHash={storeHash} setUpdateState={null} />
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