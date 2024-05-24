import {toastNotify} from "./ToastNotify";

export const handleErrors = async (error:any, isErrorToast:any, handleError:any, valueId?:any) => {

    if (error.response && error.response.status) {
        const { status, data } = error.response;

        if (status === 492 || status === 491 || status === 490 || status === 401 || status === 403) {
            const errorResponse = data.errors;
            const errorMessage = errorResponse[0];
            if (isErrorToast) {
                toastNotify("error", errorMessage, 3000);
            }
            else handleError(valueId ? {value:errorResponse,id:valueId} : errorResponse);

        }
        else if (status === 500) {
            toastNotify("error", `Error ${status} occurred, please contact your administrator!`, 3000);
        }
        else toastNotify("error", `Error ${status} occurred, please contact your administrator!`, 3000);

    }
    else toastNotify("error", `${error.message}`, 5000);


};
