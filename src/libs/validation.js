import toast from "./toast";

export const signUpValidation = (data) => {
    const emailPattern = /[a-zA-Z0-9_+-.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}/;
    const { email, password, username, confirm } = data;
    if (email == "") {
        return toast.warning("Please Input Email Field");
    } else if (!emailPattern.test(email)) {
        return toast.warning("Please Type your Email like this Ex: chrismore@gmail.com");
    } else if (username == "") {
        return toast.warning("Please Input Name Field");
    } else if (password == "") {
        return toast.warning("Please Input Password Field");
    } else if (password != confirm || confirm == "") {
        return toast.warning("Please Confirm Your Password");
    } else return true;
};

export const signInValidation = (data) => {
    const emailPattern = /[a-zA-Z0-9_+-.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}/;
    if (!emailPattern.test(data.email)) return toast.warning("Please Type your Email like this Ex: chrismore@gmail.com");
    else if (data.email == "") return toast.warning("Please Input Your Email");
    else if (data.password == "") return toast.warning("Please Input Password Field");
    else return true;
};
