import {
  HomeIcon,
  InformationCircleIcon,
  PlusIcon,
  TableCellsIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {Home, Notifications, Profile, Tables} from "@/pages/dashboard";
import {AddArticle} from "@/pages/manage"

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "管理工具",
    layout: "manage",
    pages: [
      {
        icon: <PlusIcon {...icon}/>,
        name: "添加",
        path: "/add-article",
        element: <AddArticle/>,
      },
    ],
  },
];

export default routes;
