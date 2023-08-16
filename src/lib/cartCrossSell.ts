export const postPurchaseWidget = (channelId) => {
    // Version 0.0.3
    // Updated: 2023-08-15
    return (
        {
            "name": "Cart Cross-Sell",
            "schema": [
                {
                    "type": "hidden",
                    "settings": [
                        {
                            "type": "graphQl",
                            "id": "graphQueries",
                            "typeMeta": {
                                "mappings": {
                                    "productIds": {
                                        "reads": "product.value.*.productId",
                                        "type": "Int!"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "tab",
                    "label": "Content",
                    "sections": [
                        {
                            "label": "Product(s) to Cross-Sell",
                            "settings": [
                                {
                                    "type": "productSet",
                                    "label": "Product Set",
                                    "id": "product",
                                    "entryLabel": "Product",
                                    "default": {
                                        "type": "manual",
                                        "value": []
                                    }
                                }
                            ],
                            "typeMeta": {
                                "type": "setSection"
                            }
                        }
                    ]
                },
                {
                    "type": "tab",
                    "label": "Settings",
                    "sections": [
                        {
                            "label": "Settings",
                            "settings": [
                                {
                                    "type": "element",
                                    "id": "widgetHeading",
                                    "label": "Heading",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Heading",
                                                "settings": [
                                                    {
                                                        "type": "input",
                                                        "id": "headingText",
                                                        "label": "Section Heading",
                                                        "default": "Goes Well With"
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "headingElement",
                                                        "label": "Heading HTML Element",
                                                        "default": "h2",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "H1",
                                                                    "value": "h1"
                                                                },
                                                                {
                                                                    "label": "H2",
                                                                    "value": "h2"
                                                                },
                                                                {
                                                                    "label": "H3",
                                                                    "value": "h3"
                                                                },
                                                                {
                                                                    "label": "H4",
                                                                    "value": "h4"
                                                                },
                                                                {
                                                                    "label": "H5",
                                                                    "value": "h5"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productTitle",
                                    "label": "Cross-Sell Product Title",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Title",
                                                "settings": [
                                                    {
                                                        "type": "input",
                                                        "id": "crosssellPrefix",
                                                        "label": "Product Title Prefix",
                                                        "default": "Add a"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "ctaButton",
                                    "label": "CTA Button",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "CTA Button",
                                                "settings": [
                                                    {
                                                        "type": "select",
                                                        "id": "ctaType",
                                                        "label": "CTA Button Type",
                                                        "default": "dynamic",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Dynamic",
                                                                    "value": "dynamic"
                                                                },
                                                                {
                                                                    "label": "Add to Cart",
                                                                    "value": "addtocart"
                                                                },
                                                                {
                                                                    "label": "View Details",
                                                                    "value": "viewdetails"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "input",
                                                        "id": "ctaAddToCartText",
                                                        "label": "Add to Cart CTA Text",
                                                        "default": "Add to Cart",
                                                        "conditional": {
                                                            "key": "ctaType",
                                                            "operator": "IN",
                                                            "value": [
                                                                "dynamic",
                                                                "addtocart"
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "input",
                                                        "id": "ctaViewDetailsText",
                                                        "label": "View Details CTA Text",
                                                        "default": "View Details",
                                                        "conditional": {
                                                            "key": "ctaType",
                                                            "operator": "IN",
                                                            "value": [
                                                                "dynamic",
                                                                "viewdetails"
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "boolean",
                                                        "id": "ctaQuickView",
                                                        "label": "Enable Quick View",
                                                        "default": false
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "valueProp",
                                    "label": "Value Proposition",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Value Proposition",
                                                "settings": [
                                                    {
                                                        "type": "select",
                                                        "id": "contentType",
                                                        "label": "Content Type",
                                                        "default": "simple",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Simple",
                                                                    "value": "simple"
                                                                },
                                                                {
                                                                    "label": "HTML",
                                                                    "value": "html"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "input",
                                                        "id": "valuePropSimple",
                                                        "label": "Value Prop Text",
                                                        "default": "While suppliest last!",
                                                        "conditional": {
                                                            "key": "contentType",
                                                            "operator": "IN",
                                                            "value": [
                                                                "simple"
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "code",
                                                        "id": "valuePropHtml",
                                                        "label": "Value Prop (HTML)",
                                                        "default": "<span>While suppliest last!</span>",
                                                        "conditional": {
                                                            "key": "contentType",
                                                            "operator": "IN",
                                                            "value": [
                                                                "html"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tab",
                    "label": "Desktop Styles",
                    "sections": [
                        {
                            "label": "Desktop Styles",
                            "settings": [
                                {
                                    "type": "element",
                                    "id": "backgroundStyle",
                                    "label": "Background",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Background",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "backgroundColor",
                                                        "label": "Background Color",
                                                        "default": "#EDF6FD"
                                                    },
                                                    {
                                                        "type": "boolean",
                                                        "id": "backgroundWrap",
                                                        "label": "Wrap Product?",
                                                        "default": true
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "label": "Heading",
                                    "id": "headingStyle",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Heading Style",
                                                "settings": [
                                                    {
                                                        "type": "typography",
                                                        "label": "Style",
                                                        "id": "widgetHeadingStyle",
                                                        "default": "default",
                                                        "typeMeta": {
                                                            "conditionalSettings": [
                                                                {
                                                                    "condition": "custom",
                                                                    "settings": [
                                                                        {
                                                                            "type": "color",
                                                                            "id": "headingColor",
                                                                            "label": "Font Color",
                                                                            "default": "#002FE1"
                                                                        },
                                                                        {
                                                                            "type": "number",
                                                                            "id": "headingFontSize",
                                                                            "label": "Font Size",
                                                                            "default": {
                                                                                "value": 18,
                                                                                "type": "px"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "select",
                                                                            "id": "headingFontWeight",
                                                                            "label": "Font Weight",
                                                                            "default": "700",
                                                                            "typeMeta": {
                                                                                "selectOptions": [
                                                                                    {
                                                                                        "label": "Thin",
                                                                                        "value": "100"
                                                                                    },
                                                                                    {
                                                                                        "label": "Extra Light (Ultra Light)",
                                                                                        "value": "200"
                                                                                    },
                                                                                    {
                                                                                        "label": "Light",
                                                                                        "value": "300"
                                                                                    },
                                                                                    {
                                                                                        "label": "Normal",
                                                                                        "value": "400"
                                                                                    },
                                                                                    {
                                                                                        "label": "Medium",
                                                                                        "value": "500"
                                                                                    },
                                                                                    {
                                                                                        "label": "Semi Bold (Demi Bold)",
                                                                                        "value": "600"
                                                                                    },
                                                                                    {
                                                                                        "label": "Bold",
                                                                                        "value": "700"
                                                                                    },
                                                                                    {
                                                                                        "label": "Extra Bold (Ultra Bold)",
                                                                                        "value": "800"
                                                                                    },
                                                                                    {
                                                                                        "label": "Black (Heavy)",
                                                                                        "value": "900"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "alignment",
                                                                            "label": "Text Alignment",
                                                                            "id": "headingAlign",
                                                                            "default": {
                                                                                "horizontal": "center",
                                                                                "vertical": "middle"
                                                                            },
                                                                            "typeMeta": {
                                                                                "display": "horizontal"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productTitleStyle",
                                    "label": "Product Title",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Product Title",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "productTitleColor",
                                                        "label": "Font Color",
                                                        "default": "#002FE1"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "productTitleHoverColor",
                                                        "label": "Font Hover Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "productTitleFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 18,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "productTitleFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "alignment",
                                                        "label": "Text Alignment",
                                                        "id": "productTitleAlign",
                                                        "default": {
                                                            "horizontal": "center",
                                                            "vertical": "middle"
                                                        },
                                                        "typeMeta": {
                                                            "display": "horizontal"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productRetailPriceStyle",
                                    "label": "Product Retail Price",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Product Retail Price",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "produceRetailPriceColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "produceRetailPriceFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "produceRetailPriceFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "produceRetailPriceFontWeightIfOnSale",
                                                        "label": "Font Weight If On Sale",
                                                        "default": "400",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "boolean",
                                                        "id": "produceRetailPriceStrike",
                                                        "label": "Strike Through If On Sale?",
                                                        "default": true
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productSalePriceStyle",
                                    "label": "Product Sale Price",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Product Sale Price",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "productSalePriceColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "productSalePriceFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "productSalePriceFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "ctaButtonStyle",
                                    "label": "CTA Button",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "CTA Button",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonColor",
                                                        "label": "Button Color",
                                                        "default": "#155073"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonBorderColor",
                                                        "label": "Button Border Color",
                                                        "default": "#00b0f3"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonTextColor",
                                                        "label": "Button Text Color",
                                                        "default": "#ffffff"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "valuePropStyle",
                                    "label": "Value Proposition",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Value Proposition",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "valuePropColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "valuePropFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "valuePropFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "400",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "valuePropFontStyle",
                                                        "label": "FontStyle",
                                                        "default": "italic",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "normal"
                                                                },
                                                                {
                                                                    "label": "Italic",
                                                                    "value": "italic"
                                                                },
                                                                {
                                                                    "label": "Oblique",
                                                                    "value": "oblique"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "alignment",
                                                        "label": "Text Alignment",
                                                        "id": "valuePropAlign",
                                                        "default": {
                                                            "horizontal": "center",
                                                            "vertical": "middle"
                                                        },
                                                        "typeMeta": {
                                                            "display": "horizontal"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tab",
                    "label": "Mobile Styles",
                    "sections": [
                        {
                            "label": "Mobile Styles",
                            "settings": [
                                {
                                    "type": "number",
                                    "id": "mobileBreakpoint",
                                    "label": "Mobile Breakpoint",
                                    "default": {
                                        "value": 800,
                                        "type": "px"
                                    },
                                    "typeMeta": {
                                        "parseType": "integer"
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "backgroundStyleMobile",
                                    "label": "Background",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Background",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "backgroundColorMobile",
                                                        "label": "Background Color",
                                                        "default": "#EDF6FD"
                                                    },
                                                    {
                                                        "type": "boolean",
                                                        "id": "backgroundWrapMobile",
                                                        "label": "Wrap Product?",
                                                        "default": true
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "label": "Heading",
                                    "id": "headingStyleMobile",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Heading Style",
                                                "settings": [
                                                    {
                                                        "type": "typography",
                                                        "label": "Style",
                                                        "id": "widgetHeadingStyleMobile",
                                                        "default": "default",
                                                        "typeMeta": {
                                                            "conditionalSettings": [
                                                                {
                                                                    "condition": "custom",
                                                                    "settings": [
                                                                        {
                                                                            "type": "color",
                                                                            "id": "headingColorMobile",
                                                                            "label": "Font Color",
                                                                            "default": "#002FE1"
                                                                        },
                                                                        {
                                                                            "type": "number",
                                                                            "id": "headingFontSizeMobile",
                                                                            "label": "Font Size",
                                                                            "default": {
                                                                                "value": 18,
                                                                                "type": "px"
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "select",
                                                                            "id": "headingFontWeightMobile",
                                                                            "label": "Font Weight",
                                                                            "default": "700",
                                                                            "typeMeta": {
                                                                                "selectOptions": [
                                                                                    {
                                                                                        "label": "Thin",
                                                                                        "value": "100"
                                                                                    },
                                                                                    {
                                                                                        "label": "Extra Light (Ultra Light)",
                                                                                        "value": "200"
                                                                                    },
                                                                                    {
                                                                                        "label": "Light",
                                                                                        "value": "300"
                                                                                    },
                                                                                    {
                                                                                        "label": "Normal",
                                                                                        "value": "400"
                                                                                    },
                                                                                    {
                                                                                        "label": "Medium",
                                                                                        "value": "500"
                                                                                    },
                                                                                    {
                                                                                        "label": "Semi Bold (Demi Bold)",
                                                                                        "value": "600"
                                                                                    },
                                                                                    {
                                                                                        "label": "Bold",
                                                                                        "value": "700"
                                                                                    },
                                                                                    {
                                                                                        "label": "Extra Bold (Ultra Bold)",
                                                                                        "value": "800"
                                                                                    },
                                                                                    {
                                                                                        "label": "Black (Heavy)",
                                                                                        "value": "900"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "alignment",
                                                                            "label": "Text Alignment",
                                                                            "id": "headingAlignMobile",
                                                                            "default": {
                                                                                "horizontal": "center",
                                                                                "vertical": "middle"
                                                                            },
                                                                            "typeMeta": {
                                                                                "display": "horizontal"
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productTitleStyleMobile",
                                    "label": "Product Title",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "Product Title",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "productTitleColorMobile",
                                                        "label": "Font Color",
                                                        "default": "#002FE1"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "productTitleHoverColorMobile",
                                                        "label": "Font Hover Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "productTitleFontSizeMobile",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 14,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "productTitleFontWeightMobile",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productRetailPriceStyleMobile",
                                    "label": "Product Retail Price",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Product Retail Price",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "produceRetailPriceColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "produceRetailPriceFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "produceRetailPriceFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "produceRetailPriceFontWeightIfOnSale",
                                                        "label": "Font Weight If On Sale",
                                                        "default": "400",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "boolean",
                                                        "id": "produceRetailPriceStrike",
                                                        "label": "Strike Through If On Sale?",
                                                        "default": true
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "productSalePriceStyleMobile",
                                    "label": "Product Sale Price",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Product Sale Price",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "productSalePriceColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "productSalePriceFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "productSalePriceFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "700",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "ctaButtonStyleMobile",
                                    "label": "CTA Button",
                                    "typeMeta": {
                                        "controls": {
                                            "advanced": {
                                                "label": "CTA Button",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonColorMobile",
                                                        "label": "Button Color",
                                                        "default": "#155073"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonBorderColorMobile",
                                                        "label": "Button Border Color",
                                                        "default": "#00b0f3"
                                                    },
                                                    {
                                                        "type": "color",
                                                        "id": "ctaButtonTextColorMobile",
                                                        "label": "Button Text Color",
                                                        "default": "#ffffff"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "element",
                                    "id": "valuePropStyleMobile",
                                    "label": "Value Proposition",
                                    "typeMeta": {
                                        "controls": {
                                            "visibility": {
                                                "default": "show"
                                            },
                                            "advanced": {
                                                "label": "Value Proposition",
                                                "settings": [
                                                    {
                                                        "type": "color",
                                                        "id": "valuePropColor",
                                                        "label": "Font Color",
                                                        "default": "#333333"
                                                    },
                                                    {
                                                        "type": "number",
                                                        "id": "valuePropFontSize",
                                                        "label": "Font Size",
                                                        "default": {
                                                            "value": 16,
                                                            "type": "px"
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "valuePropFontWeight",
                                                        "label": "Font Weight",
                                                        "default": "400",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Thin",
                                                                    "value": "100"
                                                                },
                                                                {
                                                                    "label": "Extra Light (Ultra Light)",
                                                                    "value": "200"
                                                                },
                                                                {
                                                                    "label": "Light",
                                                                    "value": "300"
                                                                },
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "400"
                                                                },
                                                                {
                                                                    "label": "Medium",
                                                                    "value": "500"
                                                                },
                                                                {
                                                                    "label": "Semi Bold (Demi Bold)",
                                                                    "value": "600"
                                                                },
                                                                {
                                                                    "label": "Bold",
                                                                    "value": "700"
                                                                },
                                                                {
                                                                    "label": "Extra Bold (Ultra Bold)",
                                                                    "value": "800"
                                                                },
                                                                {
                                                                    "label": "Black (Heavy)",
                                                                    "value": "900"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "select",
                                                        "id": "valuePropFontStyle",
                                                        "label": "FontStyle",
                                                        "default": "italic",
                                                        "typeMeta": {
                                                            "selectOptions": [
                                                                {
                                                                    "label": "Normal",
                                                                    "value": "normal"
                                                                },
                                                                {
                                                                    "label": "Italic",
                                                                    "value": "italic"
                                                                },
                                                                {
                                                                    "label": "Oblique",
                                                                    "value": "oblique"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "alignment",
                                                        "label": "Text Alignment",
                                                        "id": "valuePropAlign",
                                                        "default": {
                                                            "horizontal": "center",
                                                            "vertical": "middle"
                                                        },
                                                        "typeMeta": {
                                                            "display": "horizontal"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tab",
                    "label": "Meta Info",
                    "sections": [
                        {
                            "label": "Meta Info for Analytics (Optional)",
                            "settings": [
                                {
                                    "type": "input",
                                    "id": "metaName",
                                    "label": "Name",
                                    "typeMeta": {
                                        "placeholder": "Campaign Name"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            "template": "{{assignVar 'widgetId' _.id}}\n{{assignVar 'widgetName' 'Cart Cross-Sell'}}\n{{assignVar 'promotionName' (strReplace (json (concat '[Atomic Widgets] ' (getVar 'widgetName'))) '\"' '')}}\n{{#if metaName.length }}\n    {{assignVar 'creativeName' metaName}}\n{{else}}\n    {{assignVar 'creativeName' (getVar 'promotionName')}}\n{{/if}}\n<style>\n#aw-crosssell-single-wrapper-{{_.id}} {\n    background-color: {{#if backgroundStyleMobile.backgroundWrapMobile}}{{backgroundStyleMobile.backgroundColorMobile}}{{else}}transparent{{/if}};\n    display: flex;\n    flex-direction: column;\n    margin: 2rem auto 5rem;\n    overflow: hidden;\n    width: 600px;\n    max-width: 100%;\n    padding: 1rem;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .cross-sell-widget-heading-wrapper {\n    display:{{#if headingStyleMobile.visibility '==' 'hide'}}none{{else}}block{{/if}};\n}\n#aw-crosssell-single-wrapper-{{_.id}} .cross-sell-widget-heading {\n    {{#if headingStyleMobile.widgetHeadingStyleMobile '==' 'custom'}}\n        color: {{headingStyleMobile.headingColorMobile}};\n        font-size: {{headingStyleMobile.headingFontSizeMobile.value}}px;\n        font-weight: {{headingStyleMobile.headingFontWeightMobile}};\n        text-align: {{headingStyleMobile.headingAlignMobile.horizontal}};\n    {{/if}}\n    line-height: normal;\n    margin: 0 0 1rem;\n    \n}\n#aw-crosssell-single-wrapper-{{_.id}} .cross-sell-section-body-wrapper{\n    display:flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    row-gap: 1rem;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-image {\n    flex-basis: auto;\n    flex-grow: 0;\n    align-self: center;\n    max-width: 100%;\n    width:auto;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-upper {\n    display: flex;\n    margin-bottom: 2rem;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-image img {\n    max-height: 100%;\n    max-width: 100%;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper {\n    background-color: {{#if backgroundStyleMobile.backgroundWrapMobile}}{{backgroundStyleMobile.backgroundColorMobile}}{{/if}};\n    flex-grow: 1;\n    padding: 0.5rem 0rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-upper {\n    justify-content: {{#if productTitleStyle.productTitleAlign.horizontal '==' 'left'}}flex-start{{else if productTitleStyle.productTitleAlign.horizontal '==' 'right'}}flex-end{{else}}center{{/if}};\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crossell-item-title a {\n    color: {{productTitleStyleMobile.productTitleColorMobile}};\n    font-size: {{productTitleStyleMobile.productTitleFontSizeMobile.value}}px;\n    font-weight: {{productTitleStyleMobile.productTitleFontWeightMobile}};\n    line-height: normal;\n    text-align: left;\n    text-decoration: none;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crossell-item-title a:hover {\n    color: {{productTitleStyle.productTitleHoverColor}};\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle {\n    display:flex;\n    justify-content: space-between;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-price-wrapper {\n    display: flex;\n    justify-content: flex-start;\n    column-gap: 0.5rem;\n    height:100%;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-retail-price-wrapper {\n    display: flex;\n    align-items: center;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-retail-price {\n    color: {{productRetailPriceStyleMobile.produceRetailPriceColor}};\n    font-size: {{productRetailPriceStyleMobile.produceRetailPriceFontSize.value}}px;\n    font-weight: {{productRetailPriceStyleMobile.produceRetailPriceFontWeight}};\n    line-height: normal;\n    margin:0;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-retail-price.on-sale {\n    font-weight: {{productRetailPriceStyleMobile.produceRetailPriceFontWeightIfOnSale}};\n    text-decoration: {{#if productRetailPriceStyleMobile.produceRetailPriceStrike}}line-through{{else}}none{{/if}};\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-sale-price-wrapper {\n    display: flex;\n    align-items: center;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-sale-price {\n    color: {{productSalePriceStyleMobile.productSalePriceColor}};\n    font-size: {{productSalePriceStyleMobile.productSalePriceFontSize.value}}px;\n    font-weight: {{productSalePriceStyleMobile.productSalePriceFontWeight}};\n    line-height: normal;\n    margin:0;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleRight {\n    display:flex;\n    align-items: center;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleRight a.button {\n    margin:0;\n    width: 100%;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-lower {\n    margin-top: 1rem;\n}\n#aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-lower .value-prop-content {\n    display: {{#if valuePropStyleMobile.visibility '==' 'hide'}}none{{else}}block{{/if}};\n    color: {{valuePropStyleMobile.valuePropColor}};\n    font-size: {{valuePropStyleMobile.valuePropFontSize.value}}px;\n    font-style: {{valuePropStyleMobile.valuePropFontStyle}};\n    font-weight: {{valuePropStyleMobile.valuePropFontWeight}};\n    text-align: {{valuePropStyleMobile.valuePropAlign.horizontal}};\n}\n@media only screen and (min-width: {{mobileBreakpoint.value}}px) {\n    #aw-crosssell-single-wrapper-{{_.id}} {\n        background-color: {{#if backgroundStyle.backgroundWrap}}{{backgroundStyle.backgroundColor}}{{else}}transparent{{/if}};\n        padding: 1rem;\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .cross-sell-widget-heading-wrapper{\n        display:{{#if headingStyle.visibility '==' 'hide'}}none{{else}}block{{/if}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .cross-sell-widget-heading {\n        {{#if headingStyle.widgetHeadingStyle '==' 'custom'}}\n            color: {{headingStyle.headingColor}};\n            font-size: {{headingStyle.headingFontSize.value}}px;\n            font-weight: {{headingStyle.headingFontWeight}};\n            text-align: {{headingStyle.headingAlign.horizontal}};\n        {{/if}}\n        line-height: normal;\n        margin: 0 0 1rem;\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .cross-sell-section-body-wrapper{\n        display:flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n        justify-content: space-between;\n        column-gap: 2rem;\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-image {\n        flex-basis: auto;\n        flex-grow: 0;\n        align-self: center;\n        max-width: 50%;\n        width:200px;\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper {\n        background-color: {{backgroundStyle.backgroundColor}};\n        padding: 0.5rem 0rem;\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crossell-item-title a {\n        color: {{productTitleStyle.productTitleColor}};\n        font-size: {{productTitleStyle.productTitleFontSize.value}}px;\n        font-weight: {{productTitleStyle.productTitleWeight}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crossell-item-title a:hover {\n        color: {{productTitleStyle.productTitleHoverColor}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-retail-price {\n        color: {{productRetailPriceStyle.produceRetailPriceColor}};\n        font-size: {{productRetailPriceStyle.produceRetailPriceFontSize.value}}px;\n        font-weight: {{productRetailPriceStyle.produceRetailPriceFontWeight}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-retail-price.on-sale {\n        font-weight: {{productRetailPriceStyle.produceRetailPriceFontWeightIfOnSale}};\n        text-decoration: {{#if productRetailPriceStyle.produceRetailPriceStrike}}line-through{{else}}none{{/if}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-middle .aw-crosssell-item-content-middleLeft .aw-crosssell-item-sale-price {\n        color: {{productSalePriceStyle.productSalePriceColor}};\n        font-size: {{productSalePriceStyle.productSalePriceFontSize.value}}px;\n        font-weight: {{productSalePriceStyle.productSalePriceFontWeight}};\n    }\n    #aw-crosssell-single-wrapper-{{_.id}} .aw-crosssell-item-content-wrapper .aw-crosssell-item-content-lower .value-prop-content {\n        display: {{#if valuePropStyle.visibility '==' 'hide'}}none{{else}}block{{/if}};\n        color: {{valuePropStyle.valuePropColor}};\n        font-size: {{valuePropStyle.valuePropFontSize.value}}px;\n        font-style: {{valuePropStyle.valuePropFontStyle}};\n        font-weight: {{valuePropStyle.valuePropFontWeight}};\n        text-align: {{valuePropStyle.valuePropAlign.horizontal}};\n    }\n}\n</style>\n\n{{assignVar 'isEditorMode' (json _.context.isEditorMode)}}\n{{assignVar 'crossSellProductsCount' _.data.site.products.edges.length}}\n{{assignVar 'crossSellProduct' (random 1 (getVar 'crossSellProductsCount'))}}\n{{assignVar 'ctaType' ctaButton.ctaType}}\n{{assignVar 'ctaAddToCartText' ctaButton.ctaAddToCartText}}\n{{assignVar 'ctaViewDetailsText' ctaButton.ctaViewDetailsText}}\n{{assignVar 'ctaQuickView' (json ctaButton.ctaQuickView)}}\n{{#forEach _.data.site.currencies.edges }}\n    {{assignVar node.code node.display.symbol}}\n    {{assignVar (json (concat node.code \"decimalPlaces\")) node.display.decimalPlaces}}\n{{/forEach}}\n{{#forEach _.data.site.products.edges }}\n    {{#if index \"==\" (getVar 'crossSellProduct')}}\n        <section class=\"aw-crosssell-single-wrapper\" id=\"aw-crosssell-single-wrapper-{{getVar 'widgetId'}}\" data-aw-name=\"{{getVar 'widgetName'}}\">\n            {{#or (if ../../headingStyle.visibility '==' 'show') (if ../../headingStyleMobile.visibility '==' 'show')}}\n            <div class=\"cross-sell-widget-heading-wrapper\">\n                <{{../../../widgetHeading.headingElement}} class=\"cross-sell-widget-heading\">{{../../../widgetHeading.headingText}}</{{../../../widgetHeading.headingElement}}>\n            </div>\n            {{/or}}\n            <div class=\"cross-sell-section-body-wrapper\">\n                <div class=\"aw-crosssell-item-image\">\n                    <img src=\"{{node.defaultImage.img320px}}\"\n                        alt=\"{{node.defaultImage.altText}}\">\n                </div>\n                <div class=\"aw-crosssell-item-content-wrapper\">\n                    <div class=\"aw-crosssell-item-content-upper\">\n                        <p class=\"aw-crossell-item-title\"><a href=\"{{node.path}}\" data-aw-link data-event-type=\"product-click\" data-product-id=\"{{node.entityId}}\" onClick=\"clickPromo('{{getVar 'widgetId'}}');\">{{../../productTitle.crosssellPrefix}} {{node.name}}</a></p>\n                    </div>\n                    <div class=\"aw-crosssell-item-content-middle\">\n                        <div class=\"aw-crosssell-item-content-middleLeft\">\n                            <div class=\"aw-crosssell-item-price-wrapper\">\n                                {{#or (if ../../productRetailPriceStyle.visibility '==' 'show') (if productRetailPriceStyle.visibility '==' 'show')}}\n                                    <div class=\"aw-crosssell-item-retail-price-wrapper\">\n                                        <p class=\"aw-crosssell-item-price aw-crosssell-item-retail-price{{#if node.prices.salePrice}} on-sale{{/if}}\">{{getVar node.prices.basePrice.currencyCode}}{{toFixed node.prices.basePrice.value (getVar (json (concat node.prices.basePrice.currencyCode \"decimalPlaces\")))}}</p>\n                                    </div>\n                                    {{/or}}\n                                    {{#if node.prices.salePrice}}\n                                    <div class=\"aw-crosssell-item-sale-price-wrapper\">\n                                        <p class=\"aw-crosssell-item-price aw-crosssell-item-sale-price\">{{getVar node.prices.salePrice.currencyCode}}{{toFixed node.prices.salePrice.value (getVar (json (concat node.prices.salePrice.currencyCode \"decimalPlaces\")))}}</p>\n                                    </div>\n                                {{/if}}\n                            </div>\n                        </div>\n                        <div class=\"aw-crosssell-item-content-middleRight\">\n                            {{#if (getVar 'ctaType') '==' 'dynamic'}}\n                                {{#if node.variants.edges.length '>' 1}}\n                                    <a href=\"{{node.path}}\" class=\"button button--primary{{#if (getVar 'ctaQuickView') '==' 'true'}} quickview{{/if}}\" data-aw-cta data-event-type=\"product-click\" data-product-id=\"{{node.entityId}}\" onClick=\"clickPromo('{{getVar 'widgetId'}}');\">{{getVar 'ctaViewDetailsText'}}</a>\n                                {{else}}\n                                    <a href=\"{{node.addToCartUrl}}\" class=\"button button--primary{{#if (getVar 'ctaQuickView') '==' 'true'}} quickview{{/if}}\" data-aw-cta data-event-type=\"product-click\" data-button-type=\"add-cart\" data-product-id=\"{{node.entityId}}\" onClick=\"clickPromo('{{getVar 'widgetId'}}');\">{{getVar 'ctaAddToCartText'}}</a>\n                                {{/if}}\n                            {{else if (getVar 'ctaType') '==' 'addtocart'}}\n                                <a href=\"{{node.addToCartUrl}}\" class=\"button button--primary{{#if (getVar 'ctaQuickView') '==' 'true'}} quickview{{/if}}\" data-aw-cta data-event-type=\"product-click\" data-button-type=\"add-cart\" data-product-id=\"{{node.entityId}}\" onClick=\"clickPromo('{{getVar 'widgetId'}}');\">{{getVar 'ctaAddToCartText'}}</a>\n                            {{else if (getVar 'ctaType') '==' 'viewdetails'}}\n                                <a href=\"{{node.path}}\" class=\"button button--primary{{#if (getVar 'ctaQuickView') '==' 'true'}} quickview{{/if}}\" data-aw-cta data-event-type=\"product-click\" data-product-id=\"{{node.entityId}}\" onClick=\"clickPromo('{{getVar 'widgetId'}}');\">{{getVar 'ctaViewDetailsText'}}</a>\n                            {{/if}}\n                        </div>\n                    </div>\n                    <div class=\"aw-crosssell-item-content-lower\">\n                        {{#if ../../valueProp.contentType '==' \"html\"}}\n                            <div class=\"value-prop-content\">\n                                {{{../../../valueProp.valuePropHtml}}} \n                            </div>\n                        {{else}}\n                            <p class=\"value-prop-content value-prop-text\">{{{../../../valueProp.valuePropSimple}}} </p>\n                        {{/if}}\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <script>\n        {{#unless (getVar 'isEditorMode') '==' 'true'}}\n            const widget{{pascalcase (getVar 'widgetId')}} = document.querySelector('[data-widget-id=\"{{getVar 'widgetId'}}\"]');\n            const widgetPlacement{{pascalcase (getVar 'widgetId')}} = widget{{pascalcase (getVar 'widgetId')}}.dataset.placementId; \n            // Analytics Data\n            (function() {\n                if (!window.awDataLayer?.widgets) {\n                    window.awDataLayer = {\n                        ...(window.awDataLayer ?? {}),\n                        widgets: {}\n                    };\n                }\n                const widgetDetails = {\n                    creative_name: \"{{getVar 'creativeName'}}\",\n                    creative_slot: widgetPlacement{{pascalcase (getVar 'widgetId')}},\n                    promotion_id: \"{{getVar 'widgetId'}}\",\n                    promotion_name: \"{{getVar 'promotionName'}}\",\n                    items: [\n                        {\n                            item_id: \"{{node.entityId}}\",\n                            item_name: \"{{node.name}}\",\n                            price: \"{{#if node.prices.salePrice}}{{toFixed node.prices.salePrice.value (getVar (json (concat node.prices.salePrice.currencyCode 'decimalPlaces')))}}{{else}}{{toFixed node.prices.basePrice.value (getVar (json (concat node.prices.basePrice.currencyCode 'decimalPlaces')))}}{{/if}}\",\n                            promotion_name: \"{{getVar 'promotionName'}}\",\n                            promotion_id: \"{{getVar 'widgetId'}}\"\n                        }\n                    ]\n                }\n                window.awDataLayer.widgets[\"{{getVar 'widgetId'}}\"] = widgetDetails;\n            })(); \n        {{/unless}}\n        </script>\n    {{/if}}\n{{/forEach}}\n<script>\n//TODO: pull dynamic cart data and swap if already in the cart\nvar crosssellProducts = [\n    {{#each _.data.site.products.edges}}\n        {\n            product_id: '{{node.entityId}}',\n            product_name: '{{node.name}}',\n            url: '{{node.path}}',\n            img: '{{node.defaultImage.url}}'\n        },\n    {{/each}}\n];\nconst pid{{pascalcase _.id}} = 2;\nif(window?.awDataLayer?.length < 1 || window?.awDataLayer?.pid < pid{{pascalcase _.id}}) {\n    const widget{{pascalcase _.id}} = document.getElementById('aw-crosssell-single-wrapper-{{_.id}}');\n    {{#unless _.context.isEditorMode}}\n        widget{{pascalcase _.id}}.remove();\n        const style = 'background-color: #4834A6; color: white; font-style: italic; padding: 2px 5px;';\n        console.log(\"%cAtomic Widgets - Widget Unavailable\", style);\n    {{else}}\n        widget{{pascalcase _.id}}.innerHTML = '<div style=\"background-color:#f3f3f3;padding:1rem;text-align:center;width:100%;\"><p><strong style=\"color:#DB3643\">The {{getVar 'widgetName'}} widget is no longer available on your account.</strong> Please update your Atomic Widgets subscription to use.</p><p>Note: this message will not display on your storefront.</p></div>'\n    {{/unless}}\n}\n</script>",
            "kind": "custom",
            "storefront_api_query": "query ProductList($productIds: [Int!]) {\n    site {\n        settings {\n            storeName\n        }\n        currencies {\n            edges {\n                node {\n                    name\n                    code\n                    display {\n                        decimalPlaces\n                        symbol\n                    }\n                }\n            }\n        }\n        products(entityIds: $productIds) {\n            edges {\n                node {\n                    entityId\n                    name\n                    addToCartUrl\n                    prices {\n                        price {\n                            value\n                            currencyCode\n                        }\n                        basePrice {\n                            value\n                            currencyCode\n                        }\n                        salePrice {\n                            value\n                            currencyCode\n                        }\n                        retailPrice {\n                            value\n                            currencyCode\n                        }\n                    }\n                    defaultImage {\n                        img320px: url(width: 320)\n                        altText\n                    }\n                    path\n                    variants {\n                        edges {\n                            node {\n                                sku\n                            }\n                        }\n                    }\n                    customFields {\n                        edges {\n                            node {\n                                name\n                                value\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n}",
            "channel_id": channelId
        }
    )
}