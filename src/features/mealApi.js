import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getSeafoodMeals: builder.query({
      query: () => "filter.php?c=Seafood",
    }),
    getMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
  }),
});

export const { useGetSeafoodMealsQuery, useGetMealByIdQuery } = mealApi;