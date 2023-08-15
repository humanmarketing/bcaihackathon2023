
import {  useRef, useState, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, FormGroup, Panel, H1, H2, H3, H4, Input, Select, Stepper, Tabs, Text, Textarea } from '@bigcommerce/big-design';
import Loader from '~/components/Loader';

const APP_NAME = 'Ecommerce Copilot AI';

export default function ChatPrompt({ endpoint, initialMessage, otherAttributes }) {
    // const initialMessage = `Would you like to add a promotion to the ${segmentName} segment?`;
    const messages = [
        // {"author": "user", "content": "Hello, I'm looking for a new pair of shoes."},
        // {"author": "system", "content": "Hi there! I'm the Product Description Generator. I can help you create product descriptions in a flash."}
        // {"author": "user", "content": "I want red shoes"},
    ];
    const bottomRef = useRef<any>(null);
    const [results, setResults] = useState<any>({response: messages});
    const [isPrompting, setIsPrompting] = useState(false);
    const [newMessage, setNewMessage] = useState<string>('');
    const [chat, setChat] = useState<any>(messages);
    const [input, setInput] = useState<string>('');
    const initialMessageObj = {"author": "system", "content": initialMessage};

    const addMessageToChat = (author, content) => {
        const newMessage = { author, content };
        console.log('addMessageToChat')
        console.log(newMessage)
        setChat(prevChat => [...prevChat, newMessage]);

        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <Box
                backgroundColor={"secondary10"}
                paddingVertical={'none'}
                paddingHorizontal={{ mobile: 'medium', tablet: 'xLarge' }}
                style={{ height: '400px', overflowY: 'auto' }}
            >
                <SystemMessage message={initialMessageObj} />
                <PromptMessages messages={chat} initialMessage={initialMessage} />
                {isPrompting && <SystemMessageLoader />}
                {!isPrompting && <UserInput newMessage={newMessage} setNewMessage={setNewMessage} /> }
                <div ref={bottomRef}></div>
            </Box>
            <Box
                backgroundColor={"secondary10"}
                paddingBottom={'medium'}
                paddingHorizontal={{ mobile: 'medium', tablet: 'xLarge' }}
            >
                <Button
                    marginTop="xSmall"
                    disabled={isPrompting}
                    mobileWidth="auto"
                    variant="secondary"
                    onClick={() => void handleChatMessage(endpoint, chat, newMessage, setNewMessage, initialMessage, otherAttributes, isPrompting, setIsPrompting, setResults, addMessageToChat)}
                >
                    Send Message
                </Button>
            </Box>
        </>

    )

}

const PromptMessages = ({ messages, initialMessage }) => {
    console.log('messages');
    console.log(messages)
    return messages.map((message) => {
        if (message.author === 'system') {
            return <SystemMessage message={message} />;
        } else if (message.author === 'user') {
            return <UserMessage message={message} />;
        } 
        return null; // Add a default return value if none of the conditions are met
    });
};

const SystemMessage = ( { message }) => {
    return (
        <Flex>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '55%', desktop: '55%' }}
            >
                <AIBox
                    backgroundColor="secondary30"
                    border="box"
                    borderRadius="normal"
                    marginTop="medium"
                    paddingHorizontal={'medium'}
                    paddingTop={'medium'}
                    paddingBottom={'xxSmall'}
                    style={{ minHeight: '50px' }}
                >
                    <Text
                        marginBottom={'xSmall'}
                    >
                        {message.content}
                    </Text>
                    <Text 
                        color="secondary50"
                        marginTop={'xxSmall'}
                        style={{ fontSize: '10px', textDecoration: 'underline'}}
                    >{APP_NAME}</Text>
                </AIBox>
            </FlexItem>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '45%', desktop: '45%' }}
            >
                <Text> </Text>
            </FlexItem>
        </Flex>

    )
}

const SystemMessageLoader = () => {
    return (
        <Flex>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '55%', desktop: '55%' }}
            >
                <AIBox
                    backgroundColor="secondary30"
                    border="box"
                    borderRadius="normal"
                    marginTop="medium"
                    padding="medium"
                    style={{ minHeight: '30px' }}
                >
                    <Loader minHeight='30px'/>
                    <Text 
                        color="secondary40"
                        marginTop={'xxSmall'}
                        style={{ fontSize: '10px', textDecoration: 'underline'}}
                    >{APP_NAME}</Text>
                </AIBox>
            </FlexItem>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '45%', desktop: '45%' }}
            >
                <Text> </Text>
            </FlexItem>
        </Flex>
    )
}

const UserMessage = ( { message }) => {
    return (
        <Flex>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '45%', desktop: '45%' }}
            >
                <Text> </Text>
            </FlexItem>
            <FlexItem
                flexBasis={{ mobile: '100%', tablet: '55%', desktop: '55%' }}
            >
                <AIBox
                    backgroundColor="secondary10"
                    border="box"
                    borderRadius="normal"
                    marginTop="medium"
                    paddingHorizontal={'medium'}
                    paddingTop={'medium'}
                    paddingBottom={'xxSmall'}
                    style={{ minHeight: '50px' }}
                >
                    <Text
                        color={'secondary60'}
                        marginBottom={'xSmall'}
                    >
                        {message.content}
                    </Text>
                    <Text 
                        color="primary30"
                        marginTop={'xxSmall'}
                        style={{ fontSize: '10px', textDecoration: 'underline'}}
                    >You</Text>
                </AIBox>
                </FlexItem>

        </Flex>
    )
}

const UserInput = ( { newMessage, setNewMessage }) => {
    // const [newMessage, setNewMessage] = useState<string>('');

    return (
        <AIBox
            backgroundColor="secondary10"
            border="none"
            borderRadius="normal"
            marginTop="xLarge"
        >
            <Flex
            justifyContent="stretch"
            flexDirection="column"
            >
            <FlexItem
                flexGrow={1}
            >
                <AITextArea
                key="promoInput"
                rows={3}
                placeholder="Respond here"
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setNewMessage(event.target.value) }
                value={newMessage}
                />
            </FlexItem>
            </Flex>
        </AIBox>
    )
}

const handleChatMessage = async (endpoint, chat, newMessage, setNewMessage, initialMessage, otherAttributes, isPrompting, setIsPrompting, setResults, addMessageToChat) => {
    console.log('handleChatMessage')
    setIsPrompting(true);
    const currentAttributes = {};

    let newMessageContent = newMessage;
    // if(chat.length === 0) {
    //   newMessageContent += isPrompting;
    // }
    const newMessageObj = {"author": "user", "content": newMessageContent};
    addMessageToChat("user", newMessage);
    setNewMessage('');

    let messages: any[] = [...chat, newMessageObj];

    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ messages: messages, attributes: otherAttributes }),
    });
  
    if (!res.ok) {
      setIsPrompting(false);
      throw new Error('Cannot generate promotion, try again later');
    }
  
    const results = await res.json();
    console.log('results');
    console.log(results)
    setResults({ promptAttributes: currentAttributes, response: results.response.candidates[0]?.content });

    
    addMessageToChat("system", results.response.candidates[0]?.content);
    setIsPrompting(false);
};


  

const AIBox = styled(Box)`
  min-height: 6rem;
`;

const AITextArea = styled(Textarea)`
  border-color: red;
`;