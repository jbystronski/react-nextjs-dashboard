module.exports = {
  name: "products",

  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string"
        },
        code: {
          bsonType: "string"
        },
        url: {
          bsonType: "string"
        },
        description: {
          bsonType: "string"
        },
        published: {
          bsonType: "bool"
        },
        in_stock: {
          bsonType: "int"
        },
        priority: {
          bsonType: "int"
        },
        category_id: {
          bsonType: ["objectId", "null"]
        },
        category: {
          bsonType: ["string", "null"]
        },
        primary_image: {
          bsonType: ["string", "null"]
        },
        secondary_images: {
          bsonType: ["array"],
          items: {
            bsonType: "string"
          }
        },

        price_wo_tax: {
          bsonType: "double"
        },
        price_w_tax: {
          bsonType: "double"
        },
        sold: {
          bsonType: "int"
        },
        tags: {
          bsonType: ["array"],
          items: {
            bsonType: "string"
          }
        },
        rating: {
          bsonType: "double"
        },
        applied_discounts_ids: {
          bsonType: ["array"],
          items: {
            bsonType: "objectId"
          }
        },

        created_at: {
          bsonType: "date"
        },
        updated_at: {
          bsonType: "date"
        }
      }
    }
  }
};
