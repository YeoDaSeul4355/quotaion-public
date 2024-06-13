import React from "react";
import useInfoInput from "../utils/useInfoInput";
import makePdf from "../utils/make_pdf";

function Head() {
  const [formValues, handleInputChange] = useInfoInput({
    customerName: "",
    projectName: "",
    scopeSummary: "",
    other: "",
    manager: "",
    email: "",
  });
  const pdf = makePdf();
  const onClick = async (e) => {
    e.preventDefault();
    document.querySelector(".pdfBtn").style.display = "none";
    await pdf.viewWithPdf();
    document.querySelector(".pdfBtn").style.display = "block";
  };
  return (
    <>
      <header id="header">
        <h1>견적서</h1>
        <button onClick={onClick} className="pdfBtn">
          PDF View
        </button>
      </header>
      <div className="info_table">
        <div className="client">
          <table>
            <tbody>
              <tr>
                <td className="thead">고객명</td>
                <td>
                  <input
                    type="text"
                    name="customerName"
                    value={formValues.customerName}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="thead">프로젝트명</td>
                <td>
                  <input
                    type="text"
                    name="projectName"
                    value={formValues.projectName}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="thead">범위요약</td>
                <td>
                  <input
                    type="text"
                    name="scopeSummary"
                    value={formValues.scopeSummary}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="thead">기타</td>
                <td>
                  <input
                    type="text"
                    name="other"
                    value={formValues.other}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p>아래와 같이 견적합니다.</p>
        </div>
        <div className="company">
          <table>
            <tbody>
              <tr>
                <td className="thead">상호명</td>
                <td>상호명</td>
              </tr>
              <tr>
                <td className="thead">대표</td>
                <td>쭐</td>
              </tr>
              <tr>
                <td className="thead">사업자번호</td>
                <td>123-12-123333</td>
              </tr>
              <tr>
                <td className="thead">사업장</td>
                <td>경기도 안산시 단원구</td>
              </tr>
              <tr>
                <td className="thead">담당자</td>
                <td>
                  <input
                    type="text"
                    name="manager"
                    value={formValues.manager}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="thead">이메일</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Head;
