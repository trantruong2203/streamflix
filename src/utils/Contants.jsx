import { GoFileMedia } from "react-icons/go";
import { RiVipDiamondFill } from "react-icons/ri";
import { GiEngagementRing } from "react-icons/gi";
import { FaChromecast } from "react-icons/fa";

export const listMenu = [
    {
        id: 1,
        title: "Media Management",
        icon: <GoFileMedia />,
        items: [
            {
                id: 1,
                title: "Movies",
                path: "/media_management/movie"
            },
            {
                id: 2,
                title: "Episodes",
                path: "/media_management/episodes"
            },
            {
                id: 3,
                title: "Trailer",
                path: "/media_management/trailer"
            }
        ]
    },
    {
        id: 2,
        title: "Vip",
        icon: <RiVipDiamondFill />,
        items: [
            {
                id: 1,
                title: "Package",
                path: "/vip/package"
            },
            {
                id: 2,
                title: "Feature",
                path: "/vip/feature"
            },
            {
                id: 3,
                title: "Plans",
                path: "/vip/plans"
            }
        ]
    },
    {
        id: 3,
        title: "Engagement Pages",
        icon: <GiEngagementRing />,
        items: [
            {
                id: 1,
                title: "Like ",
                path: "/engagement_pages/like"
            },
            {
                id: 2,
                title: "Watchlist ",
                path: "/engagement_pages/watchlist  "
            },
            {
                id: 3,
                title: "Comment",
                path: "/engagement_pages/comment "
            }
        ]
    },
    {
        id: 4,
        title: "Cast & Crew",
        icon: <FaChromecast />,
        items: [
            {
                id: 1,
                title: "Authors",
                path: "/cast&crew/authors"
            },
            {
                id: 2,
                title: "Characters",
                path: "/cast&crew/characters"
            },
            {
                id: 3,
                title: "Actors",
                path: "/cast&crew/actors"
            }
        ]
    }

];

export const listMenuClient = [
    { path: "/", label: "Trang Chủ" },
    { path: "/main/categories", label: "Thể Loại" },
    {
        path: "/main/free-movies",
        label: "Phim Miễn Phí",
        children: [
            { path: "/main/newmovie", label: "Phim Mới" },
            { path: "/main/free-movie/phim-le", label: "Phim Lẻ" },
            { path: "/main/free-movie/phim-bo", label: "Phim Bộ" },
            { path: "/main/free-movie/phim-anime", label: "Phim Anime" },
        ]
    },
    { path: "/main/actors", label: "Hỗ Trợ" },
    { path: "/main/tim-kiem", label: "Tìm Kiếm" },
];

export const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#A28FFB', // Lavender
    '#F765A3', // Pink
    '#FF6B6B', // Coral
    '#4CAF50', // Green
    '#FFD700', // Gold
    '#8A2BE2', // BlueViolet
    '#FF4500', // OrangeRed
    '#20B2AA'  // LightSeaGreen
  ];

export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};
const SECRET_KEY = "220396";
const upload_preset = "truong";
const cloud_name = "dao84jp9k";
const apiKey = '363671622292875';
const apiSecret = 'GbmeEupa0n55XTJXBvKraZW20Rc';

export const initialOptions = {
    "client-id": "AQR7X4XDiS1loF8S3R2sb4Z99ji9_aSLruiZ8bfXRcjJhXQSforpMFljAJ03AfJSGcRrCJgGdVh66PES",
    currency: "USD",
    intent: "capture"
};

export const YOUR_SERVICE_ID = "service_xcagcpc";
export const YOUR_USER_ID = "ceDwMcfbFkedL3rzc";
export const CONFIRM_CODE = "template_amwo6vt";

export { upload_preset, cloud_name, apiKey, apiSecret, SECRET_KEY };