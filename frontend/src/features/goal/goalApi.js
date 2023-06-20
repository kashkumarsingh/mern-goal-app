import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/goals" }),
  tagTypes: ['Goals'],
  endpoints: (build) => ({
    getGoals: build.query({
      query: () => ({
         url: '/',
         method:"GET"
      }),
      providesTags: ["Goals"],
    }),
    addGoal: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const { useGetGoalsQuery, useAddGoalMutation } = api;

