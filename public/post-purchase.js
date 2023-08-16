async function ecaiOrderConfirmationScript() {
    console.log("ecaiOrderConfirmationScript");

    try {
        const { items, customer } = await getOrderItems();
        
        if (items && items.length > 0) {
            const product_recommendations = await getProductRecommendations(items[0]);
            console.log(product_recommendations);
            if(product_recommendations.results.length > 0) {
                setEcaiStyles()
                const productIds = product_recommendations.results.map(product => product.productId);
                getGraphqlProducts(productIds, customer)
            }
        } else {
            console.log("No order items found");
        }
    } catch (error) {
        console.error("Error in ecaiOrderConfirmationScript:", error);
    }
}

async function getOrderItems() {
    try {
        const response = await fetch("/api/storefront/order/{{checkout.order.id}}", {credentials: "include"});
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const order_details = await response.json();
        console.log(order_details);
        
        const line_items = [
            ...order_details.lineItems.physicalItems, 
            ...order_details.lineItems.digitalItems
        ];
        const customer = {
            firstName: order_details.billingAddress.firstName,
            lastName: order_details.billingAddress.lastName
        }

        console.log(line_items);
        
        return {items: line_items.map(item => item.productId), customer: customer};
    } catch (error) {
        console.error("Error in getOrderItems:", error);
        return [];
    }
}

async function getProductRecommendations(productId) {
    try {
        const res = await fetch(`https://humanmarketing.ngrok.io/api/recommendProducts?productId=${productId}`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error in getProductRecommendations:", error);
        return null;
    }
}

async function getGraphqlProducts(products, customer) {
    // const products = [productId];
            
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {{ settings.storefront_api.token }}'
            },
            body: JSON.stringify({
                query: `query ExtendedProductsById(
                    $productIds: [Int!]
                    $pageSize: Int = 99
                ) {
                    site {
                        products(entityIds: $productIds, first: $pageSize) {
                            pageInfo {
                                startCursor
                                endCursor
                                hasNextPage
                            }
                            edges {
                                cursor
                                node {
                                    name
                                    entityId
                                    path
                                    brand {
                                        name
                                    }
                                    productOptions(first: 5) {
                                        edges {
                                        node {
                                            entityId
                                            displayName
                                            isRequired
                                            ... on CheckboxOption {
                                            checkedByDefault
                                            }
                                            ... on MultipleChoiceOption {
                                            values(first: 10) {
                                                edges {
                                                node {
                                                    entityId
                                                    label
                                                    isDefault
                                                    ... on SwatchOptionValue {
                                                    hexColors
                                                    imageUrl(width: 200)
                                                    }
                                                }
                                                }
                                            }
                                            }
                                        }
                                        }
                                    }
                                    prices {
                                        price {
                                            ...MoneyFields
                                        }
                                        priceRange {
                                            min {
                                            ...MoneyFields
                                            }
                                            max {
                                            ...MoneyFields
                                            }
                                        }
                                        salePrice {
                                            ...MoneyFields
                                        }
                                        retailPrice {
                                            ...MoneyFields
                                        }
                                        saved {
                                            ...MoneyFields
                                        }
                                    }
                                    addToCartUrl
                                    defaultImage {
                                        ...ImageFields
                                    }
                                    customFields {
                                        edges {
                                            node {
                                                name
                                                value
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                fragment MoneyFields on Money {
                    value
                    currencyCode
                }
                fragment ImageFields on Image {
                    url320wide: url(width: 320)
                    url640wide: url(width: 640)
                    url960wide: url(width: 960)
                    url1280wide: url(width: 1280)
                }`,
                variables: { products }
            }),
        })
        const data = await response.json();
        console.log(data);
        addProductUpsell(data.data.site.products.edges, customer);
    } catch (error) {
        console.error('Error:', error);
    }
} 

function addProductUpsell(products, customer) {
    const productUpsellSection = productUpsellTemplate(products, customer);
    const target = document.querySelector('.orderConfirmation .orderConfirmation-section');
    target.insertAdjacentHTML('afterend', productUpsellSection);
}

