import create from "zustand";

const useStore = create((set, get) => ({
  // 초기 상태
  rows: [
    {
      id: Date.now(),
      description1: "",
      description2: "",
      description3: "",
      description4: "",
      quantity: "",
      unitPrice: "",
      supplyValue: "",
      vat: "",
    },
  ],

  // 행 추가
  addRow: () =>
    set((state) => ({
      rows: [
        ...state.rows,
        {
          id: Date.now(),
          description1: "",
          description2: "",
          description3: "",
          description4: "",
          quantity: "",
          unitPrice: "",
          supplyValue: "",
          vat: "",
        },
      ],
    })),

  // 행 삭제
  removeRow: (id) =>
    set((state) => {
      if (state.rows.length > 1) {
        return {
          rows: state.rows.filter((row) => row.id !== id),
        };
      } else {
        return state;
      }
    }),

  // 행 업뎃
  updateRow: (id, updatedRow) =>
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, ...updatedRow } : row
      ),
    })),

  // 총 금액 정산
  getTotalAmount: () => {
    const { rows } = get();
    return rows.reduce(
      (total, row) =>
        total +
        Number(row.supplyValue.replace(/,/g, "")) +
        Number(row.vat.replace(/,/g, "")),
      0
    );
  },
}));

export default useStore;
