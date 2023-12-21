/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  active: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.list = action.payload;
    },
    addChannel(state, action) {
      state.list.push(action.payload);
    },
    setActive(state, action) {
      state.active = action.payload;
    },
    renameChannel(state, action) {
      console.log(action.payload);
      const { id, name } = action.payload;
      const elem = state.list.find((find) => find.id === id);
      elem.name = name;
    },
    removeChannel(state, action) {
      console.log(action.payload);
      const newList = state.list.filter((elem) => elem.id !== action.payload.id);
      state.list = newList;
    },
  },
});

export const {
  addChannel, setChannels, setActive, renameChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
