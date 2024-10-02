import { lazy } from "react";

// auth page
export const PageRegsiter = lazy(() => import("@/pages/register"));
export const PageFaceAuth = lazy(() => import("@/pages/face_auth"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));
export const PageFaceLogin = lazy(() => import("@/pages/face_login"));
export const PageSaveProcess = lazy(() => import("@/pages/save_process"));
export const PageHome = lazy(() => import("@/pages/home"));

export const PageEncodingPassword = lazy(() => import("@/pages/encoding_password"));
export const PageDecodingPassword = lazy(() => import("@/pages/decoding_password"));

export const PageEncodingFace = lazy(() => import("@/pages/encoding_face"));
export const PageDecodingFace = lazy(() => import("@/pages/decoding_face"));

// protected page
// other
export const PageNotFound = lazy(() => import("@/pages/not_found"));