// App.js
import React, { useEffect } from "react";
import useStore from "./store/store";
import { numFormatter } from "./utils/numFormatter";
import useInput from "./utils/useInput";
import Head from "./component/Head";
import TableHeader from "./component/TableHead";
import Total from "./component/Total";
import Note from "./component/Note";

function Row({ row }) {
  const description1 = useInput(row.id, "description1");
  const description2 = useInput(row.id, "description2");
  const description3 = useInput(row.id, "description3");
  const description4 = useInput(row.id, "description4");
  const quantity = useInput(row.id, "quantity");
  const unitPrice = useInput(row.id, "unitPrice", numFormatter);
  const supplyValue = useInput(row.id, "supplyValue", numFormatter);
  const vat = useInput(row.id, "vat", numFormatter);
  const updateRow = useStore((state) => state.updateRow);
  const removeRow = useStore((state) => state.removeRow);

  useEffect(() => {
    const qty = parseFloat(quantity.value.replace(/,/g, ""));
    const price = parseFloat(unitPrice.value.replace(/,/g, ""));
    if (!isNaN(qty) && !isNaN(price)) {
      const supplyVal = qty * price;
      const vatVal = supplyVal * 0.1;
      updateRow(row.id, {
        supplyValue: numFormatter(supplyVal),
        vat: numFormatter(vatVal),
      });
    }
  }, [quantity.value, unitPrice.value, updateRow, row.id]);

  return (
    <tr>
      <td className="description1">
        <input type="text" {...description1} />
      </td>
      <td className="description2">
        <input type="text" {...description2} />
      </td>
      <td className="description3">
        <input type="text" {...description3} />
      </td>
      <td className="description4">
        <input type="text" {...description4} />
      </td>
      <td className="quantity">
        <input type="text" {...quantity} />
      </td>
      <td className="unitPrice">
        <input type="text" {...unitPrice} />
      </td>
      <td className="supplyValue pricebg">
        <input type="text" {...supplyValue} readOnly />
      </td>
      <td className="vat remove pricebg">
        <input type="text" {...vat} readOnly />
      </td>
      <td className="remove pricebg">
        <div className="removeBtn" onClick={() => removeRow(row.id)}>
          -
        </div>
      </td>
    </tr>
  );
}

function App() {
  const rows = useStore((state) => state.rows);
  const addRow = useStore((state) => state.addRow);
  const getTotalAmount = useStore((state) => state.getTotalAmount);

  return (
    <>
      <div className="container">
        <Head />
        <Total />
        <table className="product">
          <button onClick={addRow} className="addBtn">
            +
          </button>
          <TableHeader />
          <tbody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
            <tr className="gray">
              <td colSpan="7" className="totalLabel">
                합계
              </td>
              <td className="totalVat">{numFormatter(getTotalAmount())}</td>
            </tr>
            <Note />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
