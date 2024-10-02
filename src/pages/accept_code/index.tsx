import React, { useState } from "react";

import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useAcceptCodeMutation } from "@/redux/api/auth.api";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constant/router";
import { TOKEN_TYPE } from "@/model/variable";

import classes from "./style.module.css";



const AcceptCode: React.FC = () => {
    const [code, setCode] = useState<string>("");

    const navigation = useNavigate();
    const [post, { isLoading }] = useAcceptCodeMutation();

    const handleAcceptCode = async () => {
        const result = await post(code);
        if("error" in result) return

        const publicKey = result.data.data;
        if(!publicKey) return;

        localStorage.setItem(TOKEN_TYPE.PUBLIC_KEY, publicKey);
        navigation(ROUTER.HOME.href);
    }

    return (
        <Stack className={classes.root}>
            <Stack className={classes.form} w={400}>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: 500
                    }}
                >Nhập mã xác nhận</Text>
                <TextInput
                    label="Mã xác nhận"
                    placeholder="Mã xác nhận"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />
                <Button
                    onClick={handleAcceptCode}
                    loading={isLoading}
                    disabled={isLoading}
                >Xác nhận</Button>
            </Stack>
        </Stack>
    )
}

export default AcceptCode;