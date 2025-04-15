import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseconfig";

export const handleClick = async (movie, isLoggedIn, plans, navigate) => {

    if (!isLoggedIn) {
        message.warning('Bạn cần đăng nhập để xem phim');
        return;
    }
    const status = await checkVipEligibility(isLoggedIn.id, plans, movie);
    if (status) {
        navigate(`/play-my-movie/${movie.id}`);
        return;
    }
    // const checkRentMovie = await checkIfMovieRented(isLoggedIn.id, movie.id);
    // if (checkRentMovie) {
    //     navigate(`/play-my-movie/${movie.id}`);
    //     return;
    // }
    const plan = plans.find(p => p.id === movie.planID);
    if (plan.level > 2) {
        navigate(`/payment/rent-movie/${movie.id}`);
    } else {
        navigate(`/main/vip`);
    }
};

// Chức năng kiểm tra xem người dùng có đủ điều kiện truy cập nội dung dựa trên cấp độ VIP hay không
export const checkVipEligibility = async (userId, plans, movie) => {
    try {
        // Fetch user's active subscription plans
        const userPlans = await getPlansByUser(userId, plans);
        if (userPlans == 0) {
            console.log("User does not have an active VIP subscription.");
            return false; // No active VIP plan
        }
        const movieLevel = plans.find(plan => plan.id === movie.planID).level;
        const status = userPlans >= movieLevel ? true : false;
        return status; // Trả về trạng thái eligibility
    } catch (error) {
        console.error("Error checking VIP eligibility:", error);
        return false; // Return false in case of error
    }
};

// Trả về level cao nhất của VIP theo id người dùng
export const getPlansByUser = async (idUser, plans) => {
    try {
      // Tạo truy vấn để lấy dữ liệu của người dùng dựa trên idUser
      const vipQuery = query(collection(db, "subscriptions"), where("userId", "==", idUser));
      const querySnapshot = await getDocs(vipQuery);
      // Lưu trữ thông tin VIP hợp lệ (chưa hết hạn)
      const vipData = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const currentDate = new Date();
        const expiryDate = data.expiryDate ? data.expiryDate.toDate() : null;
  
        // Chỉ lấy các gói VIP chưa hết hạn
        if (expiryDate && expiryDate > currentDate) {
          vipData.push({
            id: doc.id,
            ...data,
          });
        }
      });
  
      // Duyệt qua các plan và tìm VIP có level cao nhất dựa vào vipData
      const highestVipLevels = vipData.map(vip => {
        const planForVip = plans.find(plan => plan.id === vip.planId);
        return planForVip ? planForVip.level : null; // Không tìm thấy kế hoạch tương ứng
      });  
  
      // Tìm cấp độ cao nhất từ các cấp độ VIP đã lấy
      const maxVipLevel = highestVipLevels.reduce((highest, current) => {
        return current > highest ? current : highest;
      }, 0); // Bắt đầu với level thấp nhất là 0
  
      return maxVipLevel; 
    } catch (error) {
      console.error("Error fetching VIP plans:", error);
      return null; // Trả về null nếu có lỗi
    }
  };