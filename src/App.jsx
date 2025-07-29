import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import PushNotification from "./pages/pushNotification";
import NotificationPreview from "./pages/notificationPreview";
import NotificationDetails from "./pages/notificationDetails";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PushNotification />} />
          <Route
            path="/notification-preview"
            element={<NotificationPreview />}
          />
          <Route
            path="/notification-details"
            element={<NotificationDetails />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
