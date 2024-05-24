export const truncateStoreName  = (name: any) => name.length > 80 ? `${name.slice(0, 80)}...` : name;
