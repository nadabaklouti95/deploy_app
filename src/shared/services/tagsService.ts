import jwtAxios from "app/services/auth/jwt-auth/jwt-api";
import { TagProps } from "modules/tags/TagGraph";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {handleErrors} from "../constants/HandleErrors";

export const getTags = async (id: number)=>{
    if (id !== undefined) {
    return await jwtAxios.get<any>(`/cs-tag/get-all-tags-id-name?storeId=${id}`).then((response:any)=>{
        if (response.status === 200) {
         return response.data
        }
      }).catch(function (error) {
        handleErrors(error,true,null)

      })
    }
}


export const LoadTagsScreen = (id: number) => {
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
      await jwtAxios.get<any>(`/cs-tag/get-all-tags?storeId=${config.data.id}`).then((response:any)=>{
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


export const LoadTagsRedux = (id: number) => {
    const [taglist, setTaglist] = useState<TagProps[]>([]);
    const [loadingTags, setLoadingTags] = useState(false);
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
            setTaglist(response.data);
          }
        }).catch(function (error) {
          handleErrors(error,true,null)

        }).finally(()=>{
          isMounted && setLoadingTags(true);
        })
      };
      tagList(id);
      const cleanup = () => {
        isMounted = false;
      };
      return cleanup;
      }
    }, [id, dispatch]);
    return { taglist, loadingTags };
  };

 

export const getListModeTags = async (requestedData:any,page:any,size:any) => {
  let storeId = requestedData.storeId
  return await jwtAxios.post<any>(`cs-tag/get-all-tags-list-mode?page=${page}&size=${size}&storeId=${storeId}`,requestedData).then((response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      return response.data
    }
  })
}

export const getGraphModeTags = async (storeId:any) => {
  return await jwtAxios.get<any>(`cs-tag/get-all-tags-graph-mode?storeId=${storeId}`).then((response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      return response.data
    }
  })
}

export const deleteTag = async (IdTag:any) =>{
  return jwtAxios.delete(`cs-tag/delete-tag?tagId=${IdTag}`).then((response:any)=>{
   return response
  }).catch(function (error) {
    handleErrors(error,true,null)

  })
}


export const updateTag = async (value:any) =>{
  return await jwtAxios.post(`/cs-tag/update-tag?tagId=${value.id}`, value).then(async (response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      return response
    }
  })
}

export const mergeTag = async (tagId:any,value:any) =>{
  return await jwtAxios.post(`cs-merge-tag/merge?tagId=${tagId}`, value).then(async (response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      return response
    }
  })
}

export const getMergeTagList = async (value:any,size:any,page:any,storeId:any) =>{
  let requestData:any = value
  requestData.storeId = storeId
  return await jwtAxios.post(`cs-merge-tag/get-merge-tag-tasks-by-filter?storeId=${storeId}&size=${size}&page=${page}`, requestData).then(async (response:any)=>{
    if (response && (response.status === 200 || response.status === 201)) {
      return response.data
    }
  })
}

export const getTagsStatistics = async (id:any)=> {
  return await jwtAxios.get<any>(`cs-tag/get-tag-statistics?tagId=${id}`).then((response:any)=>{
      if (response && response.status === 200) {
        return response.data
      }
  })
}

/*export const getNextTags = async(tagId: any) => {

  return await jwtAxios.get<any>(`/cs-tag/get-next-tags?tagId=${tagId}`)
      .then((response:any)=>{
        if (response && (response.status === 200 || response.status === 201)) {
          return response.data
        }
      }).catch (function (error) {
        let notify
        const { status, data } = error.response;
        if (status === 492 || status === 491 || status === 490 || status === 401 || status === 403) {
          notify = () => toast.success(data.errors[0], {autoClose: 3000, theme: "colored", type: "error"});
          toast.dismiss();
          notify();
        }
        else {
          notify = () => toast.success(`Error ${status} occurred, please contact your administrator!`, {autoClose: 3000, theme: "colored", type: "error"});
          toast.dismiss();
          notify();
        }
        console.log(error)
      })
  }*/



