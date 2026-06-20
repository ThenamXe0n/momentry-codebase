import {createSlice } from "@reduxjs/toolkit";


const initialState = {
  popupOpen: false,
  modal: null,
  isLoading: false,
  seletedPostcomments: [],
  selectedPostId: null,
};



const TogglerSlice = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    handleOpenPopup: (state, action) => {
      state.modal = action.payload.modal;
      if (action.payload.modal !== null) {
        state.popupOpen = true;
      }
    },
    handleClosePopup: (state) => {
      state.popupOpen = false;
      state.modal = null;
    }
  },
  
});

export const { handleClosePopup, handleOpenPopup } = TogglerSlice.actions;

export default TogglerSlice.reducer;
