import {toast} from "react-toastify";

export const toastNotify = (type:any,content:any,autoClose:any) =>{
    const notify = () => toast.success(content, {autoClose: autoClose, theme: "colored", type: type});
    toast.dismiss();
    notify();
}
