import { useCallback, useState, useEffect } from "react";
import useStore from "../store/store";

const useInput = (rowId, field, formatter) => {
  const updateRow = useStore((state) => state.updateRow);
  const storeValue = useStore((state) => {
    const row = state.rows.find((row) => row.id === rowId);
    return row ? row[field] : "";
  });

  const [value, setValue] = useState(storeValue);

  useEffect(() => {
    setValue(storeValue);
  }, [storeValue]);

  const onChange = useCallback(
    (e) => {
      let newValue = e.target.value.replace(/,/g, "");
      if (!isNaN(newValue) && newValue !== "") {
        newValue = formatter ? formatter(newValue) : newValue;
      }
      setValue(newValue);
      updateRow(rowId, { [field]: newValue });
    },
    [rowId, field, updateRow, formatter]
  );

  return {
    value,
    onChange,
  };
};

export default useInput;
