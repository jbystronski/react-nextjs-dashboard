import Index from "./layout/Index";
import FileManagerProvider from "./context";

const FileManager = () => {
  return (
    <FileManagerProvider>
      <Index />
    </FileManagerProvider>
  );
};

export default FileManager;
