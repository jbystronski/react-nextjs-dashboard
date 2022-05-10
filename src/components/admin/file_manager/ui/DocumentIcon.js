import { IconMapper } from "core/ui";

import { addProps } from "core/utils/addProps";

export default function DocumentIcon({ ext, styling, ...props }) {
  const isIncluded = (arr, v) => arr.includes(v.toLowerCase());

  const images = [
    "jpg",
    "jpeg",
    "png",
    "svg",
    "ico",
    "webp",
    "tiff",
    "tif",
    "avif",
    "apng",
    "svgz"
  ];

  const docs = [
    "otf",
    "odt",
    "xlsx",
    "xls",
    "doc",
    "docx",
    "txt",
    "srt",
    "css",
    "sass",
    "less",
    "js",
    "jsx",
    "php",
    "csv",
    "html",
    "md",
    "sample",
    "git",
    "pack",
    "kvconfig",
    "idx",
    "ttf",
    "otf",
    "json"
  ];

  const archives = ["zip", "gz", "xz", "deb"];

  const pdfs = ["pdf"];

  const videos = [
    "mp4",
    "mov",
    "mkv",
    "avi",
    "wmv",
    "swf",
    "flv",
    "f4v",
    "avchd",
    "mpeg-4",
    "webm",
    "264"
  ];

  const audio = ["mp3", "m4a", "wav", "wma", "aac", "flac", "oog"];
  let color = "primary.main";
  const renderIcon = () => {
    let icon = null;

    switch (true) {
      case isIncluded(images, ext):
        icon = "image_file";
        break;
      case isIncluded(archives, ext):
        color = "secondary.main";
        icon = "archive_file";
        break;
      case isIncluded(pdfs, ext):
        color = "error.main";
        icon = "pdf_file";
        break;
      case isIncluded(audio, ext):
        icon = "audio_file";
        break;
      case isIncluded(docs, ext):
        icon = "file";
        break;
      case isIncluded(videos, ext):
        icon = "video_file";
        break;
      default:
        color = "secondary.main";
        icon = "folder_not_empty";
    }

    return <IconMapper icon={icon} />;
  };

  return (
    <>
      {addProps(renderIcon(), {
        ...props,
        color: color,

        styling: styling
      })}
    </>
  );
}
