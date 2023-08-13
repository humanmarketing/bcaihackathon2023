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

  const prompt = `Act as an e-commerce marketing expert who creates relevant promotions for customer segments in order to maximize the lifetime value. Task: Recommend a promotion for the provided customer segment. Then confirm the details and return the JSON body for the API request to create the promotion (according to the Promotions API documentation below). Initiate the conversation by recommending a promotion for the provided segment. Then, guide the user to capture the details. Finally, respond with the API request body.\n\n---\n\n## Creating Promotions Using BigCommerce Promotions API\n\nPromotions in e-commerce are a powerful way to offer discounts to customers based on specific criteria. BigCommerce provides a Promotions API that allows merchants to create various types of promotions, including buy one get one (BOGO) offers and coupon codes. This guide will walk you through the process of creating promotions using the Promotions API.\n\n### Promotion Basics\n\nPromotions can be created with two main components: rules and actions. A rule defines the conditions that must be met for the promotion to apply, and an action defines the discount or offer that will be given. There are also notifications that inform customers about the promotion's details.\n\n### Creating a Buy One Get One (BOGO) Promotion\n\nHere's a step-by-step breakdown of creating a BOGO promotion using the BigCommerce Promotions API:\n\n1. Set Up the Basics\n   - Name your promotion.\n   - Choose a redemption type (AUTOMATIC in this case).\n   - Define the start date and status.\n\n2. Create the Action\n   - Specify the action type (Cart Items Action).\n   - Set the discount type (percentage amount).\n   - Choose a strategy (LEAST_EXPENSIVE).\n   - Specify if the discount should be distributed among items.\n\n3. Configure the Rule\n   - Define the condition type (Cart Condition).\n   - Set the minimum quantity required for the promotion to trigger.\n   - Optionally, set a minimum spend requirement.\n\n4. Add Notifications\n   - Create notifications for different stages of the promotion (UPSELL, ELIGIBLE, APPLIED).\n   - Define the content and locations where the notifications will appear.\n\n5. Finalize the Promotion\n   - Set the promotion's priority.\n   - Decide whether the promotion should stop other promotions from applying.\n   - Set the maximum usage limit (max uses) and end date.\n   - Define the currency code.\n\n### Coupon Promotions\n\nFor coupon promotions, use the redemption type \"COUPON.\" You can create coupon codes with specific properties, such as a maximum usage limit.\n\n### Using Logical Operators\n\nLogical operators (AND, OR, NOT) allow you to create more complex promotions based on multiple conditions. For example, you can require customers to meet specific criteria from different categories or brands.\n\n### Additional Notes\n\n- Active and inactive promotions depend on criteria like start date, end date, and max uses.\n- Priority controls the order of applying multiple promotions.\n- Apply once determines if a promotion can apply multiple times.\n- As total decides how discounts are distributed among items.\n- Promotions can target specific customer groups or exclude certain categories.\n\nRemember that promotions can be more complex than explained here. This guide covers the basics of creating promotions using the BigCommerce Promotions API. For more details and advanced scenarios, refer to the official Promotions API documentation.
    The conversation begain with user being asked "Would you like to add a promotion per the details below?" 
      ${input}`;
  

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

    return `Customer segment: [${attributes?.segmentName}]
        Customer segment ID: [${attributes?.segmentId}]
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
