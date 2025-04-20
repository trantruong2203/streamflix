export const getOjectById = (data, id) => {
   return data?.find(e => e.id === id);
}

export const converDescription = (description) => {
      if (!description) return "";
      if (description.length > 50) {
         return description.slice(0, 50) + "...";
      }
      return description;
}

export const filterMovieByPlan = (data, plans, level) => {
   return data?.filter(e => {
      const plan = plans.find(p => p.id === e.planID);
      return plan?.level == level 
   })
};



export const filterMoviesByCategories = (movies, categories, categoryIds) => {
   if (!categoryIds || categoryIds.length === 0) return movies;
   
   return movies.filter(movie => {
      // Kiểm tra xem phim có chứa ít nhất một category trong danh sách categoryIds không
      return movie.listCate.some(categoryId => categoryIds.includes(categoryId));
   });
};

export const toDateString = (timestamp) => {
   if (!timestamp || !timestamp.seconds) return 'N/A';
   const date = new Date(timestamp.seconds * 1000);
   return date.toLocaleDateString();
 };
 
