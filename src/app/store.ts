import { configureStore } from "@reduxjs/toolkit";
import automationsReducer from "./automationsSlice";

export const store = configureStore({
  reducer: { automations: automationsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
