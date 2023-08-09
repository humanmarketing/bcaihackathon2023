'use client';

import { Flex, FlexItem, Link, Tabs, Text } from '@bigcommerce/big-design';
import Image from 'next/image';

export default function Header({ minHeight = '50vh' }) {
  return (
    <Flex justifyContent="flex-start" alignItems="center" flexGap='4rem' style={{ minHeight }}>
      <FlexItem>
        <Link href="/">
          <Image
            src="/images/logoipsum.png"
            alt="Example"
            width={200}
            height={94}
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
