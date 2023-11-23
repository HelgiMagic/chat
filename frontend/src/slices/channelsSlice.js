/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  list: [],
  active: 1,
};

// export const addChannel = createAsyncThunk(
//   'tasks/addTask',
//   async (name) => {
//     const response = await axios.post(routes.tasksPath(), { name });
//     return response.data;
//   },
// );

const channelsSlice = createSlice({
  name: 'comments',
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
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchTasks.fulfilled, tasksAdapter.addMany)
    //   .addCase(addTask.fulfilled, tasksAdapter.addOne)
    //   .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
  },
});

export const { addChannel, setChannels, setActive } = channelsSlice.actions;
export default channelsSlice.reducer;
