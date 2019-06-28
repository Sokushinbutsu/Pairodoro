import axios from 'axios';
import { GET_ALL, ADD_OBJ, DELETE_OBJ, OBJS_LOADING } from './types';

export const getObjs = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/pomodoros').then(res =>
    dispatch({
      type: GET_ALL,
      payload: res.data
    })
  );
};

export const addObj = item => dispatch => {
  axios.post('/api/pomodoros', item).then(res =>
    dispatch({
      type: ADD_OBJ,
      payload: res.data
    })
  );
};

export const deleteObj = id => dispatch => {
  axios.delete(`/api/pomodoros/${id}`).then(res =>
    dispatch({
      type: DELETE_OBJ,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: OBJS_LOADING
  };
};
