export const checkSelectedItem = (values:any,element:any) =>{
    if(values === undefined){
      return false
    }else{
      return values.indexOf(element) > -1
    }
  }