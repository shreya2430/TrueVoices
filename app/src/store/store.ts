import { configureStore } from '@reduxjs/toolkit';
import { uploadFileApi } from './file-upload-api';
import { spaceApi } from './space-store';
import { testimonialApi } from './testimonial-api';
import { userApi } from './user-store';
import paymentReducer from './payment-slice';

export const store = configureStore({
  reducer: {
    [spaceApi.reducerPath]: spaceApi.reducer,
    [uploadFileApi.reducerPath]: uploadFileApi.reducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    payment: paymentReducer, // Added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      spaceApi.middleware,
      uploadFileApi.middleware,
      testimonialApi.middleware,
      userApi.middleware
    ),
});

// Export RootState and AppDispatch for typing in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;