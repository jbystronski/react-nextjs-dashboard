module.exports = {
  name: "orders",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "order_number",
        "shipping_status",
        "payment_status",
        "products",
        "user_id",
        "shipping_method",
        "payment_method",
        "created_at",
        "updated_at",
        "subtotal",
        "total",
        "shipping_fee",
        "total_to_pay"
      ],

      properties: {
        billing_details: {
          bsonType: "object",
          required: [
            "first_name",
            "last_name",
            "street",
            "city",
            "zip_code",
            "country",
            "phone_number"
          ],
          properties: {
            first_name: {
              bsonType: "string"
            },
            last_name: {
              bsonType: "string"
            },
            company: {
              bsonType: ["string", "null"]
            },
            tax_id: {
              bsonType: ["string", "null"]
            },
            street: {
              bsonType: "string"
            },
            city: {
              bsonType: "string"
            },
            zip_code: {
              bsonType: "string"
            },
            country: {
              bsonType: "string"
            },
            phone_number: {
              bsonType: "string"
            }
          }
        },
        package_tracking_code: {
          bsonType: ["string", "null"]
        },
        shipping_status: {
          enum: ["PREP", "DSPCH", "DELIV", "CXL"]
        },

        payment_status: {
          enum: ["AWT", "PAR/P", "PD", "RFD", "CXL"]
        },

        subtotal: {
          bsonType: ["int", "double"]
        },
        total: {
          bsonType: ["int", "double"]
        },

        shipping_fee: {
          bsonType: ["int", "double"]
        },

        total_to_pay: {
          bsonType: ["int", "double"]
        },

        order_number: {
          bsonType: "int"
        },
        products: {
          bsonType: ["array"],
          items: {
            bsonType: "object",
            properties: {
              product_id: {
                bsonType: "objectId"
              },
              name: {
                bsonType: "string"
              },
              qty: {
                bsonType: "int"
              },
              unit_price_wo_tax: {
                bsonType: ["int", "double"]
              },
              unit_price_w_tax: {
                bsonType: ["int", "double"]
              },
              product_subtotal: {
                bsonType: ["int", "double"]
              },
              product_total: {
                bsonType: ["int", "double"]
              }
            }
          }
        },
        comment: {
          bsonType: "string"
        },

        user_id: {
          bsonType: "objectId"
        },

        shipping_method: {
          bsonType: "string"
        },

        payment_method: {
          bsonType: "string"
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
