export const getOjectById = (data, id) => {
   return data?.find(e => e.id == id);
}
export const converDescription = (description) => {
      if (description.length > 50) {
         return description.slice(0, 50) + "...";
      }
      return description;
}

export const filterMovieByPlan = (data, plans, level) => {

   return data?.filter(e => {
      const plan = plans.find(p => p.id == e.planID);
       return plan?.level <= level 
   })
};