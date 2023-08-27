export const formatTimestampsInObject = (obj: any, keys: string[]) => {
  const formattedObj: any = { ...obj };
  keys.forEach((key) => {
    if (obj[key]) {
      formattedObj[key] = formatDate(obj[key].toISOString());
    }
  });
  return formattedObj;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
