import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccessToken } from "./selectors";
import { fetchUserID, login, setAccessToken } from "./slice";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken());

  const { location } = window;
  const regex = /.*access_token=(?<accesToken>[^&]*)/gi;
  const params = regex.exec(location.hash);

  if (!accessToken && !params) {
    dispatch(login());
  }

  useEffect(() => {
    if (params && params[1]) {
      dispatch(setAccessToken({ accessToken: params[1] }));
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserID());
    }
  });

  return <>{children}</>;
};

export default AuthProvider;
