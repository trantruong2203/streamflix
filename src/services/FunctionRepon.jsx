import { addDocument, deleteDocument, updateDocument } from "./firebaseService";

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

export const checkFavoriteMovie = (account, movie, favorites) => {
   const favoriteMovie = favorites?.find(favorite => favorite.accountId === account.id && favorite.movieId === movie.id);
   console.log(favoriteMovie);
   return favoriteMovie;
}
export const getFavoriteMovie = async (account, movie, favorites, notification) => {
   if (!account) {
      notification("Vui lòng đăng nhập để thực hiện chức năng này", "error");
      return;
   }
   if (checkFavoriteMovie(account, movie, favorites)) {
      await deleteDocument("favoriteMovies", checkFavoriteMovie(account, movie, favorites));
      notification("Đã xoá khỏi danh sách yêu thích", "success");
   } else {
      await addDocument("favoriteMovies", {
         accountId: account.id,
         movieId: movie.id,
      });
      notification("Thêm vào danh sách yêu thích thành công", "success");

   }
}

export const watchHistory  = async (account,movie,watchHis,episodeId) => {
     const checkHis = watchHis?.find(w => w.accountId === account.id && w.movieId === movie.id);
      if(checkHis) {
          await  updateDocument("watchHistory", {...checkHis, episodeId: episodeId})
      }else {
          await addDocument("watchHistory", {
            accountId : account.id,
            movieId : movie.id,
            episodeId : episodeId
          })
      }

}