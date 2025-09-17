import { BrowserRouter as Router } from "react-router-dom";

import App from "src/App";

const AppWrapper = () => {
    return <Router>
        <App />
    </Router>
}

export default AppWrapper;