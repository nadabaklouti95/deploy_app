import jwtAxios from "../../app/services/auth/jwt-auth/jwt-api";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "./Common";
import { AppActions } from "../../types";
import { Dispatch } from "redux";
import { GET_STORE } from "../../types/actions/Store.actions";
import React, { useEffect } from "react";

import { TagProps } from "modules/tags/TagGraph";
import { useDispatch } from "react-redux";
import { csProperty } from "shared/models";
import {toastNotify} from "../../shared/constants/ToastNotify";
import {handleErrors} from "../../shared/constants/HandleErrors";

// import { useHistory } from "react-router-dom";


export const loadStore = () => {
  return async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
    try {
      const res = await jwtAxios.get("cs-store/get-stores");
      const stores = res.data;
      dispatch(fetchSuccess());

      dispatch({
        type: GET_STORE,
        storeslist: stores,
      });
    } catch (err:any) {
      
      if (
        err.response.data.status !== 491 &&
        err.response.data.status !== 490
      ) {
        dispatch(fetchStart());
        dispatch(
          fetchError(
            `  ${err.response.data.status} occurred, please contact your administrator.` as string
          )
        );
      }
    }
  };
};

export const saveStore = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(showMessage("Created successfully"));
  };
};
export const UpdateStore = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(showMessage("Updated successfully"));
  };
};
export const saveStorefailed = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(fetchError("Error while saving the store"));
    // redirect()

    // let history = useHistory();
    // history.push("/store");
  };
};

export const failedEmptyValues = (empty: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    if (empty.length === 1) {
      dispatch(
        fetchError(
          `No context values were found for context key :  ${empty[0].name}.`
        )
      );
    }
    if (empty.length > 1) {
      let arr = [];
      for (let i = 0; i < empty.length; i++) {
        arr.push(empty[i].name);
      }
      var showKeysSpace = arr.join(", ");

      dispatch(
        fetchError(
          ` No context values were found for context keys : ${showKeysSpace}.`
        )
      );
    }
  };
};

export const SuccessContext = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(showMessage("Context Updated successfully"));
    // redirect()

    // let history = useHistory();
    // history.push("/store");
  };
};
export const deletestorefailed = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(fetchError("Error while deleting the store"));
  };
};

export const editStorefailed = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());

    dispatch(fetchError("Error while Updating the store"));
  };
};

export const LoadStorebyid = (id: number) => {
  const [context, setContext] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;

    const fetchData = async (Id: number) => {
      if (id !== undefined) {
        try {
          const res = await jwtAxios.get(`cs-context/get-contexts-by-store?storeId=${Id}`);
          if (res && res.status === 200) {
            setContext(res.data);
          }
        } catch (err:any) {
          if (
            err.response.data.status !== 491 &&
            err.response.data.status !== 490
          ) {
            dispatch(fetchStart());
            dispatch(
              fetchError(
                `  ${err.response.data.status} occurred, please contact your administrator.` as string
              )
            );
          }
        } finally {
          isMounted && setLoading(true);
        }
      }
    };

    fetchData(id);

    const cleanup = () => {
      isMounted = false;
    };

    return cleanup;
  }, [id, dispatch]);

  return { context, loading };
};

export const LoadTags = (id: number) => {
  const [taglist, setTaglist] = React.useState<TagProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== undefined) {
      let isMounted = true;
      const tagList = async (id: number) => {
        const config = {
          data: {
            id: id,
          },
        };
      await jwtAxios.get<any>(`/cs-tag/get-all-tags-id-name?storeId=${config.data.id}`).then((response:any)=>{
        if (response && response.status === 200) {
          setTaglist(response.data.reverse());
        }
      }).catch(function (error) {
        handleErrors(error,true,null)

      }).finally(()=>{
        isMounted && setLoading(true);
      })
    };
    tagList(id);
    const cleanup = () => {
      isMounted = false;
    };
    return cleanup;
    }
  }, [id, dispatch]);

  return { taglist, loading };
};

export const LoadNextags = (id: number) => {
  const [nexttaglist, setNextTaglist] = React.useState<TagProps[]>([]);
  const [loadingNext, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let isMounted = true;
    const tagList = async (id: number) => {
      const config = {
        data: {
          id: id,
        },
      };
      await jwtAxios.get<any>("/cs-tag/get-next-tags", config).then((response:any)=>{
        if (response && response.status === 200) {
          setNextTaglist(response.data);
        }
      }).catch(function (error) {
        handleErrors(error,true,null)

      }).finally(()=>{
        isMounted && setLoading(true);
      }) 
    };
    tagList(id);

    const cleanup = () => {
      isMounted = false;
    };

    return cleanup;
  }, [id, dispatch]);

  return { nexttaglist, loadingNext };
};





