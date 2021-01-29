import { createSlice } from '@reduxjs/toolkit';

export const responseSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
      increment: state => state + 1,
      decrement: state => state - 1
    }
  });