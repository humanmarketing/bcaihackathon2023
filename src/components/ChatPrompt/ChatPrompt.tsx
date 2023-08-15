
import {  useRef, useState, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, FormGroup, Panel, H1, H2, H3, H4, Input, Select, Stepper, Tabs, Text, Textarea } from '@bigcommerce/big-design';
import Loader from '~/components/Loader';

const APP_NAME = 'Ecommerce Copilot AI';

export default function ChatPrompt({ endpoint, initialMessage, otherAttributes }) {
    const messages = [];
    const bottomRef = useRef<any>(null);
    const [results, setResults] = useState<any>({response: messages});
    const [isPrompting, setIsPrompting] = useState(false);
    const [newMessage, setNewMessage] = useState<string>('');
    const [chat, setChat] = useState<any>(messages);
    const [input, setInput] = useState<string>('');
    const initialMessageObj = {"author": "system", "content": initialMessage};

    const addMessageToChat = (author, content, codeBlock) => {
        const latestMessage = { author, content, codeBlock };
        console.log('addMessageToChat')
        console.log(latestMessage)
        setChat(prevChat => [...prevChat, latestMessage]);

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
                <SystemMessage message={initialMessageObj} action={null} />
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

    return messages.map((message) => {
        if (message.author === 'system') {
            return <SystemMessage message={message} action={null} />;
        } else if (message.author === 'user') {
            return <UserMessage message={message} />;
        } 
        return null; 
    });
};

const SystemMessage = ( { message, action }) => {
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
                    marginBottom={'xxSmall'}
                    paddingHorizontal={'medium'}
                    paddingTop={'medium'}
                    paddingBottom={'xxSmall'}
                    shadow='raised'
                    style={{ minHeight: '50px' }}
                >
                    <Text
                        marginBottom={'xSmall'}
                    >
                        {message.content}
                    </Text>
                    {message?.codeBlock?.isCodeBlock && (
                        <Flex
                            justifyContent={'flex-end'}
                        >
                            <Button
                                marginBottom={'none'}
                            >
                                Create Promotion
                            </Button>
                        </Flex>

                    )}
                    <Text 
                        color="secondary50"
                        
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
                    shadow='raised'
                    style={{ minHeight: '30px' }}
                >
                    <Loader minHeight='20px' />
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
                    backgroundColor="white"
                    border="box"
                    borderRadius="normal"
                    marginTop="medium"
                    paddingHorizontal={'medium'}
                    paddingTop={'medium'}
                    paddingBottom={'xxSmall'}
                    shadow='raised'
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
      throw new Error('Cannot generate response, try again later');
    }
  
    const results = await res.json();
    console.log('results');
    console.log(results)

    let content = results.response.candidates[0]?.content;
    const codeBlock: CodeBlock = extractCodeBlocks(content);

    console.log('codeBlock', codeBlock);

    if (codeBlock.isCodeBlock) {
      content = codeBlock.contentBefore + codeBlock.contentAfter;
    }


    setResults({ promptAttributes: currentAttributes, response: content });
    
    addMessageToChat("system", content, codeBlock);
    setIsPrompting(false);
};

interface CodeBlock {
    contentBefore: string;
    contentBetween: string;
    contentAfter: string;
    isCodeBlock: boolean;
  }
  
function extractCodeBlocks(inputString: string | null | undefined): CodeBlock {
    const defaultCodeBlock: CodeBlock = {
      contentBefore: '',
      contentBetween: '',
      contentAfter: '',
      isCodeBlock: false,
    };
  
    if (!inputString) {
      return defaultCodeBlock;
    }
  
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const matches: string[] = [];
    let match;
  
    while ((match = codeBlockRegex.exec(inputString)) !== null) {
      matches.push(match[1]);
    }
  
    if (matches.length === 0) {
      return {
        ...defaultCodeBlock,
        contentBefore: inputString,
      };
    }
  
    const lastMatch = matches[matches.length - 1] as string | undefined;

    if (lastMatch) {
    const lastMatchIndex = inputString.lastIndexOf(lastMatch) + lastMatch.length;

    const firstMatch = matches[0] as string | undefined;
    let firstMatchIndex = -1;
    if (firstMatch && lastMatchIndex >= lastMatch.length + 6) {
        firstMatchIndex = inputString.indexOf(firstMatch, lastMatchIndex - lastMatch.length - 6);
    }
  
    return {
      contentBefore: firstMatchIndex >= 0 ? inputString.slice(0, firstMatchIndex - 3) : inputString, // Excluding the three backticks
      contentBetween: matches.join('\n```'),
      contentAfter: lastMatchIndex < inputString.length ? inputString.slice(lastMatchIndex + 3) : '', // Excluding the three backticks
      isCodeBlock: true,
    };
  }

  return {
    contentBefore: inputString,
    contentBetween: '',
    contentAfter: '',
    isCodeBlock: false,
  };

}

const AIBox = styled(Box)`
  min-height: 6rem;
`;

const AITextArea = styled(Textarea)`
  border-color: red;
`;