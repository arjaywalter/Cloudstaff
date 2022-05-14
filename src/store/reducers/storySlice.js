import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, fetchTopStoriesApi } from '../api/Api';

export const getTopStories = createAsyncThunk(
  'story/topStories',
  async ({ }, thunkAPI) => {
    try {
      // const storyIds = await fetchTopStoriesApi();
      const data = [
        { id: 1, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: '2021-05-14T06:50:01' },
        { id: 2, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: '2022-01-27T08:29:30' },
        { id: 3, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: '2021-03-07T01:29:45' },
        { id: 4, image: 'https://walkerstreep-bucket.s3.us-east-2.amazonaws.com/aw0001/avatars/IMG_0002.JPG', name: 'Steven Mathers', description: 'Rrrr', date: '2020-11-29T08:29:30' },
      ];
      const sorted = data.sort((a,b)=>{
        const dateA = new Date(`${a.date}`).valueOf();
        const dateB = new Date(`${b.date}`).valueOf();
        if(dateA > dateB){
          return -1; 
        }
        return 1 
      });
      return sorted;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addItem = createAsyncThunk(
  'story/addItem',
  async ({item}, thunkAPI) => {
    console.log('zxcv', item);
    try {
      return item;
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

    [addItem.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data.unshift({...action.payload, id: state.data.length + 1});
    },
    [addItem.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { clearState } = storySlice.actions;

const reducer = storySlice.reducer;
export default reducer;
