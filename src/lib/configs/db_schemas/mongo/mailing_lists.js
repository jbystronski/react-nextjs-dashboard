module.exports = {
  name: "mailing_lists",

  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        active: {
          bsonType: "bool"
        },
        name: {
          bsonType: "string"
        },
        description: {
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
