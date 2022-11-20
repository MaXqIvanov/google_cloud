import { RootState } from './index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import api from '../plugins/api';
import { screenState } from '../ts';


interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getScreen = createAsyncThunk(
  'screen/getScreen',
  async (params: any, { getState }: any) => {
    const response = await api.post('google_image', {
      image_send: params.image_send
    })
    return { response };
  }
);

const screenSlice = createSlice({
  name: 'screen',
  initialState: {
    loading: false,
    text_load: '',
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getScreen.pending, (state: screenState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getScreen.fulfilled, (state: screenState, { payload }: PayloadAction<any>) => {
      if(payload.response.status < 400){
        state.text_load = payload.response.data
        const a = document.createElement('a');
        let file = new Blob([payload.response.data], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'myfilename.txt';
        a.click()
      }
      state.loading = false;
    });
    builder.addCase(getScreen.rejected, (state: screenState) => {
      state.loading = false;
    });
  },
});

export default screenSlice.reducer;
export const {
} = screenSlice.actions;
