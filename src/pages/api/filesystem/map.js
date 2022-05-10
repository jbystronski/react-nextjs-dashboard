import { mapFiles } from "core/filesystem";

export default async (req, res) => {
  try {
    const files = await mapFiles();

    res.status(200).json(files);
  } catch (e) {
    console.log(e);
  }
};
