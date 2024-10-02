import React, { useEffect, useState } from "react";

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constant/router";

import bg from "@/assets/background.png";
import classes from "./style.module.css";



const EncodingPassword: React.FC = () => {
    const [password, setPassword] = useState<string>("");
    const [filePath, setFilePath] = useState<string>("");

    const navigation = useNavigate();

    const handleEncoding = async () => {
        try {
            const result = await window.electron.encryptFilePassword(filePath, password);
            console.log(result); // In ra thông báo thành công
            window.close();
        } catch (error) {
            console.error("Error encrypting file:", error); // Xử lý lỗi
        }
    }

    useEffect(() => {
        const filePath = localStorage.getItem("file-path");
        if(!filePath) return;

        setFilePath(filePath);
    }, [localStorage.getItem("file-path")]);

    return (
        <Stack
            style={{
                backgroundImage: `url(${bg})`
            }}
            className={classes.root}
        >
            <Group>
                <Button onClick={() => navigation(ROUTER.HOME.href)}>Quay lại</Button>
            </Group>
            <TextInput
                label="Mật khẩu"
                placeholder="Mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={handleEncoding}>Mã hóa</Button>
        </Stack>
    )
}

export default EncodingPassword;