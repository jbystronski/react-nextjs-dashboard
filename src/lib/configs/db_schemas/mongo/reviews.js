module.exports = {
  name: "reviews",

  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        content: {
          bsonType: "string"
        },
        posted_by: {
          bsonType: "string"
        },
        rate: {
          bsonType: "int"
        },
        published: {
          bsonType: "bool"
        },
        order_id: {
          bsonType: "objectId"
        },
        product_id: {
          bsonType: "objectId"
        },
        user_id: {
          bsonType: "objectId"
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
