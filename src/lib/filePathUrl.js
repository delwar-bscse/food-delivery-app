export const refactorFileUrl = (url="") => {
  // if(!url) return "";
  const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}${url}`;
  // console.log("fileUrl : ", fileUrl);
  return fileUrl;
}

// export const refactorFileUrl = (url = "") => {
//   if (!url) return "";
//   const baseUrl = import.meta.env.VITE_BASE_URL || "";
//   const fileUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
//   return fileUrl;
// }