import { addDocument, deleteDocument, updateDocument } from "./firebaseService";

export const getOjectById = (data, id) => {
   return data?.find(e => e.id === id);
}

export const filterById  = (data, id , title) => {
   return data?.filter(e => e[title] === id);
}

export const converDescription = (description) => {
   if (!description) return "";
   if (description.length > 50) {
      return description.slice(0, 50) + "...";
   }
   return description;
};



export const formatDate = (timestamp) => {
   if (!timestamp) return '';
   const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
   return date.toLocaleDateString('vi-VN', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
       hour: '2-digit',
       minute: '2-digit'
   });
}

export const filterMovieByPlan = (data, plans, level) => {
   if (!data || !plans || level === undefined) return [];
   
   return data.filter(e => {
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
   if (!account) return false;
   const favoriteMovie = favorites?.find(favorite => favorite.accountId === account.id && favorite.movieId === movie.id);
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
          await  updateDocument("watchHistory", {...checkHis, episodeId: episodeId, createAt: new Date()})
      }else {
          await addDocument("watchHistory", {
            accountId : account.id,
            movieId : movie.id,
            episodeId : episodeId,
            createAt: new Date()
          })
      }
      console.log("vfdbdb", movie);
      
      await updateDocument("movies",{ ...movie , viewsCount: movie.viewsCount + 1 });
};

export const checkMovieList = (account, movie, list) => {
   if(!account) return false;
   const movieList = list?.find( l => l.accountId === account.id && l.movieId === movie.id)
   return movieList
};

export const moviesList = async(account, movie, list, notification) => {
   try {
      if (!account) {
         notification("Vui lòng đăng nhập để thực hiện chức năng này", "error");
         return;
      }
      const existingMovie = checkMovieList(account, movie, list);
      if (existingMovie) {
         await deleteDocument("movieList", existingMovie);
         notification("Đã xoá khỏi danh sách xem sau", "success");
      } else {
         await addDocument("movieList", {
            accountId: account.id,
            movieId: movie.id,
         });
         notification("Thêm vào danh sách xem sau thành công", "success");
      }
   } catch (error) {
      notification("Có lỗi xảy ra, vui lòng thử lại", "error");
      console.error("Error in moviesList:", error);
   }
};