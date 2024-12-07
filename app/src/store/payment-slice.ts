/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for creating a payment intent
export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async (amount: number, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/v1/payments/create-payment-intent', { amount });
      return response.data; // clientSecret
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Failed to create payment intent'
      );
    }
  }
);

// Thunk for updating user credits
export const updateCredits = createAsyncThunk(
  'payment/updateCredits',
  async (
    { userId, textCredits, videoCredits }: { userId: string; textCredits: number; videoCredits: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.post('http://localhost:3000/v1/payments/update-credits', {
        userId,
        textCredits,
        videoCredits,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Failed to update credits'
      );
    }
  }
);

export interface PaymentState {
  intentLoading: boolean;
  updateLoading: boolean;
  clientSecret: string | null;
  error: string | null;
  success: boolean;
}

const initialState: PaymentState = {
  intentLoading: false,
  updateLoading: false,
  clientSecret: null,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.intentLoading = false;
      state.updateLoading = false;
      state.clientSecret = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.intentLoading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.intentLoading = false;
        state.clientSecret = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.intentLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCredits.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateCredits.fulfilled, (state) => {
        state.updateLoading = false;
        state.success = true;
      })
      .addCase(updateCredits.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;