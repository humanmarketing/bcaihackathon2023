'use client';
import {  use, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Flex, FlexItem, FormGroup, Panel, H1, H2, H3, H4, Input, Select, Stepper, Tabs, Text } from '@bigcommerce/big-design';

interface PromotionProps {
  promoId?: string;
  name: string;
  rules: any;
}

type InputFieldValue = string | number | boolean | undefined;

const default_promo = {
    name: '',
    rules: [
        {
            action: {
                cart_value: {
                    discount: {
                        percentage_amount: 0
                    }
                }
            }
        }
    ]
}


export default function PromotionUpsert({ promoId, token, storeHash }) {
    
  const [promo, setPromo] = useState<PromotionProps | null>(default_promo);
  const [currentStep, setCurrentStep] = useState(0);

    if(promoId !== null && promoId !== undefined) {
        const fetcher = (url) => fetch(url).then((res) => res.json());
        const params = new URLSearchParams({ storeHash, token, promoId }).toString();
        const { data: dataBcPromos, isLoading: isLoadingBcPromos, error: errorBcPromos } = useSWR(
            `/api/getBcPromotions?${params}`,
            fetcher
        );

        useEffect(() => {
            if (dataBcPromos && dataBcPromos.results && dataBcPromos.results.length > 0) {
            setPromo(dataBcPromos.results[0]);
            }
        }, [dataBcPromos]);

        if ( isLoadingBcPromos) return <Text>Loading</Text>;
        if ( errorBcPromos ) return <Text>Error</Text>;
    }
    else {
        const default_promo = {
            name: '',
            rules: [
                {
                    action: {
                        cart_value: {
                            discount: {
                                percentage_amount: 0
                            }
                        }
                    }
                }
            ]
        }
        useEffect(() => {
            setPromo(default_promo);
            // console.log('PromotionUpsert')
        }, [default_promo]);
    }



    

    const steps = ['Promotion Offer', 'Conditions', 'Messaging', 'Publish'];

    return (
        <Box
            marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
            marginVertical={{ mobile: 'none', tablet: 'medium' }}
        >

            <>
                <H1>{promo !== null ? `Edit Promo ${promo.name}` : `Add Promo` } </H1>

            <>
            <Stepper currentStep={currentStep} steps={steps} />

            {currentStep === 0 && (
                <>
                    <Text>Let's configure your promotion offer</Text>
                    <OfferConfiguration rule={promo?.rules[0]} />
                </>
                )}

            {currentStep === 1 && (
                <>
                    <Text>Let's configure your promotion conditions</Text>
                    <OfferConditions rule={promo?.rules[0]} />
                </>
            )}

            <Flex
                marginTop={{ mobile: 'xLarge', tablet: 'xxLarge' }}
            >
                <FlexItem>
                <Button disabled={currentStep === 0} onClick={() => setCurrentStep(0)}>
                    Reset
                </Button>
                <Button
                    disabled={currentStep === steps.length - 1}
                    onClick={() => setCurrentStep(currentStep + 1)}
                >
                    Next
                </Button>
                </FlexItem>
            </Flex>

            </>
            </>

        </Box>
    );
}


