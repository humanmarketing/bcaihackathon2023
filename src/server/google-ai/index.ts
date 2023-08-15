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

  const prompt = `Act as an e-commerce marketing expert who creates relevant promotions for customer segments in order to maximize the lifetime value. 
    Task: Guide the conversation and finally recommend a promotion for the provided customer segment. Confirm the details and return the details for the promotion. Initiate the conversation by recommending a promotion for the provided segment. Then, guide the user to capture the details. Finally, respond with the JSON.
    The steps in the conversation should be: 
    1. Recommend a promotion to target the customer segment. Ask the user to approve the direction.
    2. Then, confirm the details such as promotion type and discount with the user. Ask the user to approve the details.
    3. Then, upon approved confirmation from the user, include the details of the promotion in the final message as a JSON object. Do not refer to it as "code" or as "JSON". It should be referenced as "details". It should be prefixed with [--CODE--]. The JSON should be wrapped with a triple back tick before and after. 
    The promotion needs an action and notifications. The action can be one of the following: [{"action":"cart_value","action_name":"Cart Value","discounts":[{"discount_type":"fixed_amount","discount_name":"Fixed Discount","value_type":"money","value_example":"10.00"},{"discount_type":"percentage_amount","discount_name":"Percentage Discount","value_type":"percentage","value_example":"20.0"}]},{"action":"cart_items","action_name":"Cart Items","discounts":[{"discount_type":"fixed_amount","discount_name":"Fixed Discount","value_type":"money","value_example":"10.00"},{"discount_type":"percentage_amount","discount_name":"Percentage Discount","value_type":"percentage","value_example":"20.0"}]},{"action":"gift_item","action_name":"Gift Item","discount":{"gift_item":{"quantity":"integer","product_id":"integer","variant_id":"integer"}}},{"action":"shipping","action_name":"Shipping","discount":{"shipping":{"free_shipping":"boolean"}}}]
    The recommendation goals & offers can following the guidelines from here: [{"segmentName":"Top Customers","goal":"Reduce friction and maintain margins","possible_promotions":["Free Shipping","Free Shipping on Orders Over $50","10% Off All Orders"]},{"segmentName":"Dormant Customers","goal":"Re-engage the shopper with strong offer","possible_promotions":["20% Off All Purchases Site Wide","Free gift with purchase"]},{"segmentName":"Loyal Customers","goal":"Increase loyalty and average order value","possible_promotions":["Free Gift on Orders Over $200","Free Shipping on All Orders","10% Off All Orders"]},{"segmentName":"High Potentials","goal":"Expand product catalog exposure","possible_promotions":["25% Off Purchase of Items from New Collection","10% Off All Orders"]},{"segmentName":"Small Buyers","goal":"Increase lifetime value","possible_promotions":["10% Off Next Purchase","Free Item with Purchase"]}]
    This is for a store on the BigCommerce platform. 
    DO NOT tell the user how to do this inside the BigCommerce platform dashboard.
    This conversation started with user being asked the question "Would you like to add a promotion per the details below?" This conversation should have some back and forth before you can provide the final message unless the user provides all the deatils.
    ${input}`;
  
  console.log('prompt', prompt);

  const examples = [
    {
        "input": {
            "author": "user",
            "content": "Create a promotion for the Top Customers segment with a goal of reducing friction and maintaining margins."
        },
        "output": {
            "author": "bot",
            "content": "Sure. We recommend creating a promotion to offer free shipping on all orders. What do you think?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Create a promotion for the Dormant Customers segment with a goal of re-engaging the shopper."
        },
        "output": {
            "author": "bot",
            "content": "Yes. We recommend creating a promotion offering 15% off all purchases site wide. How does that sound?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Actually, let\'s offer 50% off."
        },
        "output": {
            "author": "bot",
            "content": "Sure. So we\'ll offer 50% off any product to all customers that belong to that customer segment. Are you ready to create this promotion?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, let\'s create that promotion"
        },
        "output": {
            "author": "bot",
            "content": "Great.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'fixed_amount\',\'discount_name\':\'Fixed Discount\',\'value_type\':\'fixed_amount\',\'value_example\':\'10.0\'}]}```"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, let\'s create that 20% off promotion"
        },
        "output": {
            "author": "bot",
            "content": "Great. We will create a promotion for a 20.0% discount on the cart value.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'percentage_amount\',\'discount_name\':\'Percentage Discount\',\'value_type\':\'percentage\',\'value_example\':\'20.0\'}]}```"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes"
        },
        "output": {
            "author": "bot",
            "content": "Let\'s get started we recommend re-engaging dormant customers with a 20% off discount from all orders."
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, what would you recommend for the Top Customers segment?"
        },
        "output": {
            "author": "bot",
            "content": "For the Top Customers segment, we recommend offering free shipping on all orders. This will help to reduce friction and maintain margins."
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, let\'s go with that"
        },
        "output": {
            "author": "bot",
            "content": "Sure, let's go with that.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'percentage_amount\',\'discount_name\':\'Percentage Discount\',\'value_type\':\'percentage_amount\',\'value_example\':\'10.0\'}]}```"
        }
    }
  ]

  try {
    const client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateMessage({
      model: 'models/chat-bison-001',
      prompt: { context: prompt, messages: chat, examples: examples }
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

export async function onboardStoreAccount(
  attributes: z.infer<typeof aiPromotionAddSchema>,
  chat: any[]
): Promise<any> {
  const input = '';

  const prompt = `Start a new conversation.
    I want you to welcome and onboard a user to the "Ecommerce Copilot AI" application.
    You need to get answers to the following questions:
    1. Would you like to grow revenue with existing customers?
    2. Should we also target guest & non-logged in customers?
    3. Would you like to run post-purchase cross-sells based on their interests?
    
    While there are still more questions that need to be answered. Always end a response with a question instead of a statement.

    The user has been asked the following question to initiate the conversation: "Welcome to Ecommerce Copilot AI! It only takes a few minutes to get started. Are you ready?"
    ${input}`;
  
  console.log('prompt', prompt);

  const examples = [
    {
        "input": {
            "author": "user",
            "content": "Yes, I'm ready"
        },
        "output": {
            "author": "bot",
            "content": "Sounds good. Let's get started. I'm going to ask you a few questions to get to know your business better. First, would you like to grow revenue with existing customers?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, I would like to grow revenue with existing customers"
        },
        "output": {
            "author": "bot",
            "content": "Noted. Now, should we also target guest shoppers & non-logged in customers?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "No, I would not like to grow revenue with guest shoppers"
        },
        "output": {
            "author": "bot",
            "content": "Okay. Would you like to run post-purchase cross-sells based on their interests?"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, let's create post-purchase cross-sells."
        },
        "output": {
            "author": "bot",
            "content": "Thanks. We are going to set up the app accordingly. Given the provided feedback, the next step would be to configure promotions for the various customer segments."
        }
    }
  ]

  try {
    const client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    console.log('chat', chat);

    const response = await client.generateMessage({
      model: 'models/chat-bison-001',
      prompt: { context: prompt, messages: chat, examples: examples }
    });

    console.log('chat response', response);

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.content ? response[0] : 'No response from Google AI';
    }

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
    return `Details for promotion:
        Customer segment: [${attributes?.segmentName}]
        Customer segment ID: [${attributes?.segmentId}]`;
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
