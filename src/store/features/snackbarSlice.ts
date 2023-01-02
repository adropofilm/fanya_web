import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SnackbarState = {
  content: string;
  isOpen: boolean;
};

const initialState: SnackbarState = {
  content: "",
  isOpen: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.isOpen = true;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      state.content = "";
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export const selectIsSnackbarOpen = (state: RootState): boolean =>
  state.snackbar.isOpen;

export const selectSnackbarContent = (state: RootState): string =>
  state.snackbar.content;

export default snackbarSlice.reducer;
