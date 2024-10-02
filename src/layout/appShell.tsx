import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import useWindowDimensions from "@/hook/screen.hook";
import Cookies from "js-cookie";

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ObjectRouter, ROUTER } from "@/constant/router";
import { useOutlet } from "react-router";
import { TOKEN_TYPE } from "@/model/variable";



export type TypeAppShellContext = {
    mobileOpened: boolean
    desktopOpened: boolean
    widthMain: number
    search: string
    toggleMobile: () => void
    toggleDesktop: () => void
    setWidthMain: React.Dispatch<React.SetStateAction<number>>
    setSearch: React.Dispatch<React.SetStateAction<string>>
    links: ObjectRouter[]
}

export const AppShellContext = createContext<TypeAppShellContext>({
    mobileOpened: false,
    desktopOpened: false,
    widthMain: 0,
    search: "",
    toggleMobile: () => { },
    toggleDesktop: () => { },
    setWidthMain: () => { },
    setSearch: () => { },
    links: [],
})

const AppshellLayout: React.FC = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [widthMain, setWidthMain] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const outlet = useOutlet();
    const refMain = useRef<HTMLDivElement | null>(null);

    const { width } = useWindowDimensions();

    const links = useMemo(() => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);

        if (!token) {
            return [
                ROUTER.EVENT,
            ]
        }

        return [
            ROUTER.EVENT,
        ]
    }, [Cookies.get(TOKEN_TYPE.ACCESS_TOKEN)]);

    useEffect(() => {
        setWidthMain(refMain.current?.offsetWidth || 0);
    }, [width]);


    return (
        <AppShellContext.Provider
            value={{
                links,
                mobileOpened,
                desktopOpened,
                widthMain,
                search,
                toggleMobile,
                toggleDesktop,
                setWidthMain,
                setSearch,
            }}
        >
            <AppShell
                padding={0}
            >
                <AppShell.Main>
                    {outlet}
                </AppShell.Main>
            </AppShell>
        </AppShellContext.Provider>
    )
}

export default AppshellLayout;