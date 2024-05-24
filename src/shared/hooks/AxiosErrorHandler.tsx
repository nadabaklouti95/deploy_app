import { useContext,  useMemo } from 'react'
import jwtAxios from 'app/services/auth/jwt-auth/jwt-api';
import { UserContext, UserContextType } from './UserContext';

interface AxiosErrorHandlerInterface {
    children: any;
  }

const AxiosErrorHandler: React.FC<AxiosErrorHandlerInterface>  = ({ children }) => {
    const {updateReactContext} = useContext(UserContext) as UserContextType;

    useMemo(() => {

        jwtAxios.interceptors.response.use(
        (res) => res,

        (err) => {
            if (err.response && err.response.status === 401) {
            localStorage.clear();
            window.location.href = "/signin";
            }
            if (err.request && err.request.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("accessRules");
            window.location.href = "/signin";
            }
            if (err.response && err.response.status === 403) {
            localStorage.removeItem("accessRules");
            updateReactContext()
            }
            return Promise.reject(err);
        }
        );
      }, [updateReactContext])

    return children
}

export default AxiosErrorHandler

