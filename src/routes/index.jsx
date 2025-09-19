import { useRoutes } from "react-router-dom";

import Page from "src/pages";
import Layouts from "src/layouts";

const appRoutes = [
    { path: "*", element: <Page.NotFound /> },
    {
        path: "/",
        children: [
            { path: "", element: <Page.Auth.SignIn /> },
            { path: "auth/signup", element: <Page.Auth.SignUp /> },
            { path: "slack", element: <Layouts.MainLayout />, children: [{ path: "", element: <Page.Slack.Home /> }] },
        ],
    },
    { path: "/service/icons", element: <Page.Icons /> },
];

const AppRoutes = () => {
    return useRoutes(appRoutes);
};

export default AppRoutes;
