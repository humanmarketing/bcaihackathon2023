import { type z } from 'zod';
import { env } from '~/env.mjs';
import { GoogleAuth } from 'google-auth-library';
import { DiscussServiceClient, TextServiceClient } from '@google-ai/generativelanguage';

import { DEFAULT_GUIDED_ATTRIBUTES, STYLE_OPTIONS } from '~/constants';
import { type aiSchema } from '~/app/api/generateDescription/schema';
import { type aiPromotionAddSchema, aiPromotionCodeSchema } from '~/app/api/generatePromotion/schema';

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

  // console.log('prompt', prompt);

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
  messages: any[]
): Promise<any> {

  console.log('attributes', attributes.attributes)
  const input = preparePromotionAddInput(attributes);

  const prompt = `Act as an e-commerce marketing expert who creates relevant promotions for customer segments in order to maximize the lifetime value. 
    Task: Guide the conversation and finally recommend a promotion for the provided customer segment. Confirm the details and return the details for the promotion. Initiate the conversation by recommending a promotion for the provided segment. Then, guide the user to capture the details. Finally, respond with the JSON.
    The steps in the conversation should be: 
    1. Recommend a promotion to target the customer segment. Ask the user to approve the direction.
    2. Then, confirm the details such as promotion type and discount with the user. Ask the user to approve the details.
    3. Then, upon approved confirmation from the user, include the details of the promotion in the final message as a JSON object wrapped in triple backticks. Do not refer to it as "code" or as "JSON". It should be referenced as "details". The JSON should be wrapped with a triple back tick before and after. 
    The promotion needs an action and notifications. The action can be one of the following: [{"action":"cart_value","action_name":"Cart Value","discounts":[{"discount_type":"fixed_amount","discount_name":"Fixed Discount","value_type":"money","value_example":"10.00"},{"discount_type":"percentage_amount","discount_name":"Percentage Discount","value_type":"percentage","value_example":"20.0"}]},{"action":"cart_items","action_name":"Cart Items","discounts":[{"discount_type":"fixed_amount","discount_name":"Fixed Discount","value_type":"money","value_example":"10.00"},{"discount_type":"percentage_amount","discount_name":"Percentage Discount","value_type":"percentage","value_example":"20.0"}]},{"action":"gift_item","action_name":"Gift Item","discount":{"gift_item":{"quantity":"integer","product_id":"integer","variant_id":"integer"}}},{"action":"shipping","action_name":"Shipping","discount":{"shipping":{"free_shipping":"boolean"}}}]
    The recommendation goals & offers can following the guidelines from here: [{"segmentName":"Top Customers","goal":"Reduce friction and maintain margins","possible_promotions":["Free Shipping","Free Shipping on Orders Over $50","10% Off All Orders"]},{"segmentName":"Dormant Customers","goal":"Re-engage the shopper with strong offer","possible_promotions":["20% Off All Purchases Site Wide","Free gift with purchase"]},{"segmentName":"Loyal Customers","goal":"Increase loyalty and average order value","possible_promotions":["Free Gift on Orders Over $200","Free Shipping on All Orders","10% Off All Orders"]},{"segmentName":"High Potentials","goal":"Expand product catalog exposure","possible_promotions":["25% Off Purchase of Items from New Collection","10% Off All Orders"]},{"segmentName":"Small Buyers","goal":"Increase lifetime value","possible_promotions":["10% Off Next Purchase","Free Item with Purchase"]}]
    This is for a store on the BigCommerce platform. 
    DO NOT tell the user how to do this inside the BigCommerce platform dashboard or give steps to create the promotion.
    This conversation started with user being asked the question "Would you like to add a promotion per the details below?" This conversation should have some back and forth before you can provide the final message unless the user provides all the deatils.
    ${input}`;
  
  // console.log('prompt', prompt);

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
            "content": "Great. A promotion for a 20.0% discount on the cart value sounds good.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'percentage_amount\',\'discount_name\':\'Percentage Discount\',\'value_type\':\'percentage\',\'value_example\':\'20.0\'}]}```"
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
    },
    {
        "input": {
            "author": "user",
            "content": "Give the me details"
        },
        "output": {
            "author": "bot",
            "content": "Sure, here you go.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'percentage_amount\',\'discount_name\':\'Percentage Discount\',\'value_type\':\'percentage_amount\',\'value_example\':\'10.0\'}]}```"
        }
    },
    {
        "input": {
            "author": "user",
            "content": "Yes, I would like to create this promotion"
        },
        "output": {
            "author": "bot",
            "content": "Sure, here you go.```{\'action\':\'cart_value\',\'action_name\':\'Cart Value\',\'discounts\':[{\'discount_type\':\'percentage_amount\',\'discount_name\':\'Percentage Discount\',\'value_type\':\'percentage_amount\',\'value_example\':\'10.0\'}]}```"
        }
    }
  ]

  const fullContext  = { context: prompt, messages: messages, examples: examples }
  // console.log('fullContext', fullContext);

  try {
    const client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateMessage({
      model: 'models/chat-bison-001',
      prompt: fullContext
    });

    // console.log('chat response', response);

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.content ? response[0] : 'No response from Google AI';
    }

  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}



