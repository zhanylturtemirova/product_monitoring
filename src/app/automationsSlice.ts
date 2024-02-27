import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import data from "./db.json";
import { Automation } from "../types";

const initialState: Array<Automation> = data.data.oneClickAutomations.items;
const automationSlice = createSlice({
  name: "automations",
  initialState,
  reducers: {},
});

export const selectAllAutomations = (state: RootState) => state.automations;
export const selectAutomationById = (state: RootState, id: number) =>
  state.automations.find((automation) => Number(automation.id) == Number(id));

export const selectAutomationSites = (state: RootState) => [
  ...new Set(
    state.automations
      .map((automation) => automation.sites.map((item) => item.title))
      .flat()
  ),
];
export const selectAutomationCategory = (state: RootState) => [
  ...new Set(
    state.automations
      .map((automation) => automation.categories.map((item) => item.title))
      .flat()
  ),
];

// export const selectAutomationSites = () =>
//   createSelector<any, any>([selectAllAutomations], (state: RootState) => [
//     ...new Set(
//       state.automations
//         .map((automation) => automation.sites.map((item) => item.title))
//         .flat()
//     ),
//   ]);

export default automationSlice.reducer;
