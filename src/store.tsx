import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/auth';
import { eventsApi } from './apis/event';
import { profileApi } from './apis/profile';
import { reviewsApi } from './apis/reviews';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, eventsApi.middleware, profileApi.middleware, reviewsApi.middleware, ),
});