interface Example {
  input: {
    content: string;
  };
  output: {
    content: string;
  };
}

export async function onboardStoreAccount(
  attributes: z.infer<typeof aiPromotionAddSchema>,
  messages: any[]
): Promise<any> {
  const input = '';

  const prompt = `You are a customer success manager that provides a white glove onboarding experience for an e-commerce marketing app.
    Task: welcome and ask the following questions of a user to the "Ecommerce Copilot AI" application in order to get them started.
    You must to get answers to the following 3 questions:
    1. Would you like to grow revenue with existing customers?
    2. Should we also target guest & non-logged in customers?
    3. Would you like to run post-purchase cross-sells based on their interests?
    
    When asking each question, end the response message with a question instead of a statement. Only ask one question at a time.
    Do not ask any questions that are not related to one of the 3 questions above. Do not ask for the website URL.
    The final response should be a welcome to the app.
    

    The user has been asked the following question to initiate the conversation: "Welcome to Ecommerce Copilot AI! It only takes a few minutes to get started. Are you ready?"
    ${input}`;
  
  // console.log('prompt', prompt);
  const examples: Example[] = [
    {
        "input": {
            "content": "Yes, I am ready"
        },
        "output": {
            "content": "Sounds good. Let us get started. I am going to ask you a few questions to get to know your business better. First, would you like to grow revenue with existing customers?"
        }
    },
    {
        "input": {
            "content": "Yes, I would like to grow revenue with existing customers"
        },
        "output": {
            "content": "Noted. Now, should we also target guest shoppers & non-logged in customers?"
        }
    },
    {
      "input": {
          "content": "Sure, I do want to grow revenue with existing customers"
      },
      "output": {
          "content": "Sounds good. Now, should we also target guest shoppers & non-logged in customers?"
      }
   },
    {
        "input": {
            "content": "No, I would not like to grow revenue with guest shoppers"
        },
        "output": {
            "content": "Okay. Would you like to run post-purchase cross-sells based on their interests?"
        }
    },
    {
        "input": {
            "content": "Yes, let us create post-purchase cross-sells."
        },
        "output": {
            "content": "Thanks. We are going to set up the app accordingly."
        }
    },
    {
      "input": {
        "content": "Let's start"
      },
      "output": {
        "content": "Sure. It just takes a few minutes to get started.\nThe first question is would you like to grow revenue with existing customers?"
      }
    },
    {
      "input": {
        "content": "Let us get started"
      },
      "output": {
        "content": "Sure. It just takes a few minutes to get started.\nThe first question is would you like to grow revenue with existing customers?"
      }
    },
    {
      "input": {
        "content": "I am ready"
      },
      "output": {
        "content": "Sure. It just takes a few minutes to get started.\nThe first question is would you like to grow revenue with existing customers?"
      }
    },
    {
      "input": {
        "content": "Yes, I would you like to run post-purchase cross-sells based on their interests"
      },
      "output": {
        "content": "Great! That's a great way to increase sales. Now that we have all your input, we are going to set up the app accordingly.\n \nWelcome to Ecommerce Copilot AI! "
      }
    },
    {
      "input": {
        "content": "Tell me more about the app"
      },
      "output": {
        "content": "Absolutely. Ecommerce Copilot AI bring the power of AI to your store. It offers you insights, efficiency, and impact on your goals. It helps you to grow revenue with existing customers, target guest shoppers & non-logged in customers, and run post-purchase cross-sells based on their interests. \n \nWelcome to Ecommerce Copilot AI! "
      }
    },
    {
      "input": {
        "content": "Tell me more about the Ecommerce Copilot AI"
      },
      "output": {
        "content": "Absolutely. Ecommerce Copilot AI bring the power of AI to your store. It offers you insights, efficiency, and impact on your goals. It helps you to grow revenue with existing customers, target guest shoppers & non-logged in customers, and run post-purchase cross-sells based on their interests. \n \nWelcome to Ecommerce Copilot AI! "
      }
    },
    {
      "input": {
        "content": "Do you need to know my website URL?"
      },
      "output": {
        "content": "No, right now we just need to know if you would like to grow revenue with existing customers, if we should target guest & non-logged in customers, and if you would like to run post-purchase cross-sells based on their interests"
      }
    }
  ]



  try {
    const client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const fullContext  = { context: prompt, messages: messages, examples: examples }
    // console.log('fullContext', fullContext);

    const response = await client.generateMessage({
      model: 'models/chat-bison-001',
      prompt: fullContext,
      temperature: 0.2,
      topK: 40,
      topP: 0.95
    });

    // console.log('chat response', response);

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.content ? response[0] : 'No response from Google AI';
    }

  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}

