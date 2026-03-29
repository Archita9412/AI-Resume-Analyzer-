import pkg from "pdfreader";

const { PdfReader } = pkg;

export const extractTextFromPDF = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    let text = "";

    new PdfReader().parseBuffer(fileBuffer, (err, item) => {
      if (err) {
        console.log("PDF read error:", err);
        reject(err);
      } else if (!item) {
        // finished reading
        resolve(text);
      } else if (item.text) {
        text += item.text + " ";
      }
    });
  });
};