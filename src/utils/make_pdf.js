import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const makePdf = () => {
  const convertToImg = async () => {
    const paper = document.querySelector(".container");
    const canvas = await html2canvas(paper, { scale: 2 });
    return canvas.toDataURL("image/png", 1.0);
  };

  const convertToPdf = (imageFile) => {
    const doc = new jsPDF("p", "mm", "a4");
    const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;
    const margin = 10;
    const { width: imgWidth, height: imgHeight } = doc.getImageProperties(imageFile);
    const ratio = Math.min((pageWidth - margin * 2) / imgWidth, (pageHeight - margin * 2) / imgHeight);
    const imgWidthWithMargin = imgWidth * ratio;
    const imgHeightWithMargin = imgHeight * ratio;
    const x = (pageWidth - imgWidthWithMargin) / 2;

    let y = margin;
    let position = 0;

    while (position < imgHeightWithMargin) {
      doc.addImage(imageFile, "PNG", x, y, imgWidthWithMargin, imgHeightWithMargin, undefined, "FAST", 0, position);
      position += pageHeight - margin * 2;
      if (position < imgHeightWithMargin) doc.addPage();
    }

    window.open(doc.output("bloburl"));
    return new File([doc.output("blob")], "test.pdf", { type: "application/pdf" });
  };

  return {
    viewWithPdf: async () => {
      const imageFile = await convertToImg();
      return convertToPdf(imageFile);
    },
  };
};

export default makePdf;
