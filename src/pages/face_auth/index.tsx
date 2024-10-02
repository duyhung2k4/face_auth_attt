import React, { useEffect, useRef, useState } from "react";

import { TOKEN_TYPE } from "@/model/variable";
import { Stack } from "@mantine/core";
import { useSendFileAuthMutation } from "@/redux/api/auth.api";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constant/router";



const FaceAuth: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [_, setLoad] = useState<boolean>(false);

    const uuid = localStorage.getItem(TOKEN_TYPE.PROFILE_UUID_PENDING);
    const [post] = useSendFileAuthMutation();
    const navigation = useNavigate();

    useEffect(() => {
        if (!uuid) return;
        const ws = new WebSocket(`${import.meta.env.VITE_ART_PIXEL_SOCKET}/auth?uuid=${uuid}`);

        setWs(ws);

        ws.onmessage = (data) => {
            if (data.data === "done") {
                setTimeout(() => {
                    navigation(ROUTER.SAVE_PROCESS.href);
                }, 1000)
            }
            setLoad(false);
            captureFrameAsImage();
        }
    }, [uuid]);

    const sendMessage = async (dataBase64: string) => {
        // if (!ws) return
        await post({ data: dataBase64 });

        // const imageBase64 = dataBase64.split(",")[1];
        // if (!imageBase64) return

        // console.log("send");

        // ws.send(JSON.stringify({
        //     type: "send_file_auth_face",
        //     auth: Cookies.get(TOKEN_TYPE.PROFILE_UUID_PENDING),
        //     data: {
        //         data: imageBase64,
        //     },
        // }));
        // setLoad(true);
    }







    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const captureFrameAsImage = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Đặt kích thước canvas bằng với kích thước video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Tính toán đường kính và bán kính
        const diameter = Math.min(canvas.width, canvas.height);
        const radius = diameter / 2;

        // Vẽ hình tròn
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.clip(); // Cắt canvas theo hình tròn

        // Vẽ video lên canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Lấy hình ảnh từ canvas dưới dạng base64
        const imageDataUrl = canvas.toDataURL("image/png");
        sendMessage(imageDataUrl); // Gửi hình ảnh đến server
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


    if (!ws) {
        return (<>Not ws</>)
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

export default FaceAuth;