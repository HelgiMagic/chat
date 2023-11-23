/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

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
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchTasks.fulfilled, tasksAdapter.addMany)
    //   .addCase(addTask.fulfilled, tasksAdapter.addOne)
    //   .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
