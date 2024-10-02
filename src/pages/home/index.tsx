import React, { useEffect, useMemo } from "react";

import { Button, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constant/router";
import { TOKEN_TYPE } from "@/model/variable";

import bg from "@/assets/background.png";
import classes from "./style.module.css";



const Home: React.FC = () => {
    const navigation = useNavigate();
    const argvString = localStorage.getItem("argv");

    const typeFile = useMemo(() => {
        const filePath = localStorage.getItem("file-path");
        if (!filePath) return "";

        const list = filePath.split(".")
        return list[list.length - 1];
    }, [localStorage.getItem("file-path")]);

    useEffect(() => {
        if (!argvString) return;
        const args = JSON.parse(argvString);
        localStorage.setItem("file-path", args[1]);
    }, [argvString]);


    if (typeFile.length === 0) {
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
                    <Loader /> <Text style={{ color: "#FFF", fontSize: 36 }}>Đang tải</Text>
                </Group>
            </Group>
        )
    }

    console.log(typeFile);


    return (
        <Group
            style={{
                backgroundImage: `url(${bg})`
            }}
            className={classes.root}
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
            <Grid gutter={0} h={"100%"} w={"100%"}>
                <Grid.Col span={12} className={classes.option}>
                    <Stack>
                        {(typeFile !== "aes" && typeFile !== "rsa") &&
                            <>
                                <Button onClick={() => navigation(ROUTER.ENCODING_PASSWORD.href)}>Mã hóa bằng mật khẩu</Button>
                                {localStorage.getItem(TOKEN_TYPE.PUBLIC_KEY) ?
                                    <Button onClick={() => navigation(ROUTER.ENCODING_FACE.href)}>Mã hóa bằng khuôn mặt</Button>
                                    : <Button onClick={() => navigation(ROUTER.REGISTER.href)}>Đăng kí xác thực khuôn mặt</Button>}
                            </>
                        }
                        {typeFile === "aes" && <Button onClick={() => navigation(ROUTER.DECODING_PASSWORD.href)}>Giải mã bằng mật khẩu</Button>}
                        {typeFile === "rsa" && <Button onClick={() => navigation(ROUTER.DECODING_FACE.href)}>Giải mã bằng khuôn mặt</Button>}
                    </Stack>
                </Grid.Col>
            </Grid>
        </Group>
    )
}

export default Home;