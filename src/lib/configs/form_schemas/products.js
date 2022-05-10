module.exports = {
  properties: {
    name: "",

    code: "",
    url: "",
    description: "",
    published: false,
    in_stock: "",
    priority: "",
    category_id: null,
    category: "",
    primary_image: null,
    secondary_images: [],

    price_wo_tax: "",
    price_w_tax: "",
    tags: [],
    rating: 0,
    applied_discount_ids: [],
    created_at: null,
    updated_at: null
  },
  validator: {
    name: {
      isRequired: true
    },
    code: {
      isRequired: true
    },
    url: {
      isRequired: true
    },
    in_stock: {
      isRequired: true,
      isNumber: true
    },
    priority: {
      isRequired: true,
      isNumber: true,
      isPositiveNumber: true
    },
    category_id: {
      isRequired: true
    },
    category: {
      isRequired: true
    },
    price_wo_tax: {
      isRequired: true
    },
    price_w_tax: {
      isRequired: true
    }
  }
};
