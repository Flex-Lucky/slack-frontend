import React from "react";

import Auth from "src/pages/auth";
import Slack from "src/pages/slack";

const Icons = React.lazy(() => import("src/pages/icon/Icons"));
const NotFound = React.lazy(() => import("src/pages/NotFound"));

const Page = {
    Auth,
    Icons,
    NotFound,
    Slack,
};

export default Page;
