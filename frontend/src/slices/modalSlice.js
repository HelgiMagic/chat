/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
  activeElementId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModal(state, action) {
      state.activeModal = action.payload;
    },
    setActiveElementId(state, action) {
      state.activeElementId = action.payload;
    },
  },
});

export const { setActiveModal, setActiveElementId } = modalSlice.actions;
export default modalSlice.reducer;
