# 견적서 만들기

## 사용 라이브러리 : Zustand, html2canvas, jsPDF

## ♻ 코드 리팩토링

### make_pdf.js

<details>
    <summary>💢 리팩토링 전</summary>

```javascript
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const makePdf = () => {

  // ✨ 이미지로 변환해주는 함수
  const convertToImg = async () => {
    // 이미지로 변환할 HTML 요소 선택
    const paper = document.querySelector(".container");

    // HTML 요소를 캔버스로 변환
    const canvas = await html2canvas(paper, { scale: 2 });
    // 캔버스를 PNG 이미지 파일로 변환
    const imageFile = canvas.toDataURL("image/png", 1.0);

    return imageFile;
  };

  // ✨ html2canvs로 변환된 이미지를 PDF로 변환하는 함수
  const convertToPdf = (imageFile) => {
    // 새로운 PDF 문서 생성
    const doc = new jsPDF("p", "mm", "a4");

    // 페이지 너비, 높이 설정
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 여백 설정
    const margin = 10;

    // 이미지 속성, 너비, 높이
    const imgProps = doc.getImageProperties(imageFile);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    // 이미지가 페이지에 맞게 비율 계산
    const ratio = Math.min(
      (pageWidth - margin * 2) / imgWidth,
      (pageHeight - margin * 2) / imgHeight
    );

    // 여백 포함한 이미지 너비, 높이
    const imgWidthWithMargin = imgWidth * ratio;
    const imgHeightWithMargin = imgHeight * ratio;

    // 이미지의 위치
    const x = (pageWidth - imgWidthWithMargin) / 2;
    let y = margin;

    if (imgHeightWithMargin <= pageHeight - margin * 2) {
      // 이미지가 한 페이지에 맞는 경우
      doc.addImage(
        imageFile,
        "PNG",
        x,
        y,
        imgWidthWithMargin,
        imgHeightWithMargin
      );
    } else {
      // 이미지가 여러 페이지에 걸쳐 있는 경우
      let position = 0;
      while (position < imgHeightWithMargin) {
        doc.addImage(
          imageFile,
          "PNG",
          x,
          y,
          imgWidthWithMargin,
          imgHeightWithMargin,
          undefined,
          "FAST",
          0,
          position
        );
        position += pageHeight - margin * 2;
        if (position < imgHeightWithMargin) {
          doc.addPage();
        }
      }
    }

    // 🎊 생성된 PDF를 새 창으로 열기
    window.open(doc.output("bloburl"));

    // PDF 파일 반환
    const pdf = new File([doc.output("blob")], "test.pdf", {
      type: "application/pdf",
    });

    return pdf;
  };

  // 함수 실행
  return {
    viewWithPdf: async () => {
      const imageFile = await convertToImg();
      const pdf = convertToPdf(imageFile);

      return pdf;
    },
  };
};

export default makePdf;
``` 
</details> 

<details>
    <summary>✅ 리팩토링 후</summary>

```javascript
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
```

</details>

### 리팩토링 내용
- convertToPdf 함수에서 페이지 너비와 높이를 가져오는 부분을 구조 분해 할당으로 간소화
- 이미지 비율 계산 및 이미지 크기 조정을 한 줄로 정리
- if-else 구조를 제거하고 while 루프 하나로 통합. 이미지가 한 페이지에 맞는 경우도 while 루프 내에서 처리되도록 변경