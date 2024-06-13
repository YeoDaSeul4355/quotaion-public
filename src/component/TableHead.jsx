import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="description1">구분</th>
        <th className="description2">개발항목</th>
        <th className="description3">종류</th>
        <th className="description4">TYPE</th>
        <th className="quantity">수량</th>
        <th className="unitPrice">단가</th>
        <th className="supplyValue">공급가액</th>
        <th className="vat">부가세</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
