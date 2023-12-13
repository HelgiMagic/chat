/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [{
    body: 'proverka', id: 1, channelId: 1, username: 'admin',
  }],
};

const messagesSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.list = action.payload;
    },
    addMessage(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
