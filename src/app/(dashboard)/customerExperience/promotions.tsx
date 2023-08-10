'use client';

// import { usePromptAttributes } from '~/context/PromptAttributesContext';
import { useState } from 'react';
import { type NewCustomer, type Customer } from 'types';
import styled from 'styled-components';
import { Box, Button, Flex, FlexItem, Panel, H1, H2, H3, H4, Switch, Table, Text } from '@bigcommerce/big-design';
import { EditIcon } from '@bigcommerce/big-design-icons';
import StatusSwitch from '~/components/StatusSwitch';

const Hr = styled(Flex)`
  margin-left: -${({ theme }) => theme.spacing.xLarge};
  margin-right: -${({ theme }) => theme.spacing.xLarge};
`;

export default function Promotions() {
  // const { results, setResults, handleDescriptionChange } =
  //   useDescriptionsHistory(customer.id);
  // const [isPrompting, setIsPrompting] = useState(false);
  // const [description, setDescription] = useState(
  //   results.at(0)?.description || ''
  // );

  // const {
  //   isFormGuided,
  //   setIsFormGuided,
  //   currentAttributes,
  //   guidedAttributes,
  //   customAttributes,
  //   setGuidedAttributes,
  //   setCustomAttributes,
  // } = usePromptAttributes();

  // const handleGenerateDescription = async () => {
  //   setIsPrompting(true);
  //   const res = await fetch('/api/generateDescription', {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       prepareAiPromptAttributes(currentAttributes, product)
  //     ),
  //   });

  //   if (!res.ok) {
  //     setIsPrompting(false);
  //     throw new Error('Cannot generate description, try again later');
  //   }

  //   const { description } = (await res.json()) as { description: string };
  //   setResults({ promptAttributes: currentAttributes, description });
  //   setIsPrompting(false);
  // };

  // const descriptionChangeWrapper = (index: number, description: string) => {
  //   setDescription(description);
  //   handleDescriptionChange(index, description);
  // };




  return (
    <Flex flexDirection="column" padding="xSmall" style={{ minHeight: '90vh' }}>
      <FlexItem>
        <Box marginBottom="large">

          <>
          <Panel
              header='Promotions Strategy'
              description='Your promotions strategy based on your business goals and customer segments.'
            >
              <Text>Your strategy focuses on monetizing your existing customers.</Text>
              
              <Table
                  columns={[
                    { header: 'Target', hash: 'target', render: ({ target }) => target },
                    { header: 'Status', hash: 'status', render: ({ target, status }) => <StatusSwitch name={target} status={status} /> },

                  ]}
                  items={[
                    { id: 1, target: 'Existing Customers', status: true },
                    { id: 2, target: 'Guest & Non-Logged in Shoppers', status: false },
                    { id: 3, target: 'Post-purchase', status: true },
                  ]}
                />
            </Panel>
            <Panel
              header='Promotions'
            >
                <Table
                  columns={[
                    { header: 'Promotion', hash: 'promotion', render: ({ promotion }) => promotion },
                    { header: 'Status', hash: 'status', render: ({ promotion, status }) => <StatusSwitch name={promotion} status={status} /> },
                    { header: '', hash: 'action', render: ({ id }) => <Text><EditIcon size='medium' color='' /> Edit</Text> }

                  ]}
                  items={[
                    { id: 1, status: true, promotion: 'Free Shipping' },
                    { id: 2, status: true, promotion: '20% Off Sitewide' },
                    { id: 3, status: true, promotion: '50% Off Socks Category' },
                    { id: 4, status: true, promotion: '15% Off Next Purchase' },
                    { id: 5, status: false, promotion: 'Free Gift with Purchase' },
                  ]}
                />
            </Panel>

          </>
        </Box>


      </FlexItem>

    </Flex>
  );
}
 
// function StatusSwitch({ name, status}) {
//   const [checked, setChecked] = useState(status);


//   const handleChange = async () => {
//       const newState = !checked;
//       setChecked(newState);

//   }
  

//   return <Switch name={name} checked={checked} onChange={handleChange} />;
// }


// function StatusSwitch({hash, name, widgetId, status, uuid, encodedContext}) {
//   const [checked, setChecked] = useState(status);
//   const [widgetUuid, setWidgetUuid] = useState(uuid);
//   const [widgetHash, setWidgetHash] = useState(hash);
//   // const [widgetKey] = useState(widgetId);
//   // console.log(widgetId);
//   // console.log({ widgetHash });
//   const handleChange = async () => {
//       // console.log(checked);
//       const newState = !checked;
//       setChecked(newState);
//       // console.log({widgetUuid});
//       // console.log({ widgetHash });


//       if(newState) {
//           const requestBody = {
//               widgetId: widgetId,
//               widgetHash: widgetHash
//           }

//           // Insert widgetTemplate
//           const response = await fetch(`/api/widgets/${widgetId}?context=${encodedContext}`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(requestBody),
//           });
//           const details = await response.json();
          
//           // console.log(details);

//           const updateBody = {
//               widgetId: Number(widgetId),
//               uuid: String(details.uuid),
//               status: Number(1)
//           };
//           // console.log({updateBody});
//           const saveResponse = await fetch(`/api/widgets/saveStoreWidget?context=${encodedContext}`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(updateBody),
//           });
//           const saveDetails = await saveResponse.json();
          
//           // console.log(saveDetails);

//           setWidgetUuid(details.uuid);
//           setWidgetHash(saveDetails.widgetHash);
//       } else {
//           // Remove widget
//           const response = await fetch(`/api/widgets/${widgetUuid}?context=${encodedContext}`, {
//               method: 'DELETE',
//               headers: { 'Content-Type': 'application/json' }
//           });
//           // const details = await response.json();
//           await response.json();
//           // Update DB - widgetTemplateId = NULL & Status = 0
//           const updateBody = {
//               widgetHash: String(widgetHash)
//           };
//           // console.log({updateBody});
//           await fetch(`/api/widgets/deleteStoreWidget?context=${encodedContext}`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(updateBody),
//           });
//       }
//   }
  

//   return <Switch name={name} checked={checked} onChange={handleChange} />;
// }