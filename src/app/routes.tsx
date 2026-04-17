import { createBrowserRouter } from "react-router";
import { MobileLayout } from "./components/MobileLayout";
import { AuthScreen } from "./screens/Auth";
import { HomeScreen } from "./screens/HomeScreen";
import { BranchesScreen } from "./screens/Branches";
import { BookingScreen } from "./screens/Booking";
import { HistoryScreen } from "./screens/History";
import { NotificationsScreen } from "./screens/Notifications";
import { ProfileScreen } from "./screens/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { index: true, Component: AuthScreen },
      { path: "dashboard", Component: HomeScreen },
      { path: "branches", Component: BranchesScreen },
      { path: "book", Component: BookingScreen },
      { path: "history", Component: HistoryScreen },
      { path: "notifications", Component: NotificationsScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
