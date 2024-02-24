import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import data from "../../app/db.json";
import { Automation } from "./types";

const initialState: Array<Automation> = data.data.oneClickAutomations.items;
const automationSlice = createSlice({
  name: "automations",
  initialState,
  reducers: {},
});

export const selectAllAutomations = (state: RootState) => state.automations;
export const selectAutomationById = (state: RootState, id: number) =>
  state.automations.find((automation) => Number(automation.id) == Number(id));

export default automationSlice.reducer;
