module.exports = {
  name: "settings",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string"
        },
        value: {
          bsonType: ["string", "null"]
        },
        description: {
          bsonType: "string"
        },
        priority: {
          bsonType: "int"
        },
        enabled: {
          bsonType: "bool"
        },
        options: {
          bsonType: "string"
        }
      }
    }
  }
};
