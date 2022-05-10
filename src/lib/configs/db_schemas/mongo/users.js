module.exports = {
  name: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password"],
      properties: {
        email: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        active: {
          bsonType: "bool"
        },
        logged_in: {
          bsonType: "bool"
        },
        activation_token: {
          bsonType: "string"
        },

        img: {
          bsonType: "string"
        },

        first_name: {
          bsonType: "string"
        },
        last_name: {
          bsonType: "string"
        },
        street: {
          bsonType: "string"
        },
        city: {
          bsonType: "string"
        },
        zip_code: {
          bsonType: "string"
        },
        country: {
          bsonType: "string"
        },
        company: {
          bsonType: "string"
        },
        tax_id: {
          bsonType: "string"
        },
        phone_number: {
          bsonType: "string"
        },
        roles: {
          bsonType: "array",
          enum: ["admin", "user"]
        },
        mailing_list_ids: {
          bsonType: ["array"],
          description:
            "An array of mailing lists objectIds the user has subscribed to"
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
