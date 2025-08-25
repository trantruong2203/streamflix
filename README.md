# 🎬 Streamflix - Ứng Dụng Streaming Phim

## 📋 Mô Tả Dự Án

Streamflix là một ứng dụng web streaming phim hiện đại được xây dựng bằng React, cung cấp trải nghiệm xem phim trực tuyến với giao diện người dùng thân thiện và hệ thống quản lý nội dung toàn diện.

## ✨ Tính Năng Chính

### 🎥 Phía Người Dùng (Client)
- **Trang chủ**: Hiển thị phim nổi bật, danh mục và đề xuất cá nhân
- **Tìm kiếm phim**: Tìm kiếm theo tên, thể loại, diễn viên
- **Xem phim**: Phát video với chất lượng cao
- **Quản lý tài khoản**: Đăng ký, đăng nhập, cập nhật thông tin cá nhân
- **Thư viện yêu thích**: Lưu và quản lý phim yêu thích
- **Thuê phim**: Hệ thống thuê phim với các gói khác nhau
- **Lịch sử xem**: Theo dõi phim đã xem
- **Bình luận**: Tương tác với cộng đồng người xem

### 🔧 Phía Quản Trị (Admin)
- **Dashboard**: Thống kê tổng quan về người dùng, phim, doanh thu
- **Quản lý phim**: Thêm, sửa, xóa phim và tập phim
- **Quản lý người dùng**: Quản lý tài khoản người dùng
- **Quản lý nội dung**: Quản lý diễn viên, đạo diễn, nhân vật
- **Quản lý thể loại**: Phân loại phim theo thể loại
- **Quản lý gói VIP**: Cấu hình các gói đăng ký và tính năng
- **Hỗ trợ khách hàng**: Hệ thống chat hỗ trợ trực tuyến

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 18** - Thư viện JavaScript cho giao diện người dùng
- **Vite** - Build tool nhanh và hiện đại
- **CSS3** - Styling và responsive design
- **Context API** - Quản lý state toàn cục

### Backend & Database
- **Firebase** - Backend as a Service
  - Firestore Database
  - Authentication
  - Storage
  - Hosting
- **Cloudinary** - Quản lý hình ảnh và video

### Công Cụ Phát Triển
- **ESLint** - Kiểm tra chất lượng code
- **Vercel** - Deployment và hosting

## 📁 Cấu Trúc Dự Án

```
streamflix/
├── src/
│   ├── components/          # Các component tái sử dụng
│   │   ├── admin/          # Component dành cho admin
│   │   └── client/         # Component dành cho người dùng
│   ├── pages/              # Các trang của ứng dụng
│   │   ├── admin/          # Trang quản trị
│   │   └── client/         # Trang người dùng
│   ├── context/            # Context providers
│   ├── services/           # API services
│   └── utils/              # Tiện ích và hằng số
├── public/                 # Tài nguyên tĩnh
├── image/                  # Hình ảnh dự án
└── config/                 # Cấu hình Firebase và Cloudinary
```

## 🚀 Cài Đặt Và Chạy Dự Án

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
git clone [URL_REPOSITORY]
cd streamflix
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình môi trường
Tạo file `.env` trong thư mục gốc và cấu hình:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### Bước 4: Chạy dự án
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 📱 Tính Năng Nổi Bật

### 🎯 Hệ Thống Đề Xuất Thông Minh
- Phân tích hành vi xem phim
- Đề xuất phim dựa trên sở thích
- Cá nhân hóa trải nghiệm người dùng

### 🔒 Bảo Mật Cao
- Xác thực Firebase
- Phân quyền người dùng
- Bảo vệ nội dung premium

### 📊 Dashboard Quản Trị
- Thống kê real-time
- Biểu đồ trực quan
- Quản lý người dùng hiệu quả

### 💬 Hỗ Trợ Khách Hàng
- Chat trực tuyến
- Hệ thống FAQ
- Phản hồi nhanh chóng

## 🌟 Giao Diện Người Dùng

- **Responsive Design**: Tương thích mọi thiết bị
- **Dark/Light Theme**: Tùy chọn giao diện
- **Smooth Animations**: Hiệu ứng mượt mà
- **Intuitive Navigation**: Điều hướng trực quan

## 📈 Roadmap

### Phiên Bản Hiện Tại (v1.0)
- ✅ Hệ thống đăng ký/đăng nhập
- ✅ Quản lý phim và tập phim
- ✅ Hệ thống thuê phim
- ✅ Dashboard admin
- ✅ Hỗ trợ khách hàng

### Phiên Bản Tương Lai (v2.0)
- 🔄 Hệ thống đánh giá và xếp hạng
- 🔄 Phát video offline
- 🔄 Ứng dụng mobile
- 🔄 Tích hợp thanh toán
- 🔄 Hệ thống gợi ý AI

---

⭐ Nếu dự án này hữu ích, hãy cho chúng tôi một ngôi sao trên GitHub!
