module.exports = {
  name: "social_links",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string"
        },
        url: {
          bsonType: "string"
        },
        enabled: {
          bsonType: "bool"
        },
        active: {
          bsonType: "bool"
        }
      }
    }
  }
};
