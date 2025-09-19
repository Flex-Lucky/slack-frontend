import React from "react";

const SignIn = React.lazy(() => import("src/pages/auth/SignIn"));
const SignUp = React.lazy(() => import("src/pages/auth/SignUp"));

const Auth = {
    SignIn,
    SignUp,
};

export default Auth;
