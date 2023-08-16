'use client';
import {  use, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, Button, Flex, FlexItem, FormGroup, Panel, H1, H2, H3, H4, Input, Select, Stepper, Tabs, Text } from '@bigcommerce/big-design';
import * as db from '~/lib/db';
import { set } from 'zod';
import Loader from '~/components/Loader';

interface PromotionProps {
  promoId: string;
  name: string;
  rules: any;
}

type InputFieldValue = string | number | boolean | undefined;


export default function PromotionEdit({ promoId, token, storeHash, config }) {
  const [promo, setPromo] = useState<PromotionProps | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
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

  if ( isLoadingBcPromos) return <Loader minHeight='30px'/>;
  if ( errorBcPromos ) return <Text>Error</Text>;

  console.log(promo);

  const steps = ['Promotion Offer', 'Conditions', 'Messaging', 'Publish'];

  return (
    <Box
      marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
      marginVertical={{ mobile: 'none', tablet: 'medium' }}
    >
      {promo !== null ? (
        <>
        <H1>Edit Promo {promo.name}</H1>

        <>
          <Stepper currentStep={currentStep} steps={steps} />

          {currentStep === 0 && (
              <>
                <Text>Let's configure your promotion offer</Text>
                <OfferConfiguration rule={promo.rules[0]} />
              </>
            )}

          {currentStep === 1 && (
              <>
                <Text>Let's configure your promotion offer</Text>
                <OfferConditions rule={promo.rules[0]} />
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
      )
      : (
        <Text>Loading still</Text>
      )}
    </Box>
  );
}


const OfferConfiguration = ({ rule }) => {
  const actionType = getActionType(rule.action);
  const [action, setAction] = useState(actionType);
  const discountValue = getDiscountType(rule.action?.cart_value?.discount);
  const [discountType, setDiscountType] = useState(discountValue);


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
  const actionType = getActionType(rule.action);
  const [action, setAction] = useState(actionType);
  const discountValue = getDiscountType(rule.action?.cart_value?.discount);
  const [discountType, setDiscountType] = useState(discountValue);


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
  if (discount?.percentage_amount) {
    return 'percentage_amount';
  }
  else if (discount?.fixed_amount) {
    return 'fixed_amount';
  }
  else {
    return '';
  }
}