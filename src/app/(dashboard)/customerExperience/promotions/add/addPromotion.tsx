'use client';
import {  use, useEffect, useState, type ChangeEvent } from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import useSWR from 'swr';
import { Box, Button, Flex, FlexItem, FormGroup, Panel, H1, H2, H3, H4, Input, Select, Stepper, Tabs, Text, Textarea } from '@bigcommerce/big-design';
import { ChevronRightIcon } from '@bigcommerce/big-design-icons';
import PromotionUpsert from '~/components/Promotion/PromotionUpsert';
import { usePromptAttributes } from '~/context/PromptAttributesContext';
import ChatPrompt from '~/components/ChatPrompt/ChatPrompt';

import * as db from '~/lib/db';
import { set } from 'zod';
import { prepareAiPromptAttributes } from '~/utils/utils';
import Loader from '~/components/Loader';

interface PromotionProps {
  segmentId: string;
  name: string;
  rules: any;
}


export default function AddPromotion({ segmentId, segmentName, token, storeHash, config }) {
  const [promo, setPromo] = useState<PromotionProps | null>(null);
  const [addMethod, setaddMethod] = useState('ai');
  const initialMessage = `Would you like to add a promotion to the ${segmentName} segment?`;
  const [results, setResults] = useState<any>({response: initialMessage});
  const [isPrompting, setIsPrompting] = useState(false);
  const [isPromoAdded, setIsPromoAdded] = useState(false);
  const [chat, setChat] = useState<any>([]);
  // const [newMessage, setNewMessage] = useState<string>('');



  const [activeTab, setActiveTab] = useState('tab-1');

  const tabs = [
    { ariaControls: 'tab-1', id: 'tab-1', title: 'Guided' },
    { ariaControls: 'tab-2', id: 'tab-2', title: 'Add Manually' },
  ];
  console.log(results.response);
  console.log(chat);

  const GuidedPromoCreation = ({ results, setIsPromoAdded }) => {
    const [newMessage, setNewMessage] = useState<string>('');
    console.log('newMessage', newMessage)
    const otherAttributes = {
      segmentId: segmentId,
      segmentName: segmentName
    }


    return (
      <>
          <Panel header="Create a Promotion with Copilot">
            <Text>
              Let's create your promotion.
            </Text>
            <ChatPrompt endpoint='/api/recommendPromotion' initialMessage={initialMessage} otherAttributes={otherAttributes} token={token} storeHash={storeHash} setUpdateState={setIsPromoAdded} />
          </Panel>
      </>
    )
  }

  

  return (
    <Box
      marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
      marginVertical={{ mobile: 'none', tablet: 'medium' }}
    >
        <>
          <H1>Add Promotion</H1>
          <Text>Let's configure your promotion offer for segment {segmentName}</Text>
          { isPromoAdded && (
            <Panel>
              <Text bold>Success! Your promotion has been added.</Text>
              <Text>Would you like to add another?</Text>
              <Button onClick={() => setIsPromoAdded(false)}>Yes</Button>
              <Button variant='secondary'><ButtonLink href="/customerExperience">No</ButtonLink></Button>
            </Panel>
          )}
          { !isPromoAdded && (
            <>
              <Tabs 
                activeTab={activeTab}
                id="cx-tabs"
                items={tabs}
                onTabClick={(setActiveTab)}
              />
              <Box marginTop="medium">
                { activeTab === 'tab-1' && <GuidedPromoCreation results={results} setIsPromoAdded={setIsPromoAdded} /> }
                { activeTab === 'tab-2' && <PromotionUpsert token={token} storeHash={storeHash} /> }
              </Box>
            </>
          )}
        </>
        <>
          

        </>
    </Box>
  );
}

const ButtonLink = styled(Link)`
  color: #3C64F4;
  text-decoration: none;
  &:hover {
    background-color: #F0F3FF;
  }
`;

const AIBox = styled(Box)`
  min-height: 6rem;
`;

const AITextArea = styled(Textarea)`
  border-color: red;
`;

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