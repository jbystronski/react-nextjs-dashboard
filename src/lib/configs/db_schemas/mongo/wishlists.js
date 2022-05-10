module.exports = {
  name: "wishlists",

  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        user_id: {
          bsonType: "objectId"
        },
        list: {
          bsonType: ["array"],
          description: "Array of objectIds",
          items: {
            bsonType: "objectId"
          }
        }
      }
    }
  }
};