export const LoadPropertiesByFilter = (idTag:any,RequestData:any) =>{
  const [propertiesList, setPropertiesList] = React.useState<any>([]);
  const [loadingList, setLoadingList] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (idTag !== undefined || idTag !== null) {
      let isMounted = true;
      const propertiesList = async (id: any) => {
        RequestData.tagId = id?.id
        await jwtAxios.post<any>(`/cs-property/get-properties-by-filter?page=0&size=50&tagId=${id?.id}`,RequestData).then((response:any)=>{
          if (response && response.status === 200) {
            setPropertiesList(response.data);
          }
        }).catch(function (error) {
          handleErrors(error,true,null)

        }).finally (()=>{
          isMounted && setLoadingList(true);
        })      
      };
      propertiesList(idTag);
      const cleanup = () => {
        isMounted = false;
      };
      return cleanup;
    }
  }, [idTag,RequestData, dispatch]);

  return { propertiesList,loadingList };
}

export const LoadProperty = (idTag:any,RequestData:any,page:number,size:number) =>{
  const [property, setProperty] = React.useState<csProperty>({pagesNumber:'0',csPropertyKeyViewDTOList:[]});
  const [loadingProperties, setLoadingProperties] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (idTagFetch:any,RequestDataFetch:any,pageFetch:any,sizeFetch:any) => {
      if (idTagFetch !== undefined || idTagFetch !== null  ) {        
        RequestDataFetch.tagId = idTagFetch?.id
        if(Object.keys(RequestDataFetch).findIndex((element:any)=> element === "tagId") !== (-1) && RequestDataFetch.tagId !== undefined ){
          let tagId = RequestDataFetch.tagId
          await jwtAxios.post<any>(`/cs-property/get-properties-by-filter?page=${pageFetch}&size=${sizeFetch}&tagId=${tagId}`,RequestDataFetch)
            .then((response:any)=>{
              if (response && response.status === 200) {
                setProperty(response.data);
              }
            }).catch(function (error) {
                handleErrors(error,true,null)

            }).finally (()=>{
              isMounted && setLoadingProperties(true);
            })      
          }
        }
        else{
          setProperty({pagesNumber:'0',csPropertyKeyViewDTOList:[]});
          setLoadingProperties(true)
        }
    };

    fetchData(idTag,RequestData,page,size);

    const cleanup = () => {
      isMounted = false;
    };

    return cleanup;
  }, [ dispatch,idTag,RequestData,page,size]);

  return { property, loadingProperties };
}

export const LoadToken = (storeId:any) =>{
  const [tokenList, setTokenList] = React.useState<any>([]);
  const [loadingToken, setLoadingToken] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async (id:any) => {
      if (storeId !== undefined && storeId !== null  ) {
        await jwtAxios.get<any>(`/cs-token/get-tokens-by-store?storeId=${id}`).then((response:any)=>{
          if (response && response.status === 200) {
            setTokenList(response.data);
          }
        }).catch(function (error) {
          handleErrors(error,true,null)
        })
      }
      else{
        setTokenList([]);
        setLoadingToken(true)
      } 
    }
    fetchData(storeId);
    const cleanup = () => {
    };
    return cleanup;
  }, [ dispatch,storeId]);
  return { tokenList, loadingToken };
}

export const LoadUpload = (RequestDataFetch:any,tagId:any,page:any,size:any) =>{
  const [uploadLists, setUploadLists] = React.useState<any>([]);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async (id:any) => {
      if (tagId !== undefined && tagId !== null  ) {
        RequestDataFetch.tagId = tagId.id
        return await jwtAxios.post<any>( `/cs-upload/get-uploaded-files-by-filter?page=${page}&size=${size}&tagId=${tagId.id}`,RequestDataFetch).then(
          (response:any)=>{
            if (response && response.status === 200) {
              setUploadLists(response.data);
            }
          }
        ).catch(function (error) {
          handleErrors(error,true,null)

        })
      }
      else{
        setUploadLists([]);
        setLoadingUpload(true)
      }
    }
    fetchData(tagId);
    const cleanup = () => {
    };
    return cleanup;
  }, [ dispatch,RequestDataFetch,tagId,page,size]);

  return { uploadLists, loadingUpload };
}






export const getTags = async (id: number) =>{
  const config = {
    data: {
      id: id,
    },
  };
  return await jwtAxios.get<any>(`/cs-tag/get-all-tags?storeId=${config.data.id}`).then((response:any)=>{
    if (response && response.status === 200) {
      return response.data.reverse();
    }
  }).catch(function (error) {
    handleErrors(error, true, null)
  })
}

export const LoadmaxTags = (selectedId:any) => {
  const [max, setmax] = React.useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    //*let isMounted = true;
    const tagList = async () => {
      if(selectedId !== undefined){
        await jwtAxios.get(`cs-tag/get-max-tags-number?storeId=${selectedId.id}`).then((response:any)=>{
          if (response && response.status === 200) {
            setmax(response.data);
          }
        }).catch(function (error) {
          handleErrors(error, true, null)
        })
      }
    };
    tagList();
  }, [dispatch, selectedId]);

  return { max };
};

