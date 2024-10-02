import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { EventModel } from "@/model/event";



export const eventApi = createApi({
    reducerPath: "eventApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllEvent: builder.query<QueryReturnType<EventModel[]>, null>({
            query: () => ({
                ...endPoint.event.getAllEvent(),
            }),
        }),
    })
});

export const {
    useGetAllEventQuery,
} = eventApi;