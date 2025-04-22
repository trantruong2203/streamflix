import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseconfig";

export const handleClick = async (movie, isLoggedIn, plans, navigate, notification) => {
    if (!isLoggedIn) {
        notification('Bạn cần đăng nhập để xem phim', 'warning');
        console.log("Bạn cần đăng nhập để xem phim");
        return;
    }

    if (!movie.planID) {
        notification('Phim không có thông tin gói dịch vụ', 'error');
        return;
    }

    const status = await checkVipEligibility(isLoggedIn.id, plans, movie);
    if (status) {
        navigate(`/play-my-movie/${movie.id}`);
        return;
    }
    
    const checkRentMovie = await checkIfMovieRented(isLoggedIn.id, movie.id);
    if (checkRentMovie) {
        navigate(`/play-my-movie/${movie.id}`);
        return;
    }
    
    const plan = plans.find(p => p.id === movie.planID);
    if (!plan) {
        notification.error('Không tìm thấy thông tin gói dịch vụ cho phim này');
        console.error("Plan not found for this movie");
        return;
    }
    
    if (plan.level > 2) {
        navigate(`/payment/rent-movie/${movie.id}`);
    } else {
        navigate(`/main/vip`);
    }
};

// chức năng kiểm tra người dùng đa thuê phim hay chưa
export const checkIfMovieRented = async (userId, movieId) => {
    const rentMoviesQuery = query(collection(db, "rentMovies"), where("userId", "==", userId));
    const rentMoviesSnapshot = await getDocs(rentMoviesQuery);
    return !rentMoviesSnapshot.empty && rentMoviesSnapshot.docs.some(doc => doc.data().movieId === movieId);
};
 
// Chức năng kiểm tra xem người dùng có đủ điều kiện truy cập nội dung dựa trên cấp độ VIP hay không
export const checkVipEligibility = async (userId, plans, movie) => {
    try {
        if (!movie.planID) {
            console.log("Movie does not have a plan ID");
            return false;
        }

        // Fetch user's active subscription plans
        const userPlans = await getPlansByUser(userId, plans);
        
        // Kiểm tra nếu userPlans là null hoặc 0
        if (userPlans === null || userPlans === 0) {
            console.log("User does not have an active VIP subscription.");
            return false; // No active VIP plan
        }

        const moviePlan = plans.find(plan => plan.id === movie.planID);
        if (!moviePlan) {
            console.log("Movie plan not found");
            return false;
        }

        const movieLevel = moviePlan.level;
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
        if (!idUser) {
            console.error("User ID is required");
            return 0;
        }
        
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
  
        // Nếu không có gói VIP nào hợp lệ
        if (vipData.length === 0) {
            return 0;
        }
  
        // Duyệt qua các plan và tìm VIP có level cao nhất dựa vào vipData
        const highestVipLevels = vipData.map(vip => {
            const planForVip = plans.find(plan => plan.id === vip.planId);
            return planForVip ? planForVip.level : 0; // Trả về 0 nếu không tìm thấy kế hoạch tương ứng
        });  
  
        // Tìm cấp độ cao nhất từ các cấp độ VIP đã lấy
        const maxVipLevel = highestVipLevels.reduce((highest, current) => {
            return current > highest ? current : highest;
        }, 0); // Bắt đầu với level thấp nhất là 0
  
        return maxVipLevel; 
    } catch (error) {
        console.error("Error fetching VIP plans:", error);
        return 0; // Trả về 0 nếu có lỗi
    }
};

