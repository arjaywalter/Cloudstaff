import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, fetchTopStoriesApi } from '../api/Api';

export const getTopStories = createAsyncThunk(
  'story/topStories',
  async ({ }, thunkAPI) => {
    try {
      // const storyIds = await fetchTopStoriesApi();
      return [
        { id: 1, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: 'Fri 17 Jun, 3-4pm' },
        { id: 2, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: 'Fri 17 Jun, 3-4pm' },
        { id: 3, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: 'Fri 17 Jun, 3-4pm' },
        { id: 4, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: 'Fri 17 Jun, 3-4pm' }
      ];
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: [],
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
  },
  extraReducers: {
    [getTopStories.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getTopStories.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    [getTopStories.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { clearState } = storySlice.actions;

const reducer = storySlice.reducer;
export default reducer;
