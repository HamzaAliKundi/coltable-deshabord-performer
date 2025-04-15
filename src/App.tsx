import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import SettingsPage from "./pages/settings";
import Signup from "./components/auth/signUp";
import ProfilePage from "./pages/profile";
import MessagesPage from "./pages/messages";
import ToolsPage from "./pages/tools";
import ReviewsPage from "./pages/reviews";
import EventsPage from "./pages/events";
import CreateEvent from "./components/events/create-event";
import Privacy from './components/privacy';
import Terms from './components/terms';
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />  
            <Route path="messages" element={<MessagesPage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="review" element={<ReviewsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="event/create-event" element={<CreateEvent />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
