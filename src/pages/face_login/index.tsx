import React, { useEffect, useRef, useState } from "react";

import { TOKEN_TYPE } from "@/model/variable";
import { Stack } from "@mantine/core";
import { useCreateSocketAuthFaceMutation, useFaceLoginMutation } from "@/redux/api/auth.api";

const FaceLogin: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [_, setLoad] = useState<boolean>(false);


    const uuid = localStorage.getItem(TOKEN_TYPE.SOCKET_AUTH);
    const [post] = useFaceLoginMutation();
    const [create] = useCreateSocketAuthFaceMutation();

    useEffect(() => {
        if (!uuid) return;
        const ws = new WebSocket(`${import.meta.env.VITE_ART_PIXEL_SOCKET}/login?uuid=${uuid}`);
        setWs(ws);

    }, [uuid]);
    
    useEffect(() => {
        if(!ws) return;
        
        ws.onmessage = (data) => {
            const result = JSON.parse(data.data);
            console.log(result?.data?.profile);
            setLoad(false);
            // setTimeout(() => {
            //     captureFrameAsImage();
            // }, 500);
        }
    }, [ws]);

    const sendMessage = async (dataBase64: string) => {
        await post({ data: dataBase64 });
    }

    const createSocket = async () => {
        const result = await create(null);
        if ("error" in result) {
            console.log(result);
            return;
        }
        if (!result.data.data) {
            return;
        }

        localStorage.setItem(TOKEN_TYPE.SOCKET_AUTH, result.data.data);
    }






    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const captureFrameAsImage = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;


        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;


        const diameter = Math.min(canvas.width, canvas.height);
        const radius = diameter / 2;


        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.clip();


        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);


        const imageDataUrl = canvas.toDataURL("image/png");
        sendMessage(imageDataUrl);
    };

    useEffect(() => {
        if (!ws) return

        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    captureFrameAsImage();
                }
            } catch (error) {
                console.error("Lỗi khi truy cập camera:", error);
            }
        };

        getCameraStream();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [ws]);

    useEffect(() => {
        createSocket();
    }, []);


    if (!ws) {
        return (<>Not ws {import.meta.env.VITE_ART_PIXEL_SOCKET} {uuid}</>)
    }

    return (
        <>
            <Stack h={"100vh"} justify="center" align="center">
                <div
                    style={{
                        overflow: "hidden",
                        height: 400,
                        width: 400,
                        borderRadius: "50%", // Tạo hình tròn
                        position: "relative", // Để sử dụng vị trí tương đối cho canvas
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Đảm bảo video lấp đầy khung
                            borderRadius: "50%", // Tạo hình tròn cho video
                            transform: "scaleX(-1)"
                        }}
                    />
                    <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
                </div>
            </Stack>
        </>
    )
}

export default FaceLogin;