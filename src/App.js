import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminhome from "./pages/Adminhome.jsx";
import SignUp from "./pages/register.jsx";
import LogIn from "./pages/login.jsx";
import ForgotPass from "./pages/forgot-pass.jsx";
import ForgotCode from "./pages/forgot-code.jsx";
import ForgotNew from "./pages/forgot-new.jsx";
import Users from "./pages/users.jsx";
import Notifications from "./pages/notifications.jsx"
import NotificationDetail from "./pages/notification-detail.jsx"
import User from "./pages/user.jsx"
import LandingHome from "./pages/landing-home.jsx"
import Features from "./pages/features.jsx"
import Privacy from "./pages/privacy.jsx"
import Library from "./pages/library.jsx"
import Book from "./pages/book.jsx"
import Podcast from "./pages/podcast.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/landinghome" element={<LandingHome />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/forgetpass" element={<ForgotPass />} />
        <Route path="/forgotcode" element={<ForgotCode />} />
        <Route path="/forgotnew" element={<ForgotNew />} />
        <Route path="/users" element={<Users />} />
        <Route path="/library" element={<Library />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notificationdetail/:id" element={<NotificationDetail />} />
        <Route path="/noti/:id" element={<NotificationDetail />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/podcast/:id" element={<Podcast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



