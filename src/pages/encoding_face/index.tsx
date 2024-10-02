import React, { useEffect } from "react";

import { Group, Loader, Text } from "@mantine/core";
import { TOKEN_TYPE } from "@/model/variable";

import bg from "@/assets/background.png";
import classes from "./style.module.css";



const EncodingFace: React.FC = () => {

    const handleEncoding = async (filePath: string) => {
        try {
            const key = localStorage.getItem(TOKEN_TYPE.PUBLIC_KEY);
            if(!key) throw "key null";
            const result = await window.electron.encryptFileFace(filePath, key);
            console.log(result); // In ra thông báo thành công
            window.close();
        } catch (error) {
            console.error("Error encrypting file:", error); // Xử lý lỗi
        }
    }

    useEffect(() => {
        const filePath = localStorage.getItem("file-path");
        if(!filePath) return;

        handleEncoding(filePath);
    }, [localStorage.getItem("file-path")]);



    return (
        <Group
            style={{
                backgroundImage: `url(${bg})`
            }}
            className={classes.root}
            justify="center"
            align="center"
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ đen với độ trong suốt 50%
                }}
            ></div>
            <Group>
                <Loader/> <Text style={{ color: "#FFF", fontSize: 36 }}>Đang mã hóa</Text>
            </Group>
        </Group>
    )
}

export default EncodingFace;