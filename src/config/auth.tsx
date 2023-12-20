import React, { useEffect } from "react";
import { Redirect, useLocation } from "@reach/router";

import { Container } from "../styles";
import { LinearLoader } from "../components/Loader";
import { ROUTES } from "./routes";
import { useAppDispatch, useAppSelector } from "../store";
import { getUser } from "../store/user";

export function withAuth(Component: React.ElementType) {
  function WithAuth(props: any) {
    const location = useLocation();
    const user = useAppSelector((state) => state.user);

    if (!user.isLoaded)
      return (
        <Container>
          <LinearLoader />
        </Container>
      );

    if (user.isEmpty) {
      return <Redirect from={location.pathname} to={ROUTES.login} noThrow />;
    }

    if (
      !user.isEmpty &&
      !user.isRegistered &&
      location.pathname !== ROUTES.userEdit
    ) {
      return <Redirect from={location.pathname} to={ROUTES.userEdit} noThrow />;
    }

    return <Component {...props} />;
  }

  return WithAuth;
}

export function withLogin() {
  const auth = useAppSelector((state) => state.firebase.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.isLoaded && dispatch(getUser());
  }, [auth.isEmpty, auth.isLoaded]);
}
