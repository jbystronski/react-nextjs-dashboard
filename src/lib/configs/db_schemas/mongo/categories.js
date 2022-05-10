module.exports = {
  name: "categories",

  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "depth"],
      properties: {
        name: {
          bsonType: "string"
        },
        url: {
          bsonType: "string"
        },
        branch: {
          bsonType: ["string", "null"]
        },
        depth: {
          bsonType: "int"
        },
        image: {
          bsonType: ["string", "null"]
        },
        parent_id: { bsonType: ["objectId", "null"] },
        parent_name: { bsonType: ["string", "null"] },
        children: {
          bsonType: ["array"],
          items: {
            bsonType: ["objectId"]
          }
        },
        tag_groups: {
          bsonType: ["array"],
          items: {
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
      }
    }
  }
};
