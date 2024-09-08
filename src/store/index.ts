
import { configureStore } from '@reduxjs/toolkit';
import judgesReducer from './slices/judgesSlice';

export const store = configureStore({
    reducer: {
        judges: judgesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
