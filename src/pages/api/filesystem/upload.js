import formidable from "formidable-serverless";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    multiples: true,
    maxFileSize: 3 * 1024 * 1024
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ msg: err.message, status: 400 });
    }

    const path = fields.destination || "./public";

    const values = Object.values(files);

    const filesToUpload = Array.isArray(values[0]) ? values[0] : [...values];

    for (const file of filesToUpload) {
      const rawData = fs.readFileSync(file.path);

      fs.writeFile(path + "/" + file.name, rawData, function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: err.message, status: err.status });
        }
      });
    }

    return res.status(200).json({ msg: "ok", status: 200 });
  });
};
