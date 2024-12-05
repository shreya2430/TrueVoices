import { configureStore } from '@reduxjs/toolkit'
import { uploadFileApi } from './file-upload-api'
import { spaceApi } from './space-store'
import { testimonialApi } from './testimonial-api'

export const store = configureStore({
	reducer: {
		[spaceApi.reducerPath]: spaceApi.reducer,
		[uploadFileApi.reducerPath]: uploadFileApi.reducer,
		[testimonialApi.reducerPath]: testimonialApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			spaceApi.middleware,
			uploadFileApi.middleware,
			testimonialApi.middleware
		)
	},
})
