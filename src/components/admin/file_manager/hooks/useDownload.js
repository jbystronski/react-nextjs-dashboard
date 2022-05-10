const useDownload = () => {
  const download = async (path) => {
    try {
      const url = path.replace("./public", process.env.baseUrl);
      const res = await fetch(url, {
        method: "GET",
        responseType: "blob",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", path.split("/").slice(-1).join(""));
      document.body.append(link);
      link.click();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    download
  };
};

export default useDownload;
