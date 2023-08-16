'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Table, Text } from '@bigcommerce/big-design';
import { AddIcon } from '@bigcommerce/big-design-icons';
import Loader from '~/components/Loader';


const Hr = styled(Flex)`
  margin-left: -${({ theme }) => theme.spacing.xLarge};
  margin-right: -${({ theme }) => theme.spacing.xLarge};
`;




export default function ProductPairings() {
  const [recommendations, setRecommendations] = useState([]);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR(`/api/getProductPairings`, fetcher);
  
  if ( isLoading ) return <Loader minHeight='30px'/>;
  if ( error ) return <Text>{error}</Text>;

  console.log('data', data);

  const recommendationsArray = data.results.map((item, index) => {
      return {
          id: index + 1,
          pairing: `Product ${item.product_id_a} + Product ${item.product_id_b}`,
          item1: item.product_id_a,
          item2: item.product_id_b,
          count: parseInt(item.frequency)  
      };
  });


  useEffect(() => {
    setRecommendations(recommendationsArray);
  }, [data]);

  console.log('recommendations', recommendations);


  return (
    <Flex flexDirection="column" padding="xSmall" style={{ minHeight: '90vh' }}>
      <FlexItem>
        <Box marginBottom="large">
          <>
            <Panel
              header='Top Product Pairings'
            >
                <Table
                  columns={[
                    { header: 'ID', hash: 'id', render: ({ id }) => id },
                    { header: 'Product Combinations', hash: 'products', render: ({ item1, item2 }) => <Flex alignItems='center'><Text as="span" marginBottom='none'>Product <Text as="span" bold>{item1}</Text></Text> <AddIcon color="primary" size="large" /> <Text as="span">Product <Text as="span" bold>{item2}</Text></Text></Flex> },
                    { header: 'Frequency', hash: 'count', render: ({ count }) => <Text>Purchased together <Text as="span" bold>{count}</Text> times</Text> },
                  ]}
                  keyField='id'
                  items={recommendations}
                  // stickyHeader
                />
            </Panel>
          </>
        </Box>
      </FlexItem>
    </Flex>
  );
}
 

