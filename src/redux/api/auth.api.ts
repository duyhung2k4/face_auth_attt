import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { FaceLoginRequest, RegisterRequest, SendFileAuthRequest } from "@/dto/request/auth";
import { RegisterResponse } from "@/dto/response/auth";



export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        register: builder.mutation<QueryReturnType<RegisterResponse>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.register(),
                data: payload,
            }),
        }),
        sendFileAuth: builder.mutation<QueryReturnType<null>, SendFileAuthRequest>({
            query: (payload) => ({
                ...endPoint.auth.sendFileAuth(),
                data: payload,
            }),
        }),
        faceLogin: builder.mutation<QueryReturnType<null>, FaceLoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.faceLogin(),
                data: payload,
            }),
        }),
        createSocketAuthFace: builder.mutation<QueryReturnType<string>, null>({
            query: (payload) => ({
                ...endPoint.auth.createSocketAuthFace(),
                data: payload,
            }),
        }),
        acceptCode: builder.mutation<QueryReturnType<string>, string>({
            query: (payload) => ({
                ...endPoint.auth.acceptCode(),
                data: { code: payload },
            }),
        }),
        saveProcess: builder.mutation<QueryReturnType<null>, null>({
            query: () => ({
                ...endPoint.auth.saveProcess(),
            }),
        }),
    })
});

export const {
    useRegisterMutation,
    useSendFileAuthMutation,
    useFaceLoginMutation,
    useCreateSocketAuthFaceMutation,
    useAcceptCodeMutation,
    useSaveProcessMutation,
} = authApi;