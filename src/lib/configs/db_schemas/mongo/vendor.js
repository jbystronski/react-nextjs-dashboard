module.exports = {
  name: "vendor",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        full_name: {
          bsonType: "string"
        },
        company_name: {
          bsonType: "string"
        },
        tax_id: {
          bsonType: "string"
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
        },
        email: {
          bsonType: "string"
        },
        finance: {
          bsonType: "object",
          properties: {
            banking: {
              bsonType: ["array"],
              items: {
                bsonType: "object",
                properties: {
                  bank_name: {
                    bsonType: "string"
                  },
                  account_no: {
                    bsonType: "string"
                  },
                  iban: {
                    bsonType: "string"
                  },
                  swift: {
                    bsonType: "string"
                  },
                  supported_currency: {
                    bsonType: "string"
                  },
                  enabled: {
                    bsonType: "bool"
                  },
                  priority: {
                    bsonType: "int"
                  }
                }
              }
            },
            paypal: {
              bsonType: "object",
              properties: {
                account: {
                  bsonType: "string"
                }
              }
            }
          }
        }
      }
    }
  }
};
