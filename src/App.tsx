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
import CalendarPage from "./pages/calendar";
import EventDetailPage from './pages/events/event-detail';
import VerificationSuccess from "./components/auth/VerificationSuccess";
import EmailVerification from "./components/auth/EmailVerification";
import ResetPassword from "./components/auth/reset-password";
import ForgotPassword from "./components/auth/forgot-password";
import PasswordResetEmailSent from "./components/auth/PasswordResetEmailSent";
import PasswordChangedSuccess from "./components/auth/PasswordChangedSuccess";
import EventRequestDetail from "./pages/events/event-request-detail";
import MediaPage from "./pages/media";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-success" element={<VerificationSuccess />} />
          <Route path="/forgot-password/email-sent" element={<PasswordResetEmailSent />} />
          <Route path="/reset-password/password-changed" element={<PasswordChangedSuccess />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />  
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile/media" element={<MediaPage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="review" element={<ReviewsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="event/create-event" element={<CreateEvent />} />
            <Route path="event/create-event/:id" element={<CreateEvent />} />
            <Route path="event/detail/:id" element={<EventDetailPage />} />
            <Route path="event/event-request-detail/:id" element={<EventRequestDetail />} />

            <Route path="calendar" element={<CalendarPage />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