export async function generatePromotionCode(
  attributes: z.infer<typeof aiPromotionCodeSchema>
): Promise<string> {
  const input = attributes.code;

  const prompt = `${createPromotionAPIInstructions} 
    Details: ${input} 
    Documentation: ${createPromotionAPIDocumentation}
    Example: ${createPromotionAPIExample}`;

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: 'models/text-bison-001',
      temperature: 0.2,
      prompt: { text: prompt }
    });

    if (response && response[0] && response[0].candidates) {
      // console.log(response);
      return response[0].candidates[0]?.output || 'No response from Google AI';
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
        Customer segment: [${attributes?.segmentName ? attributes?.segmentName : ''}]
        Customer segment ID: [${attributes?.segmentId ? attributes?.segmentId : ''}]`;
};

// const preparePromotionCodeInput = (attributes: z.infer<typeof aiPromotionCodeSchema>): string => {
//   return `Details for promotion:
//       Details: [${attributes?.code}]
//       Customer segment: [${attributes?.otherAttributes?.segmentName ? attributes?.otherAttributes?.segmentName : ''}]
//       Customer segment ID: [${attributes?.otherAttributes?.segmentId ? attributes?.otherAttributes?.segmentId : ''}]`;
// };

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


const createPromotionAPIInstructions = `Task: construct the JSON request body for the CreatePromotion API as per the documentation below and using the following details.
    The redemption type should be "AUTOMATIC".
    Provide the rules, customer segment, and notifications. 
  `;

const createPromotionAPIDocumentation = `CreatePromotion API
  Fields:
  id: integer
  
  Auto-generated unique identifier.
  redemption_type: string (Read-only)
  
  Type of promotion.
  Allowed values: AUTOMATIC, COUPON.
  name: string (Required)
  
  Internal name for the rule.
  channels: array[object]
  
  Targeted promotion channels.
  Defaults to [] (all channels) if omitted.
  Object Structure:
  id: integer (Required)
  customer: object
  
  Eligibility requirements.
  Only specify "group_ids" or "excluded_group_ids".
  group_id 0 represents unassigned customers.
  rules: array[object] (Required)
  
  Ordered list of rules.
  Object Structure:
  action: object (Required)
  Can be:
  Cart Value Action
  Cart Items Action
  Fixed Price Set Action
  Shipping Action
  condition: object
  Can be:
  Cart Condition
  NotCondition
  cart_value: object
  
  apply_once: boolean
  stop: boolean
  cart: object
  
  items: object
  Specifies which items to consider.
  Requires at least minimum_quantity or minimum_spend if specified.
  minimum_spend: string
  minimum_quantity: integer
  current_uses: integer (Read-only)
  
  max_uses: integer
  
  status: string
  
  Allowed values: ENABLED, DISABLED, INVALID.
  start_date: string
  
  end_date: string
  
  stop: boolean
  
  can_be_used_with_other_promotions: boolean
  
  currency_code: string
  
  ISO-4217 currency code or * for all.
  notifications: array[object]
  
  content: string (Required)
  type: string (Required)
  Allowed values: UPSELL, ELIGIBLE, APPLIED.
  locations: array[string] (Required)
  shipping_address: object
  
  Specifies which addresses to consider.
  countries: array[object] (Required)
  
  schedule: object
  
  week_frequency: integer (Required)
  week_days: array[string] (Required)
  daily_start_time: string (Required)
  daily_end_time: string (Required)
  `;

const createPromotionAPIExample = `{
  "redemption_type": "AUTOMATIC",
  "name": "Come Back",
  "channels": [
      {
          "id": 1
      }
  ],
  "customer": {
      "minimum_order_count": 0,
      "segments": {
          "id": [
          "cf04786c-1614-42ca-9afa-997d0acd3d8b"
          ]
      }
  },
  "rules": [
  {
      "action": {
          "cart_items": {
              "discount": {
                  "percentage_amount": "50"
              },
              "strategy": "LEAST_EXPENSIVE",
              "add_free_item": false,
              "as_total": false,
              "include_items_considered_by_condition": false,
              "exclude_items_on_sale": false
          }
      },
      "apply_once": true,
      "stop": false
  }
  ],
  "max_uses": 10,
  "status": "ENABLED",
  "stop": false,
  "can_be_used_with_other_promotions": false,
  "currency_code": "USD",
  "notifications": [
      {
      "type": "PROMOTION",
      "content": "50% off store except sale",
      "locations": [
              "HOME_PAGE",
              "PRODUCT_PAGE",
              "CART_PAGE"
          ]
      },
      {
      "type": "UPSELL",
      "content": "50% off store except sale",
      "locations": [
          "HOME_PAGE",
          "PRODUCT_PAGE",
          "CART_PAGE"
      ]
      },
      {
      "type": "ELIGIBLE",
      "content": "50% off store except sale",
      "locations": [
          "CART_PAGE"
      ]
      },
      {
      "type": "APPLIED",
      "content": "50% off store except sale",
      "locations": [
          "HOME_PAGE",
          "CART_PAGE"
      ]
      }
  ],
  "shipping_address": null,
  "schedule": null,
  "coupon_overrides_automatic_when_offering_higher_discounts": false
},        {
  "name": "Free Ship",
  "channels": [],
  "customer": {
      "group_ids": [],
      "minimum_order_count": 0,
      "excluded_group_ids": [],
      "segments": null
  },
  "rules": [
      {
          "action": {
              "shipping": {
                  "free_shipping": true,
                  "zone_ids": "*"
              }
          },
          "apply_once": true,
          "stop": false,
          "condition": {
              "cart": {
                  "minimum_spend": "100"
              }
          }
      }
  ],
  "notifications": [
    {
    "type": "PROMOTION",
    "content": "Free shipping",
    "locations": [
            "HOME_PAGE",
            "PRODUCT_PAGE",
            "CART_PAGE"
        ]
    },
    {
    "type": "UPSELL",
    "content": "Free shipping",
    "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
    ]
    },
    {
    "type": "ELIGIBLE",
    "content": "Free shipping",
    "locations": [
        "CART_PAGE"
    ]
    },
    {
    "type": "APPLIED",
    "content": "Free shipping",
    "locations": [
        "HOME_PAGE",
        "CART_PAGE"
    ]
    }
],
  "stop": false,
  "currency_code": "USD",
  "redemption_type": "AUTOMATIC",
  "shipping_address": null,
  "current_uses": 0,
  "max_uses": null,
  "start_date": "2023-08-12T05:00:00+00:00",
  "end_date": null,
  "status": "ENABLED",
  "schedule": null,
  "can_be_used_with_other_promotions": true
}`;