import React, { useEffect } from "react";

import { ROUTER } from "@/constant/router";
import { useSaveProcessMutation } from "@/redux/api/auth.api";
import { useNavigate } from "react-router";
import { Group, Loader, Text } from "@mantine/core";

import bg from "@/assets/background.png";
import classes from "./style.module.css";



const SaveProcess: React.FC = () => {
    const [post] = useSaveProcessMutation();
    const navigation = useNavigate();

    const handleProcess = async () => {
        const result = await post(null);
        if("error" in result) return;
        navigation(ROUTER.ACCEPT_CODE.href);
    }

    useEffect(() => {
        handleProcess();
    }, []);

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
                <Loader/> <Text style={{ color: "#FFF", fontSize: 36 }}>Đang lưu tiến trình</Text>
            </Group>
        </Group>
    )
}

export default SaveProcess;