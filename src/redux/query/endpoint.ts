import { TOKEN_TYPE } from "@/model/variable";



export const HEADER = {
    defaultHeader: () => ({
        accept: 'application/json',
    }),
    refreshTokenHeader: () => {
        const token = localStorage.getItem(TOKEN_TYPE.REFRESH_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    protectedHeader: () => {
        const token = localStorage.getItem(TOKEN_TYPE.ACCESS_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    authHeader: () => {
        const token = localStorage.getItem(TOKEN_TYPE.PROFILE_UUID_PENDING);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    createSocket: () => {
        const token = localStorage.getItem(TOKEN_TYPE.SOCKET_AUTH);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
}

export const endPoint = {
    auth: {
        register: () => ({
            url: "api/v1/auth/register",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        sendFileAuth: () => ({
            url: "api/v1/auth/send-file-auth",
            method: "POST",
            headers: HEADER.authHeader(),
        }),
        createSocketAuthFace: () => ({
            url: "api/v1/auth/create-socket-auth-face",
            method: "POST",
            headers: HEADER.authHeader(),
        }),
        faceLogin: () => ({
            url: "api/v1/auth/auth-face",
            method: "POST",
            headers: HEADER.createSocket(),
        }),
        acceptCode: () => ({
            url: "api/v1/auth/accept-code",
            method: "POST",
            headers: HEADER.authHeader(),
        }),
        saveProcess: () => ({
            url: "api/v1/auth/save-process",
            method: "POST",
            headers: HEADER.authHeader(),
        }),
    },
    event: {
        getAllEvent: () => ({
            url: "api/v1/event/all",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    }
}