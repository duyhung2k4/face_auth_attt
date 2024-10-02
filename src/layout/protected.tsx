import React, { Suspense, useEffect } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useNavigate, useOutlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { TOKEN_TYPE } from "@/model/variable";
import { ROUTER } from "@/constant/router";



const ProtectedLayout: React.FC = () => {
  const outlet = useOutlet();

  const isLoading = useAppSelector(state => Object.values(state.authApi.mutations).some(mutation => mutation?.status === 'pending'))
  const accessToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
  const navigation = useNavigate();

  useEffect(() => {
    if(!accessToken) {
        navigation(ROUTER.HOME.href);
    }
  }, [accessToken]);

  if(isLoading || !accessToken) {
    return <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
  }

  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
      {outlet}
    </Suspense>
  )
}

export default ProtectedLayout;