const OfferConfiguration = ({ rule }) => {
    const actionType = getActionType(rule.action);
    const [action, setAction] = useState(actionType);
    const discountTypeValue = getDiscountType(rule.action?.cart_value?.discount);
    const [discountType, setDiscountType] = useState(discountTypeValue);
    const discountValueProp = getDiscountType(rule.action?.cart_value?.discount);
    const [discountValue, setDiscountValue] = useState(discountValueProp);

    useEffect(() => {
        setAction(actionType);
        setDiscountType(discountTypeValue);
        setDiscountValue(discountValueProp);
        console.log(discountTypeValue)
    }, [actionType, discountTypeValue, discountValueProp]);
//   console.log('discountTypeValue', discountTypeValue)


  return (
    <>
      <Flex
        justifyContent='flex-start'
        marginBottom='medium'
      >
        <FlexItem
          flexGrow={0}
        >
          <Select
            label="Promotion Type"
            onOptionChange={() => null}
            options={getSelectOptions(promoActions)}
            placeholder="Choose from below"
            placement="bottom-start"
            required
            value={actionType}
          />
        </FlexItem>
      </Flex>
      {actionType === 'cart_value' && (
        <Flex
          justifyContent='flex-start'
          marginBottom='medium'
        >
          <FlexItem
            flexGrow={0}
          >
            <Select
              label="Discount Type"
              options={getSelectOptions(discountTypes)}
              placeholder="Choose from below"
              placement="bottom-start"
              required
              value={discountType}
              onOptionChange={(value) => handleDiscountTypeChange(value, setDiscountType)}
            />
            {discountType === 'percentage_amount' && (
              <Flex
                justifyContent='flex-start'
                alignItems='flex-end'
                flexGap='10px'
                marginVertical='medium'
              >
                <FlexItem>
                  <Input 
                    label="Percentage Discount"
                    type="number"
                    value={rule.action.cart_value.discount.percentage_amount}
                    required
                  />
                </FlexItem>
                <FlexItem>
                  <Text>%</Text>
                </FlexItem>
              </Flex>
            )}
            {discountType === 'fixed_amount' && (
              <Flex
                justifyContent='stretch'
                alignItems='flex-end'
                marginVertical='medium'
              >
                <FlexItem>
                  <Input 
                    label="Fixed Amount Discount"
                    type="number"
                    value={rule.action.cart_value.discount.fixed_amount}
                    required
                  />
                </FlexItem>
              </Flex>
            )}
          </FlexItem>
        </Flex>
      )}
    </>
  );
}


const OfferConditions = ({ rule }) => {
  const [conditionType, setConditionType] = useState<string | null>('subtotal');
  const discountTypeValue = getDiscountType(rule.action?.cart_value?.discount);
  const [discountType, setDiscountType] = useState(discountTypeValue);

//   console.log('rule', rule)

  return (
    <>
      <Flex
        justifyContent='flex-start'
        marginBottom='medium'
      >
        <FlexItem
          flexGrow={0}
        >
          <Select
            label="Condition Type"
            onOptionChange={() => null}
            options={getSelectOptions(conditionTypes)}
            placeholder="Choose from below"
            placement="bottom-start"
            required
            value={conditionType}
          />
        </FlexItem>
      </Flex>

      {conditionType === 'subtotal' && (
        <Flex
          justifyContent='flex-start'
          marginBottom='medium'
        >
          <FlexItem
            flexGrow={0}
          >
            <Input
              label="Subtotal"
              placeholder="100"
              required
              value={0}
            />
          </FlexItem>
        </Flex>
      )}
    </>
  );
}


const handleDiscountTypeChange = (value: InputFieldValue, setDiscountType) => {
  if(value !== null) {
    setDiscountType(value)
  }
}

// const handleInputChange = (
//   value: InputFieldValue,
//   fieldName: keyof GuidedAttributes
// ) => onChange({ ...attributes, [fieldName]: value });

const getSelectOptions = (options) => {
  return Object.keys(options).map((key) => {
    return { value: key, content: options[key] };
  });
}

const promoActions = {
    cart_value: 'Cart Value',
    cart_items: 'Cart Items',
    gift_item: 'Gift Item',
    fixed_price_set: 'Fixed Price Set',
    shipping: 'Shipping',
};

const conditionTypes = {
    products: 'Buys Products',
    subtotal: 'Reaches an order sub-total',
    none: 'No Conditions',
};

const discountTypes = {
    percentage_amount: 'Percentage Amount',
    fixed_amount: 'Fixed Amount',
};

function getActionType(action) {
  if (action?.cart_value) {
    return 'cart_value';
  }
  else if (action?.cart_items) {
    return 'cart_items';
  }
  else if (action?.gift_item) {
    return 'gift_item';
  }
  else if (action?.fixed_price_set) {
    return 'fixed_price_set';
  }
  else if (action?.shipping) {
    return 'shipping';
  }
  else {
    return '';
  }
}

function getDiscountType(discount) {
    // console.log(discount?.percentage_amount);
  if (typeof discount?.percentage_amount === 'number') {
    return 'percentage_amount';
  }
  else if (typeof discount?.fixed_amount === 'number') {
    return 'fixed_amount';
  }
  else {
    return 'not_found';
  }
}