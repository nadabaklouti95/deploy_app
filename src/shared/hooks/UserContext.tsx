import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserAccessRules } from "shared/services/accesRulesService";
import { getNavList, handleRouteBasedOnAccessRules } from "shared/services/taskService";

export interface UserContextType {
  user: any; 
  updateUser: (userData: any) => void; 
  accessRules: any; 
  accessRulesRoutes:any;
  accessRulesNav:any;
  accessRulesRouteWrite:any;
  accessRulesRouteExecute:any;
  updateReactContext:() => void; 
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => useContext(UserContext);

interface UserProviderInterface {
  children: any;
}

export const UserProvider: React.FC<UserProviderInterface> = ({ children }) => {
  const [accessRules, setAccessRules] = useState<any>(null);
  const [accessRulesRoutes, setAccessRulesRoutes] = useState<any>(null); // Initialize to null
  const [accessRulesRouteWrite, setAccessRulesRouteWrite] = useState<any>(null)
  const [accessRulesRouteExecute, setAccessRulesRouteExecute] = useState<any>(null)
  const [accessRulesNav, setAccessRulesNav] = useState<any>(null);
  const [user, setUser] = useState(null); // Add user state
  const [stateContext,setStateContext] = useState(false)
  
  const historyRef = useRef(useHistory());

  useEffect(() => {
    const storedAccessRules: any = localStorage.getItem('accessRules');
    const userToken = localStorage.getItem('token');
    const history:any = historyRef.current;

    if (userToken && (!storedAccessRules || storedAccessRules === "undefined")) {
      getUserAccessRules()
        .then(data => {
          if(data === "unauthorized"){
            history.push("/signin")
          }else{
            setAccessRules(data);
            let accessRoutes: any = handleRouteBasedOnAccessRules(data);
            let navList: any = getNavList(accessRoutes.read);
            setAccessRulesNav(navList);
            setAccessRulesRoutes(accessRoutes.read); // Update accessRulesRoutes
            setAccessRulesRouteWrite(accessRoutes.write)
            setAccessRulesRouteExecute(accessRoutes.execute)
            localStorage.setItem('accessRules', JSON.stringify(data));
            if(accessRoutes.read.length === 0){
              history.push("/error-pages/error-403")
            }
          }
          
        })
        .catch(error => {
          console.error("Error fetching access rule data:", error);
        });
    } else {
      let accessRoutes: any = handleRouteBasedOnAccessRules(JSON.parse(storedAccessRules));
      let navList: any = getNavList(accessRoutes.read);
      setAccessRulesNav(navList);
      setAccessRulesRoutes(accessRoutes.read); // Update accessRulesRoutes
      setAccessRules(JSON.parse(storedAccessRules));
      setAccessRulesRouteWrite(accessRoutes.write)
      setAccessRulesRouteExecute(accessRoutes.execute)
    }
  }, [user,stateContext]);

  // Function to set the user information
  const updateUser = (userData:any) => {
    setUser(userData);
  };

  const updateReactContext = () => {
    setStateContext(!stateContext)
  }

  return (
    <UserContext.Provider value={{ user, accessRules, updateUser, accessRulesRoutes, accessRulesNav, accessRulesRouteWrite, accessRulesRouteExecute,updateReactContext }}>
      {accessRulesRoutes ? ( 
        children
      ) : (
        <div></div> // Render a loading indicator or placeholder content
      )}
    </UserContext.Provider>
  );
};