export const getTokens = async (storeId:any,filterName:any) =>{
  if (storeId !== undefined && storeId !== null  ) {
    return await jwtAxios.get<any>(`/cs-token/get-tokens-by-filter?storeId=${storeId}&name=${filterName}`).then((response:any)=>{
      if (response && response.status === 200) {
        return response.data
      }
    }).catch(function (error) {
      handleErrors(error, true, null)
    })
  }
}

export const getUpload = async (RequestDataFetch:any,tagId:any,page:any,size:any) =>{
  if (tagId !== undefined && tagId !== null  ) {
    RequestDataFetch.tagId = tagId
    return await jwtAxios.post<any>( `/cs-upload/get-uploaded-files-by-filter?page=${page}&size=${size}&tagId=${tagId}`,RequestDataFetch).then(
        (response:any)=>{
          if (response && response.status === 200) {
            return {status:200,value:response.data}
          }
        }).catch(function (error) {
          handleErrors(error, true, null)
    })
  }
}


export const getPublishList = async (tagId:any,page:any,size:any) =>{

  if (tagId !== undefined && tagId !== null  ) {
    let data = {
      tagId : tagId
    }
    return await jwtAxios.post<any>( `/cs-publication/get-published-properties-tasks-by-filter?page=${page}&size=${size}&tagId=${tagId}`,data).then(
        (response:any)=>{
          if (response && (response.status === 200 || response.status === 201)) {
            return {status:200,value:response.data}
          }
        }).catch(function (error) {
          handleErrors(error, true, null)
    })
  }
}


export const FilterPublish = async (filterData:any,page:any,size:any) =>{
  let tagId = filterData.tagId
  return await jwtAxios.post<any>( `/cs-publication/get-published-properties-tasks-by-filter?page=${page}&size=${size}&tagId=${tagId}`,filterData).then(
      (response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
          return {status:200,value:response.data}
        }
      }).catch(function (error) {
        handleErrors(error, true, null)
  })

}


export const fetchUser = async (page:any,size:any) => {
  return await jwtAxios.get<any>( `/cs-user/get-users?page=${page}&size=${size}&userLogin`).then(
      (response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
          return response.data
        }
      }).catch(function (error) {
        handleErrors(error, true, null)
  })
};


export const fetchUserByFilter = async (userLogin:any,page:any,size:any) => {
  return await jwtAxios.get<any>( `/cs-user/get-users?page=${page}&size=${size}&userLogin=${userLogin}`).then(
      (response:any)=>{
        if (response.status === 200 || response.status === 201) {
          return response.data
        }
      }).catch(function (error) {
        handleErrors(error, true, null)
    })
};

export const getPropertyByFilter = async (idTag:any,RequestData:any,page:any,size:any) =>{
  if (idTag !== undefined || idTag !== null) {
    RequestData.tagId = idTag?.id
    return await jwtAxios.post<any>(`/cs-property/get-properties-by-filter?page=${page}&size=${size}&tagId=${idTag?.id}`,RequestData).then((response:any)=>{
      if (response.status === 200) {
        return JSON.stringify(response.data)
      }
    }).catch(function (error:any) {
      handleErrors(error, true, null)
    })
  }
}

export const getAutocomplete = async (requestData:any) => {
   return await jwtAxios.post(`/cs-property/auto-complete?tagId=${requestData.tagId}`,requestData).then((response:any)=>{
     if (response.status === 200) {
       return response.data
     }
   }).catch(function (error) {
     handleErrors(error, true, null)
   })

}


export const publishProperty = async (requestData: any, tagId: any) => {
  return await jwtAxios
      .post<any>(`/cs-publication/publish-property?tagId=${tagId.id}`, requestData)
      .then(async (response: any) => {
        if (response.status === 201) {
          setTimeout(() => {
            toastNotify ("success",`Property published`,3000)
          }, 500);
          return response;
        }
      })
      .catch(function (error) {
        handleErrors(error, true, null)

      })
};

/*

export const getUpload = async (RequestDataFetch:any,tagId:any,page:any,size:any) =>{
  if (tagId !== undefined && tagId !== null  ) {
    RequestDataFetch.tagId = tagId
    return await jwtAxios.post<any>( `/cs-upload/get-uploaded-files-by-filter?page=${page}&size=${size}&tagId=${tagId}`,RequestDataFetch).then(
      (response:any)=>{
        if (response && response.status === 200) {
          return {status:200,value:response.data}
        }
    }).catch(function (error) {
      let notify:any
      if(error.response !== undefined){
        if (error.response && (error.response.status === 500 || error.response.status === 491 || error.response.status === 490)) {
          notify = () => toast.success(`Erreur ${error.response.data.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
          toast.dismiss();
          notify();
        }
      }
      if(error.response === undefined){
        if (error.request &&( error.request.response.status === 500 || error.request.response.status === 491 || error.request.response.status === 490)) {
          notify = () => toast.success(`Erreur ${error.request.response.status} occurred, please contact your administrator!`,{autoClose: 3000,theme :"colored",type:"error" });
          toast.dismiss();
          notify();
        }
      }
      else {
        console.log(error)
      }
    })
  }
}


}*/

