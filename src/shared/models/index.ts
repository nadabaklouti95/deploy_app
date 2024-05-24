export interface csProperty{
    csPropertyKeyViewDTOList :propertyKey[],
    pagesNumber:any
}

export interface propertyKey{
    key:string,
    keyID: number,
    type: string,
    contextKeys: contextKeys[],
    dirty:any
}

export interface contextKeys{
    value: string,
    context: context[]
}

export interface context{
    key: string,
    values: string[]
}