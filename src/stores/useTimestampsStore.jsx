import { create } from "zustand";

const useTimestampsStore = create((set) => ({
  timestamps: [],
  amountSumArray: [],
  simulating: false,
  setTimestamps: (timestamps, amountSumArray) => set({ timestamps, amountSumArray }), 
  setSimulating: (value) => set({ simulating: value }),
}));

export default useTimestampsStore;
