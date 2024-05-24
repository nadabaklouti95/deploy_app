import { toast } from "react-toastify";

export const notification = (message:any) =>{
    let notify 
    notify = (value : String) => toast.success(message,{autoClose: 3000,theme :"colored",type:"success" });
      toast.dismiss();
      notify("" as string);
  }