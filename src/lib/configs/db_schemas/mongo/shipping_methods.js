module.exports = {
  name: "shipping_methods",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "fee", "priority", "enabled"],
      properties: {
        name: {
          bsonType: "string"
        },
        image: {
          bsonType: ["string", "null"]
        },
        fee: {
          bsonType: ["int", "double"]
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
