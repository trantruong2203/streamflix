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

export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};
const SECRET_KEY = "220396";
const  upload_preset = "truong";
const  cloud_name = "dao84jp9k" ;
const apiKey = '363671622292875';
const apiSecret = 'GbmeEupa0n55XTJXBvKraZW20Rc'; 

export const initialOptions = {
    "client-id": "AQR7X4XDiS1loF8S3R2sb4Z99ji9_aSLruiZ8bfXRcjJhXQSforpMFljAJ03AfJSGcRrCJgGdVh66PES",
    currency: "USD",
    intent: "capture"
  };

export { upload_preset, cloud_name, apiKey, apiSecret, SECRET_KEY } ;