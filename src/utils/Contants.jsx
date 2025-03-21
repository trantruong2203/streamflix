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
                path: "media_management/Movie"
            },
            {
                id: 2,
                title: "Episodes",
                path: "media_management/Episode"
            },
            {
                id: 3,
                title: "Trailer",
                path: "media_management/Trailer"
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
                path: "vip/Package"
            },
            {
                id: 2,
                title: "Peature",
                path: "vip/Peature"
            },
            {
                id: 3,
                title: "Plans",
                path: "vip/Plans"
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
                path: "engagement_pages/Like"
            },
            {
                id: 2,
                title: "Watchlist ",
                path: "engagement_pages/Watchlist  "
            },
            {
                id: 3,
                title: "Comment",
                path: "engagement_pages/Comment "
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

const  upload_preset = "truong";
const  cloud_name = "dao84jp9k" ;
const apiKey = '363671622292875';
const apiSecret = 'GbmeEupa0n55XTJXBvKraZW20Rc'; 

export { upload_preset, cloud_name, apiKey, apiSecret } ;