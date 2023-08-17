'use client';

import { Flex, FlexItem, Link } from '@bigcommerce/big-design';
import Image from 'next/image';

export default function Header({ minHeight = '50vh' }) {
  return (
    <Flex 
      justifyContent="flex-start" 
      alignItems="center" flexGap='4rem' 
      marginHorizontal={{ mobile: 'none', tablet: 'xLarge' }}
      marginVertical={{ mobile: 'none', tablet: 'xSmall' }} 
      style={{ minHeight }}
      >
      <FlexItem>
        <Link href="/">
          <Image
            src="/images/ecommercecopilotai-logo.png"
            alt="Example"
            width={200}
            height={56}
            priority={true}
          />
        </Link>
      </FlexItem>
      <FlexItem>
        <Flex justifyContent='space-between' flexGap='3rem'>
          <FlexItem>
            <Link href="/customerExperience">Customer Experience</Link>
          </FlexItem>
          <FlexItem>
            <Link>Marketing</Link>
          </FlexItem>
          <FlexItem>
            <Link>Results</Link>
          </FlexItem>
          <FlexItem>
            <Link>Settings</Link>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
}
