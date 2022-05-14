import {combineReducers} from 'redux';

import story from './storySlice';

const rootReducer = combineReducers({
  story
});

export default rootReducer;
