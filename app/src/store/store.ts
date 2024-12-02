import { configureStore } from '@reduxjs/toolkit'
import { spaceApi } from './space-store'
import { uploadFileApi } from './file-upload-api'

export const store = configureStore({
	reducer: {
		[spaceApi.reducerPath]: spaceApi.reducer,
		[uploadFileApi.reducerPath]: uploadFileApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			spaceApi.middleware,
			uploadFileApi.middleware,
		)
	},
})
