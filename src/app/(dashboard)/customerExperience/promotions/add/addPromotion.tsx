'use client';
import {  use, useEffect, useState, type ChangeEvent } from 'react';

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

type InputFieldValue = string | number | boolean | undefined;


export default function AddPromotion({ segmentId, segmentName, token, storeHash, config }) {
  const [promo, setPromo] = useState<PromotionProps | null>(null);
  const [addMethod, setaddMethod] = useState('ai');
  const initialMessage = `Would you like to add a promotion to the ${segmentName} segment?`;
  const [results, setResults] = useState<any>({response: initialMessage});
  const [isPrompting, setIsPrompting] = useState(false);
  const [chat, setChat] = useState<any>([]);
  // const [newMessage, setNewMessage] = useState<string>('');


  
  const currentAttributes = {
    style: 'story',
    wordCount: 250,
    includeProductAttributes: true,
    optimizedForSeo: true,
    brandVoice: '',
    additionalAttributes: '',
    keywords: '',
    instructions: '',
  };

  const [activeTab, setActiveTab] = useState('tab-1');

  const tabs = [
    { ariaControls: 'tab-1', id: 'tab-1', title: 'Guided' },
    { ariaControls: 'tab-2', id: 'tab-2', title: 'Add Manually' },
  ];
  console.log(results.response);
  console.log(chat);

  const GuidedPromoCreation = ({ results }) => {
    const [newMessage, setNewMessage] = useState<string>('');
    console.log('newMessage', newMessage)
    const otherAttributes = {
      segmentId: segmentId,
      segmentName: segmentName
    }


    return (
      <>
          <Panel header="Creation Promotion with Copilot">
            <Text>
              Let's create your promotion.
            </Text>
            <ChatPrompt endpoint='/api/recommendPromotion' initialMessage={initialMessage} otherAttributes={otherAttributes} />
          </Panel>
      </>
    )
  }

  // const handleGeneratePromotion = async (chat, newMessage) => {
  //   console.log('handleGeneratePromotion')
  //   setIsPrompting(true);

  //   let newMessageContent = newMessage;
  //   if(chat.length === 0) {
  //     newMessageContent += ` What would you recommend for the ${segmentName} segment?`;
  //   }

  //   const newMessageObj = {"author": "user", "content": newMessageContent};

  //   let messages: any[] = [...chat, newMessageObj];

  //   const res = await fetch('/api/recommendPromotion', {
  //     method: 'POST',
  //     body: JSON.stringify({messages: messages, segmentId: segmentId, segmentName: segmentName}),
  //   });
  
  //   if (!res.ok) {
  //     setIsPrompting(false);
  //     throw new Error('Cannot generate promotion, try again later');
  //   }
  
  //   const results = await res.json();
  //   console.log('results');
  //   console.log(results)


  //   let content = results.response.candidates[0]?.content;
  //   const codeBlock: CodeBlock = extractCodeBlocks(content);

  //   if (codeBlock.isCodeBlock) {
  //     content = codeBlock.contentBefore + codeBlock.contentAfter;
  //   }

  //   setResults({ promptAttributes: currentAttributes, response: content });

  //   addMessageToChat("user", newMessage);
  //   addMessageToChat("system", content);
  //   setIsPrompting(false);
  // };

  // const addMessageToChat = (author, content) => {
  //   const newMessage = { author, content };
  //   setChat(prevChat => [...prevChat, newMessage]);
  // };


  

  return (
    <Box
      marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
      marginVertical={{ mobile: 'none', tablet: 'medium' }}
    >
        <>
          <H1>Add Promotion</H1>
          <Text>Let's configure your promotion offer for segment {segmentName}</Text>
          <Tabs 
            activeTab={activeTab}
            id="cx-tabs"
            items={tabs}
            onTabClick={(setActiveTab)}
          />
          <Box marginTop="medium">
            { activeTab === 'tab-1' && <GuidedPromoCreation results={results} /> }
            { activeTab === 'tab-2' && <PromotionUpsert promoId={null} token={token} storeHash={storeHash} /> }
          </Box>
        </>
        <>
          

        </>
    </Box>
  );
}



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