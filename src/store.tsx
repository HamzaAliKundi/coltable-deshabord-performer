import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/auth';
import { eventsApi } from './apis/event';
import { profileApi } from './apis/profile';
import { reviewsApi } from './apis/reviews';
import { messagesApi } from './apis/messages'; 
import { mediaApi } from './apis/media';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, eventsApi.middleware, profileApi.middleware, reviewsApi.middleware, messagesApi.middleware, mediaApi.middleware),
});

/** Clear all RTK Query caches on logout so the next user does not see previous user's data */
export const resetApiCachesOnLogout = () => {
  store.dispatch(eventsApi.util.resetApiState());
  store.dispatch(authApi.util.resetApiState());
  store.dispatch(profileApi.util.resetApiState());
  store.dispatch(reviewsApi.util.resetApiState());
  store.dispatch(messagesApi.util.resetApiState());
  store.dispatch(mediaApi.util.resetApiState());
};