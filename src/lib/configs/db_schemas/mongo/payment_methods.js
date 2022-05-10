module.exports = {
  name: "payment_methods",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "priority", "enabled"],
      properties: {
        name: {
          bsonType: "string"
        },
        image: {
          bsonType: ["string", "null"]
        },
        priority: {
          bsonType: "int"
        },
        enabled: {
          bsonType: "bool"
        }
      }
    }
  }
};
