import HomeComponent from "../views/home";
import DetailComponent from "../views/detail";
import TrendingComponent from "../views/trending";
import SearchComponent from "../views/search";
import LoginComponent from "../views/login";
import ForgotComponent from "../views/forgot/index";
import ForgotResetComponent from "../views/forgot/reset.js";
import AboutComponent from "../views/about";
import MessageComponent from "../views/message";
import CategoryComponent from "../views/category";
import TagComponent from "../views/tag";
import ProfileComponent from "../views/profile";
import WriteComponent from "../views/write";
import DraftComponent from "../views/write/draft";
const routes = [
  {
    path: "/",
    exact: true,
    component: HomeComponent,
    requiresAuth: false
  },
  {
    path: "/login",
    component: LoginComponent,
    requiresAuth: false
  },
  {
    path: "/post/:id",
    component: DetailComponent,
    requiresAuth: false
  },
  {
    path: "/category/:type",
    component: CategoryComponent,
    requiresAuth: false
  },
  {
    path: "/tag/:id",
    component: TagComponent,
    requiresAuth: false
  },
  {
    path: "/trending/:type",
    component: TrendingComponent,
    requiresAuth: false
  },
  {
    path: "/search",
    component: SearchComponent,
    requiresAuth: false
  },
  {
    path: "/profile/:type",
    component: ProfileComponent,
    requiresAuth: true
  },
  {
    path: "/about",
    component: AboutComponent,
    requiresAuth: false,
  },
  {
    path: "/message",
    component: MessageComponent,
    requiresAuth: false,
  },
  {
    path: "/write/:type",
    component: WriteComponent,
    requiresAuth: true,
  },
  {
    path: "/draft",
    component: DraftComponent,
    requiresAuth: true,
  },
  {
    path: "/forgot",
    component: ForgotComponent,
    requiresAuth: false,
    exact: true,
  },
  {
    path: "/forgot/reset",
    exact: true,
    strict: true,
    component: ForgotResetComponent,
    requiresAuth: false,
  }
  // {
  //   path: "*",
  //   component: NotFound
  // }
];
export default routes;
