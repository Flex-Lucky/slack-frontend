import api from "src/libs/axios";

const upload = async (data) => {
    const response = await api.post("/files/upload", data, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data;
};

export default upload;
