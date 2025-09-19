import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import QueryProvider from "src/contexts/QueryProvider";
// import ThemeProvider from "src/contexts/ThemeProvider";
import Loading from "src/components/Loading";
import App from "src/AppWrapper";
import "src/index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <QueryProvider>
            <Suspense fallback={<Loading />}>
                <ToastContainer />
                <App />
            </Suspense>
        </QueryProvider>
    </ChakraProvider>
);
