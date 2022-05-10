module.exports = {
  name: "tag_groups",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        group_label: {
          bsonType: "string"
        },
        tags: {
          bsonType: ["array"],
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
};
