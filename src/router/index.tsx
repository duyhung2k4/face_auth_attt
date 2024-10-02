import React from "react";
import AuthLayout from "../layout/auth";
import ProtectedLayout from "../layout/protected";
import AppshellLayout from "@/layout/appShell";

import { Routes, Route } from "react-router-dom";
import {
    PageRegsiter,
    PageFaceAuth,
    PageHome,
    PageNotFound,
    PageAcceptCode,
    PageSaveProcess,
    PageEncodingPassword,
    PageDecodingPassword,
    PageEncodingFace,
    PageDecodingFace,
} from "./lazy";
import { ROUTER } from "@/constant/router";



const AppRouter: React.FC = () => {

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTER.REGISTER.href} element={<PageRegsiter />} />
                <Route path={ROUTER.FACE_AUTH.href} element={<PageFaceAuth />} />
                <Route path={ROUTER.ACCEPT_CODE.href} element={<PageAcceptCode />} />
                <Route path={ROUTER.SAVE_PROCESS.href} element={<PageSaveProcess />} />
                <Route path={ROUTER.HOME.href} element={<PageHome />} />
                
                <Route path={ROUTER.ENCODING_PASSWORD.href} element={<PageEncodingPassword />} />
                <Route path={ROUTER.DECODING_PASSWORD.href} element={<PageDecodingPassword />} />
                <Route path={ROUTER.ENCODING_FACE.href} element={<PageEncodingFace />} />
                <Route path={ROUTER.DECODING_FACE.href} element={<PageDecodingFace />} />

                <Route element={<ProtectedLayout />}>
                    <Route element={<AppshellLayout />}>
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;