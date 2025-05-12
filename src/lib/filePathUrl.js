export const refactorFileUrl = (url="") => {
  if(!url) return "";
  const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}${url}`;
  // console.log("fileUrl : ", fileUrl);
  return fileUrl;
}