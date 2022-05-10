module.exports = {
  name: "slides",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string"
        },
        params: {
          bsonType: "array"
        },
        duration: {
          bsonType: "int"
        },
        image: {
          bsonType: "string"
        },
        priority: {
          bsonType: "int"
        },
        active: {
          bsonType: "bool"
        }
      }
    }
  }
};
