import React from "react";

import { RegisterRequest } from "@/dto/request/auth";
import { TOKEN_TYPE } from "@/model/variable";
import { useRegisterMutation } from "@/redux/api/auth.api";
import { Button, Divider, Grid, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constant/router";

import classes from "./style.module.css";



const Register: React.FC = () => {
    const [post, { isLoading }] = useRegisterMutation();
    const navigation = useNavigate();

    const form = useForm<RegisterRequest>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
        }
    });

    const handleRegister = async (values: RegisterRequest) => {
        const result = await post(values);
        if ("error" in result) {
            console.log(result);
            return;
        }

        const uuid = result.data.data;
        if (!uuid) {
            return;
        }

        localStorage.setItem(TOKEN_TYPE.PROFILE_UUID_PENDING, uuid);
        navigation(ROUTER.FACE_AUTH.href);
    }

    return (
        <Stack className={classes.root}>
            <Grid h={"100%"} w={"100%"} gutter={0}>
                <Grid.Col span={8}></Grid.Col>
                <Grid.Col span={4} h={"100vh"}>
                    <Stack
                        align="start"
                        justify="center"
                        className={classes.form}
                    >
                        <Text>Đăng kí</Text>
                        <Stack w={"100%"}>
                            <form id="register" onSubmit={form.onSubmit(handleRegister)}>
                                <Stack gap={4}>
                                    <TextInput
                                        label="Họ, tên đệm"
                                        placeholder="Họ, tên đệm"
                                        {...form.getInputProps("firstName")}
                                    />
                                    <TextInput
                                        label="Tên"
                                        placeholder="Tên"
                                        {...form.getInputProps("lastName")}
                                    />
                                    <TextInput
                                        label="Email"
                                        placeholder="Email"
                                        {...form.getInputProps("email")}
                                    />
                                </Stack>
                            </form>
                            <Stack mt={32} gap={4}>
                                <Button
                                    w={"100%"}
                                    form="register"
                                    type="submit"
                                    disabled={isLoading}
                                    loading={isLoading}
                                >Đăng kí</Button>
                                <Divider my="xs" label="Hoặc" labelPosition="center" />
                                <Button
                                    w={"100%"}
                                    variant="outline"
                                    onClick={() => navigation(ROUTER.HOME.href)}
                                >Quay lại trang chủ</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Stack>
    )
}

export default Register;