const productUpsellTemplate = (products, customer) => `
    <section class="ecai-ppu-single-wrapper" id="ecai-ppu-single-wrapper" data-ecai-name="Post Purchase Upsell">
        <div class="ppu-widget-heading-wrapper">
            <h3 class="ppu-widget-heading">${customer.firstName.trim()}, we would like to offer you an additional 10% off this products we think you might like</h3>
        </div>
        <div class="ppu-section-body-wrapper">
            ${productTemplate(products[0].node)}
        </div>
    </section>
`;

const productTemplate = (data) => `
    <div class="ecai-product" data-product-id="${data['productId']}">
        <div class="ecai-product-image-container">
            <a class="ecai-product-image-wrapper" href="${data['url']}${(data['variantSKU'] !== null ? `?sku=data['variantSKU']` : ``)}">
                ${data['defaultImage'] !== undefined ? `<img src="${data['defaultImage']['url640wide']}" srcset="${data['defaultImage']['image320']} 320w, ${data['defaultImage']['image640']} 640w, ${data['defaultImage']['image960']} 960w, ${data['defaultImage']['url1280wide']} 1280w"  loading="lazy">` : ``} 
            </a>
        </div>
        <div class="ecai-product-details-container">
            <h4 class="ecai-product-title">
                <a href="${data['url']}">${data['name']}</a>
            </h4>
            <div class="ecai-price-section">
                <span class="ecai-price">$${((data['prices']['salePrice'] && data['prices']['salePrice']['value'] !== '0.00') ? data['prices']['salePrice']['value'].toFixed(2) : data['prices']['price']['value'].toFixed(2))}</span>
            </div>
            <div class="ecai-cta-wrapper">
                <a class="ecai-cta ecai-product-cta" href="${data['hasOptions'] === true ? `${data['url']}${(data['variantSKU'] !== null ? `?sku=${data['variantSKU']}` : ``)}` : `${data['addToCartUrl'] !== null ? `${data['addToCartUrl']}` : `${data['url']}` }`}">${data['hasOptions'] === true  || data['addToCartUrl'] == null ? `View Details` : `Add to Cart`}</a>
            </div>
        </div>
    </div>
`;

const dynamicStyling = () => `
    #ecai-ppu-single-wrapper {background:#fff;}
    #ecai-ppu-single-wrapper .ppu-section-body-wrapper {display:flex;flex-wrap:wrap;justify-content:center;max-width:300px;margin:0 auto;padding:10px 20px;border:1px solid #e3e3e3;}
    #ecai-ppu-single-wrapper .ecai-product {max-width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px 0;}
    #ecai-ppu-single-wrapper .ecai-product-image-wrapper {display:inline-block}
    #ecai-ppu-single-wrapper .ecai-product-image-wrapper img {width:100%;height:auto;}
    #ecai-ppu-single-wrapper .ecai-product-details-container {}
    #ecai-ppu-single-wrapper .ppu-widget-heading-wrapper {}
    #ecai-ppu-single-wrapper .ppu-widget-heading {color:#333;font-size:22px;margin-bottom: 1rem;text-align:center;}
    #ecai-ppu-single-wrapper .ecai-product-title {margin-bottom: 1.5rem;}
    #ecai-ppu-single-wrapper .ecai-product-title, #ecai-ppu-single-wrapper .ecai-product-title a {font-size:15px;font-weight: bold;}
    #ecai-ppu-single-wrapper .ecai-price {font-weight: bold; margin-bottom: 1rem;}
    #ecai-ppu-single-wrapper .ecai-cta-wrapper .ecai-cta {display:inline-block;background:#333;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;}
`;
function setEcaiStyles() {
    var ecaiStyle = document.createElement('style');
    ecaiStyle.innerHTML = dynamicStyling();
    document.head.appendChild(ecaiStyle);
}

ecaiOrderConfirmationScript();