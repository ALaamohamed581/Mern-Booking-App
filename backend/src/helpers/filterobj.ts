export const filterObj = (obj: any, ...allwoedFilds: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((field) => {
    if (allwoedFilds.includes(field)) {
      newObj[field] = obj[field];
    }
  });
  return newObj;
};
