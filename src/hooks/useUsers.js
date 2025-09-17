import api from "src/libs/axios";
import { useQuery } from "src/contexts/QueryProvider";

const useUsers = () => {
    const { isLoading, data } = useQuery({
        queryKey: "user",
        queryFn: () => {
            api.defaults.headers.common["Authorization"] = localStorage.getItem("token");
            return api.get(`${process.env.REACT_APP_BASE_URL}/user`);
        },
    });

    return {
        isLoading,
        users: data || [],
    };
};

export default useUsers;
