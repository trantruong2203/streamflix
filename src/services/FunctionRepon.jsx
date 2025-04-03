export const getOjectById = (data, id) => {
   return data?.find(e => e.id == id);
}
export const converDescription = (description) => {
      if (description.length > 50) {
         return description.slice(0, 50) + "...";
      }
      return description;
}