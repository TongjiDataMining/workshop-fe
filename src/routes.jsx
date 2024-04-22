import {PlusIcon, ShareIcon, StarIcon,} from "@heroicons/react/24/solid";
import {Relationship} from "@/pages/dashboard";
import {AddArticle} from "@/pages/manage"
import Subjects from "@/pages/dashboard/subjects.jsx";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <ShareIcon {...icon} />,
                name: "关系图查看",
                path: "/relationship",
                element: <Relationship/>
            },
            {
                icon: <StarIcon {...icon} />,
                name: "主题一览",
                path: "/subjects",
                element: <Subjects/>
            }
        ],
    },
    {
        title: "管理工具",
        layout: "manage",
        pages: [
            {
                icon: <PlusIcon {...icon}/>,
                name: "导入文章",
                path: "/add-article",
                element: <AddArticle/>,
            },
        ],
    },
];

export default routes;
