export const FileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error("参数必须是 File 对象"));
      return;
    }

    // File Reader
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result); // Base 64 String
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
