import { type z } from 'zod';
import { env } from '~/env.mjs';
import { GoogleAuth } from 'google-auth-library';
import { DiscussServiceClient, TextServiceClient } from '@google-ai/generativelanguage';

import { DEFAULT_GUIDED_ATTRIBUTES, STYLE_OPTIONS } from '~/constants';
import { type aiSchema } from '~/app/api/generateDescription/schema';
import { type aiPromotionAddSchema } from '~/app/api/generatePromotion/schema';

const MODEL_NAME = 'models/text-bison-001';
const API_KEY = env.GOOGLE_API_KEY;

export async function generateDescription(
  attributes: z.infer<typeof aiSchema>
): Promise<string> {
  const input = prepareInput(attributes);
  const productAttributes = prepareProductAttributes(attributes);

  const prompt = `Act as an e - commerce merchandising expert who writes product descriptions.
    Task: Based on provided input parameters, write a product description
    ${input}
    ${productAttributes}`;

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: prompt },
    });

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.output || 'No response from Google AI';
    }
  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}

export async function generatePromotion(
  attributes: z.infer<typeof aiPromotionAddSchema>
): Promise<string> {
  const input = preparePromotionAddInput(attributes);

  const prompt = `Act as an e - commerce marketing expert who writes product descriptions.
    Task: Based on provided input parameters, write a product description
    ${input}`;

  console.log('prompt', prompt);

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: prompt },
    });

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.output || 'No response from Google AI';
    }
  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}

export async function recommendPromotion(
  attributes: z.infer<typeof aiPromotionAddSchema>,
  chat: any[]
): Promise<any> {
  const input = preparePromotionAddInput(attributes);

  const prompt = `Act as an e - commerce marketing expert who creates relevant promotions for customer segments in order to maximize the lifetime value. Task: Recommend a promotion for the provided customer segment. Then confirm the details and return the JSON body for the API request to create the promotion (according to the Promotions API documentation below). Initiate the conversation by recommending a promotion for the provided segment. Then, guide the user to capture the details. Finally, respond with the API request body. The user has been asked "Would you like to add a promotion to the Top Customers segment?" 
      ${input}`;
  
  // const messages = [
  //   {
  //     "author": "user",
  //     "content": "Recommend a promotion for Dormant Customers",
  //   },
  //   {
  //     "author": "system",
  //     "content": "We recommend offering a 10% discount to Dormant Customers.",
  //   },
  //   {
  //     "author": "user",
  //     "content": "Sounds good",
  //   },
  // ]

  console.log('prompt', prompt);

  try {
    const client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateMessage({
      model: 'models/chat-bison-001',
      prompt: { context: prompt, messages: chat }
    });

    console.log('chat response', response);

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.content ? response[0] : 'No response from Google AI';
    }

    // if (response && response[0] && response[0].candidates) {
    //   return response[0].candidates[0]?.output || 'No response from Google AI';
    // }
  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}

const prepareInput = (attributes: z.infer<typeof aiSchema>): string => {
  if ('customPrompt' in attributes) {
    return `Instruction: ${attributes.customPrompt}`;
  } else if ('style' in attributes) {
    const style =
      STYLE_OPTIONS.find((option) => option.value === attributes.style)
        ?.content || '';

    return `Style of writing: ["${style}"]
        Brand tone: ["${attributes.brandVoice}"]
        Word limit: [${attributes.wordCount}]
        SEO optimized: ["${attributes.optimizedForSeo ? 'yes' : 'no'}"]
        Additional product attributes: ["${attributes.additionalAttributes}"]
        Additional keywords: ["${attributes.keywords}"]
        Additional instructions: ["${attributes.instructions}"]`;
  } else {
    return `Style of writing: ["${DEFAULT_GUIDED_ATTRIBUTES.style}"]
        Word limit: [${DEFAULT_GUIDED_ATTRIBUTES.wordCount}]
        SEO optimized: ["${
          DEFAULT_GUIDED_ATTRIBUTES.optimizedForSeo ? 'yes' : 'no'
        }"]`;
  }
};

const preparePromotionAddInput = (attributes: z.infer<typeof aiPromotionAddSchema>): string => {

    return `Customer segment: Top Customers
        Recommended Goal: Reduce friction; maintain margins`;
};

const prepareProductAttributes = (
  attributes: z.infer<typeof aiSchema>
): string => {
  if (attributes.product && 'type' in attributes.product) {
    return `Product attributes:
        "name": ${attributes.product.name}
        "brand": ${attributes.product.brand}
        "type": ${attributes.product.type}
        "condition": ${attributes.product.condition}
        "weight": ${attributes.product.weight}
        "height": ${attributes.product.height}
        "width": ${attributes.product.width}
        "depth": ${attributes.product.depth}
        "categories": ${attributes.product.categoriesNames}
        "videos descriptions": ${attributes.product.videosDescriptions}
        "imnages descritpions": ${attributes.product.imagesDescriptions}
        "custom_fields": ${attributes.product.custom_fields
          .map((field) => `"${field.name}": "${field.value}"`)
          .join(',')} `;
  } else {
    return `Product attributes:
        "name": ${attributes.product?.name || ''} `;
  }
};
