import { TASKS_URL } from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getAllTask: builder.query({
      query: ({ search = "" }) => ({
        url: `${TASKS_URL}?search=${search}`,
        method: "GET",
      }),
    }),

    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
      }),
    }),

    getWeeklySummary: builder.query({
      query: () => ({
        url: `${TASKS_URL}/weekly-summary`,
        method: "GET",
      }),
    }),

    getTasksByDateRange: builder.query({
      query: ({ start, end }) => ({
        url: `${TASKS_URL}/task-by-date?start=${start}&end=${end}`,
        method: "GET",
      }),
    }),

    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useGetSingleTaskQuery,
  useGetWeeklySummaryQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksByDateRangeQuery,
} = postApiSlice;
