import React from "react";
import { numFormatter } from "../utils/numFormatter";
import useStore from "../store/store";

function Total() {
  const getTotalAmount = useStore((state) => state.getTotalAmount);

  return (
    <div className="total">
      <div className="title">
        <p>합계금액</p>
        <span>(부가세포함)</span>
      </div>
      <div className="totalCount">총 {numFormatter(getTotalAmount())} 원</div>
    </div>
  );
}

export default Total;
