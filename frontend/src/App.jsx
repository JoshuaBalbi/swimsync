import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import PracticesPage from "./pages/PracticesPage";
import CreatePracticePage from "./pages/CreatePracticePage";
import EditPracticePage from "./pages/EditPracticePage";
import TimesPage from "./pages/TimesPage";
import AddTimePage from "./pages/AddTimePage";
import EditTimePage from "./pages/EditTimePage";
import TeamPage from "./pages/TeamPage";
import AttendancePage from "./pages/AttendancePage";
import SwimmersPage from "./pages/SwimmersPage";
import SwimmerProfilePage from "./pages/SwimmerProfilePage";
import MeetsPage from "./pages/MeetsPage";
import CreateMeetPage from "./pages/CreateMeetPage";
import MeetDetailsPage from "./pages/MeetDetailsPage";

function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">SwimSync</h1>
      <p>Cloud-Based Swim Team Management Platform</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practices" element={<PracticesPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/practices/new" element={<CreatePracticePage />} />
        <Route path="/practices/:id/edit" element={<EditPracticePage />} />
        <Route path="/times" element={<TimesPage />} />
        <Route path="/times/new" element={<AddTimePage />} />
        <Route path="/times/:id/edit" element={<EditTimePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/swimmers" element={<SwimmersPage />} />
        <Route path="/swimmers/:id" element={<SwimmerProfilePage />} />
        <Route path="/meets" element={<MeetsPage />} />
        <Route path="/meets/new" element={<CreateMeetPage />} />
        <Route path="/meets/:id" element={<MeetDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
