module.exports = {
  name: "offers",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string"
        },
        discount_amount: {
          bsonType: ["int", "double"]
        },
        start_date: {
          bsonType: "date"
        },
        expiration_date: {
          bsonType: "date"
        },
        all_products: {
          bsonType: "bool"
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
