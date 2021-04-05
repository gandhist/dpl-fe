/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import DataPeserta from "views/DataPeserta";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import { List as ListCategory, Create as CreateCategory, Edit as EditCategory } from './views/Admin/Category';
import { List as ListProperty, Create as CreateProperty, Edit as EditProperty } from "./views/Admin/Property";
import { List as ListPackage, Create as CreatePackage, Edit as EditPackage } from "./views/Admin/Package";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-layers-3",
    component: DataPeserta,
    layout: "/admin",
  },
  {
    path: "/package",
    name: "Package",
    icon: "nc-icon nc-app",
    component: ListPackage,
    layout: "/admin",
  },
  {
    path: "/property",
    name: "Property",
    icon: "nc-icon nc-favourite-28",
    component: ListProperty,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-palette",
    component: ListCategory,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
];

// another routes
const routes = [
  {
    path: "/category/create",
    component: CreateCategory,
    layout: "/admin",
  },
  {
    path: "/category/edit/:id",
    component: EditCategory,
    layout: "/admin",
  },
  {
    path: "/property/create",
    component: CreateProperty,
    layout: "/admin",
  },
  {
    path: "/property/edit/:id",
    component: EditProperty,
    layout: "/admin",
  },
  {
    path: "/package/create",
    component: CreatePackage,
    layout: "/admin",
  },
  {
    path: "/package/edit/:id",
    component: EditPackage,
    layout: "/admin",
  },
]

export { dashboardRoutes, routes };
