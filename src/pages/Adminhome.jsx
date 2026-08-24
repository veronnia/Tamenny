import styles from '../css/Adminhome.module.css';
import Adminheader from '../components/Adminheader.jsx';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell
} from "recharts";

function Adminhome() {
  const location = useLocation();
  const data = location.state;

  const [users, setUsers] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [chats, setChats] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [statusBreakdown, setStatusBreakdown] = useState([]);
  const [typeBreakdown, setTypeBreakdown] = useState([]);
  const [actions, setActions] = useState([]);

  const [topBooks, setTopBooks] = useState([]);
  const [topPodcasts, setTopPodcasts] = useState([]);

  const [overviewData, setOverviewData] = useState(null);

  const [moodDistribution, setMoodDistribution] = useState([]);
  const [moodEntriesPerDay, setMoodEntriesPerDay] = useState([]);
  const [sessionTypeMoodBreakdown, setSessionTypeMoodBreakdown] = useState([]);
  const [totalMoodEntries, setTotalMoodEntries] = useState(0);
  const [trackedUsers, setTrackedUsers] = useState(0);

  // filters
  const [growthFilter, setGrowthFilter] = useState("day");
  const [chatFilter, setChatFilter] = useState("day");
  const [sessionFilter, setSessionFilter] = useState("day");
  const [moodFilter, setMoodFilter] = useState("day");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const token = storedUser.token;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/admins`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUsers(response.data.data.users || []);
      } catch (error) {
        console.log(error);
      }
    };

    const userGrowth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/user-growth`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setGrowth(response.data.data.newUsersPerDay);
        setTotalUsers(response.data.data.totalUsers);

      } catch (error) {
        console.log(error);
      }
    };

    const userChats = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/chats-per-day`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setChats(response.data.data.chatsPerDay);
      } catch (error) {
        console.log(error);
      }
    };

    const userSessions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/sessions/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSessions(response.data.data.sessionsPerDay);
        setStatusBreakdown(response.data.data.statusBreakdown);
        setTypeBreakdown(response.data.data.typeBreakdown);
      } catch (error) {
        console.log(error);
      }
    };

    const adminActions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/admin-actions`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("admin action: ", response.data);

        setActions(response.data.data.actions);

      } catch (error) {
        console.log(error);
      }
    };

    const content = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTopBooks(response.data.data.topBooks || []);
        setTopPodcasts(response.data.data.topPodcasts || []);

      } catch (error) {
        console.log(error);
      }
    };

    const moodAnalytics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/mood/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMoodDistribution(response.data.data.moodDistribution || []);
        setMoodEntriesPerDay(response.data.data.moodEntriesPerDay || []);
        setSessionTypeMoodBreakdown(response.data.data.sessionTypeBreakdown || []);
        setTotalMoodEntries(response.data.data.totalEntries || 0);
        setTrackedUsers(response.data.data.uniqueUsersTracked || 0);


        console.log(response);

      } catch (error) {
        console.log(error);
      }
    };

    const overview = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/dashboard/overview`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOverviewData(response.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    overview();
    content();
    moodAnalytics();
    adminActions();
    fetchUsers();
    userGrowth();
    userChats();
    userSessions();

  }, []);

  const filterData = (dataArray, valueKey, currentFilter) => {
    if (currentFilter === "day") {
      return dataArray;
    }

    const grouped = {};

    dataArray.forEach((item) => {
      const date =
        currentFilter === "month"
          ? item._id.slice(0, 7)
          : item._id.slice(0, 4);

      grouped[date] = (grouped[date] || 0) + item[valueKey];
    });

    return Object.keys(grouped).map((key) => ({
      _id: key,
      [valueKey]: grouped[key]
    }));
  };

  const formattedActions = actions.map((item) => ({
    ...item,
    name:
      item._id === "THERAPIST_REQUEST"
        ? "Requests"
        : item._id === "THERAPIST_APPROVED"
        ? "Approved"
        : item._id === "THERAPIST_REJECTED"
        ? "Rejected"
        : item._id === "FLAGGED_CASE"
        ? "Flagged"
        : "Unknown"
  }));


  return (
    <div className='flex flex-col gap-y-20' style={{ background: '#ede5e0', minHeight: '100vh' }}>

      <Adminheader />

      {/* OVERVIEW */}
      <div className='w-[92%] m-auto pt-[3%] flex flex-col gap-y-10'>

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Admin Panel</p>
          <h1 className='text-[34px] text-[#1B3C53] font-bold leading-tight'>Dashboard Overview</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>

          <div className='rounded-2xl p-6 text-white relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #1B3C53 0%, #243f54 100%)' }}>
            {/* <div className='absolute top-0 right-0 w-24 h-24 rounded-full opacity-10' style={{ background: 'white', transform: 'translate(30%, -30%)' }}></div> */}
            <p className='text-[13px] font-medium uppercase tracking-widest opacity-70 mb-3'>Total Users</p>
            <h2 className='text-[44px] font-bold leading-none text-[#F9F3EF]'>{ totalUsers }</h2>
          </div>

          <div className='rounded-2xl p-6 text-white relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #1e4d38 100%)' }}>
            {/* <div className='absolute top-0 right-0 w-24 h-24 rounded-full opacity-10' style={{ background: 'white', transform: 'translate(30%, -30%)' }}></div> */}
            <p className='text-[13px] font-medium uppercase tracking-widest opacity-70 mb-3'>Therapists</p>
            <h2 className='text-[44px] font-bold leading-none text-[#F9F3EF]'>{overviewData?.users?.therapists || 0}</h2>
          </div>

          <div className='rounded-2xl p-6 text-white relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #4A6FA5 0%, #345490 100%)' }}>
            {/* <div className='absolute top-0 right-0 w-24 h-24 rounded-full opacity-10' style={{ background: 'white', transform: 'translate(30%, -30%)' }}></div> */}
            <p className='text-[13px] font-medium uppercase tracking-widest opacity-70 mb-3'>Sessions</p>
            <h2 className='text-[44px] font-bold leading-none text-[#F9F3EF]'>{overviewData?.sessions?.total || 0}</h2>
          </div>

          <div className='rounded-2xl p-6 text-white relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #B5835A 0%, #9a6a42 100%)' }}>
            {/* <div className='absolute top-0 right-0 w-24 h-24 rounded-full opacity-10' style={{ background: 'white', transform: 'translate(30%, -30%)' }}></div> */}
            <p className='text-[13px] font-medium uppercase tracking-widest opacity-70 mb-3'>Pending Sessions</p>
            <h2 className='text-[44px] font-bold leading-none text-[#F9F3EF]'>{overviewData?.sessions?.pending || 0}</h2>
          </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

          <div className='bg-white rounded-2xl p-7 flex items-center gap-6' style={{ border: '1px solid #E2EAF0' }}>
            <div className='w-[4px] self-stretch rounded-full bg-[#1B3C53]'></div>
            <div>
              <p className='text-[#4A6FA5] text-[13px] uppercase tracking-widest font-medium mb-1'>Total Conversations</p>
              <h2 className='text-[#1B3C53] text-[42px] font-bold leading-none'>{overviewData?.conversations?.total || 0}</h2>
            </div>
          </div>

          <div className='bg-white rounded-2xl p-7 flex items-center gap-6' style={{ border: '1px solid #E2EAF0' }}>
            <div className='w-[4px] self-stretch rounded-full bg-[#B5835A]'></div>
            <div>
              <p className='text-[#4A6FA5] text-[13px] uppercase tracking-widest font-medium mb-1'>Mood Entries</p>
              <h2 className='text-[#1B3C53] text-[42px] font-bold leading-none'>{overviewData?.moodEntries || 0}</h2>
            </div>
          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* USER GROWTH */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div className='flex items-end justify-between flex-wrap gap-4'>
          <div>
            <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Analytics</p>
            <h2 className='text-[28px] text-[#1B3C53] font-bold'>User Growth</h2>
          </div>

          <div className='flex text-[15px] text-[#1B3C53] gap-1 bg-white rounded-xl p-1' style={{ border: '1px solid #E2EAF0' }}>
            {["day", "month", "year"].map((f) => (
              <button
                key={f}
                onClick={() => setGrowthFilter(f)}
                className={`px-5 py-2 rounded-lg capitalize transition-all duration-200 ${
                  growthFilter === f
                    ? "bg-[#1B3C53] text-white font-medium"
                    : "text-[#1B3C53] hover:bg-[#EAF0F4]"
                }`}
              >
                {f === "day" ? "Daily" : f === "month" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={filterData(growth, "count", growthFilter)} barCategoryGap="35%">
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="count" fill="#1B3C53" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className='mt-4 pt-4 border-t border-[#EAF0F4] flex items-center gap-2'>
            <span className='text-[#94a3b8] text-[14px]'>Total users</span>
            <span className='font-bold text-[#1B3C53] text-[18px] ml-1'>{totalUsers}</span>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* CHATS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div className='flex items-end justify-between flex-wrap gap-4'>
          <div>
            <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Engagement</p>
            <h2 className='text-[28px] text-[#1B3C53] font-bold'>Chats</h2>
          </div>

          <div className='flex text-[15px] gap-1 bg-white rounded-xl p-1' style={{ border: '1px solid #E2EAF0' }}>
            {["day", "month", "year"].map((f) => (
              <button
                key={f}
                onClick={() => setChatFilter(f)}
                className={`px-5 py-2 rounded-lg capitalize transition-all duration-200 ${
                  chatFilter === f
                    ? "bg-[#2D6A4F] text-white font-medium"
                    : "text-[#1B3C53] hover:bg-[#EAF0F4]"
                }`}
              >
                {f === "day" ? "Daily" : f === "month" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filterData(chats, "sessions", chatFilter)} barCategoryGap="35%">
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="sessions" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* SESSIONS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div className='flex items-end justify-between flex-wrap gap-4'>
          <div>
            <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Bookings</p>
            <h2 className='text-[28px] text-[#1B3C53] font-bold'>Sessions</h2>
          </div>

          <div className='flex text-[15px] gap-1 bg-white rounded-xl p-1' style={{ border: '1px solid #E2EAF0' }}>
            {["day", "month", "year"].map((f) => (
              <button
                key={f}
                onClick={() => setSessionFilter(f)}
                className={`px-5 py-2 rounded-lg capitalize transition-all duration-200 ${
                  sessionFilter === f
                    ? "bg-[#4A6FA5] text-white font-medium"
                    : "text-[#1B3C53] hover:bg-[#EAF0F4]"
                }`}
              >
                {f === "day" ? "Daily" : f === "month" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filterData(sessions, "count", sessionFilter)} barCategoryGap="35%">
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="count" fill="#4A6FA5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-4 flex-wrap">
          {statusBreakdown.map((item) => (
            <div key={item._id} className="bg-white rounded-xl px-6 py-4 flex items-center gap-4" style={{ border: '1px solid #E2EAF0' }}>
              <div className='w-2 h-2 rounded-full bg-[#4A6FA5]'></div>
              <div>
                <p className="text-[#94a3b8] text-[12px] uppercase tracking-widest font-medium">{item._id}</p>
                <h2 className="text-[#1B3C53] text-[24px] font-bold leading-tight">{item.count}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap">
          {typeBreakdown.map((item) => (
            <div key={item._id} className="bg-white rounded-xl px-6 py-5 w-[200px]" style={{ border: '1px solid #E2EAF0' }}>
              <p className="text-[#4A6FA5] text-[12px] uppercase tracking-widest font-medium capitalize mb-2">{item._id}</p>
              <h2 className="text-[#1B3C53] text-[32px] font-bold leading-none">{item.count}</h2>
            </div>
          ))}
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* MOOD ANALYTICS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-8'>

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Wellbeing</p>
          <h2 className='text-[28px] text-[#1B3C53] font-bold'>Mood Analytics</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

          <div className='bg-white rounded-2xl p-7 flex items-center gap-6' style={{ border: '1px solid #E2EAF0' }}>
            <div className='w-[4px] self-stretch rounded-full bg-[#B5835A]'></div>
            <div>
              <p className='text-[#4A6FA5] text-[13px] uppercase tracking-widest font-medium mb-1'>Total Mood Entries</p>
              <h2 className='text-[#1B3C53] text-[42px] font-bold leading-none'>{totalMoodEntries}</h2>
            </div>
          </div>

          <div className='bg-white rounded-2xl p-7 flex items-center gap-6' style={{ border: '1px solid #E2EAF0' }}>
            <div className='w-[4px] self-stretch rounded-full bg-[#2D6A4F]'></div>
            <div>
              <p className='text-[#4A6FA5] text-[13px] uppercase tracking-widest font-medium mb-1'>Users Tracked</p>
              <h2 className='text-[#1B3C53] text-[42px] font-bold leading-none'>{trackedUsers}</h2>
            </div>
          </div>

        </div>

        <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <h3 className='text-[16px] font-semibold text-[#1B3C53] mb-5'>Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={moodDistribution} barCategoryGap="35%">
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="count" fill="#B5835A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
            <h3 className='text-[16px] font-semibold text-[#1B3C53]'>Mood Entries Per Day</h3>

            <div className='flex text-[15px] gap-1 bg-[#F4F7FA] rounded-xl p-1'>
              {["day", "month", "year"].map((f) => (
                <button
                  key={f}
                  onClick={() => setMoodFilter(f)}
                  className={`px-4 py-1.5 rounded-lg capitalize transition-all duration-200 ${
                    moodFilter === f
                      ? "bg-[#B5835A] text-white font-medium"
                      : "text-[#1B3C53] hover:bg-white"
                  }`}
                >
                  {f === "day" ? "Daily" : f === "month" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filterData(moodEntriesPerDay, "count", moodFilter)} barCategoryGap="35%">
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="count" fill="#1B3C53" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        <div className='flex gap-4 flex-wrap'>
          {sessionTypeMoodBreakdown.map((item) => (
            <div key={item._id} className='bg-white rounded-xl px-6 py-5 w-[200px]' style={{ border: '1px solid #E2EAF0' }}>
              <p className='text-[#4A6FA5] text-[12px] uppercase tracking-widest font-medium capitalize mb-2'>{item._id}</p>
              <h2 className='text-[#1B3C53] text-[32px] font-bold leading-none'>{item.count}</h2>
            </div>
          ))}
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* ADMIN ACTIONS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Operations</p>
          <h2 className='text-[28px] text-[#1B3C53] font-bold'>Therapist Workflow</h2>
        </div>

        <div className='bg-white rounded-2xl p-6' style={{ border: '1px solid #E2EAF0' }}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={formattedActions}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            >
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} tick={{ fill: '#1B3C53', fontSize: 13, fontWeight: 500 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {formattedActions.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.name === "Approved" ? "#2D6A4F"
                      : entry.name === "Rejected" ? "#8B3A3A"
                      : entry.name === "Requests" ? "#1B3C53"
                      : entry.name === "Flagged" ? "#B5835A"
                      : "#6B7280"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* TOP BOOKS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Content</p>
          <h2 className='text-[28px] text-[#1B3C53] font-bold'>Top Books</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {topBooks.map((book) => (
            <div
              key={book._id}
              className='bg-white rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300'
              style={{ border: '1px solid #E2EAF0', boxShadow: '0 2px 8px rgba(27,60,83,0.06)' }}
            >
              <div className='overflow-hidden h-[280px]'>
                <img
                  src={book.image?.url}
                  alt={book.title}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-5 flex flex-col gap-y-2'>
                <h2 className='text-[#1B3C53] text-[17px] font-bold leading-snug'>{book.title}</h2>
                <p className='text-[#4A6FA5] text-[13px] font-medium'>{book.author}</p>
                <p className='text-[#64748b] text-[13px] line-clamp-3 leading-relaxed'>{book.description}</p>
                <p className='text-[12px] text-[#94a3b8] mt-1'>Published: {book.publishedYear}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* TOP PODCASTS */}
      <div className='w-[92%] m-auto flex flex-col gap-y-6'>

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Content</p>
          <h2 className='text-[28px] text-[#1B3C53] font-bold'>Top Podcasts</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {topPodcasts.map((podcast) => (
            <div
              key={podcast._id}
              className='bg-white rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300'
              style={{ border: '1px solid #E2EAF0', boxShadow: '0 2px 8px rgba(27,60,83,0.06)' }}
            >
              <div className='overflow-hidden h-[240px]'>
                <img
                  src={podcast.image?.url}
                  alt={podcast.title}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-5 flex flex-col gap-y-2'>
                <h2 className='text-[#1B3C53] text-[17px] font-bold leading-snug'>{podcast.title}</h2>
                <p className='text-[#4A6FA5] text-[13px] font-medium'>{podcast.presenters}</p>
                <p className='text-[#64748b] text-[13px] line-clamp-3 leading-relaxed'>{podcast.description}</p>
                
                <a
                  href={podcast.url}
                  target="_blank"
                  rel="noreferrer"
                  className='mt-3 bg-[#1B3C53] text-white py-2.5 px-4 rounded-xl text-[14px] font-medium text-center hover:bg-[#142D3F] transition-colors duration-200'
                >
                  Open Podcast
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DIVIDER */}
      <div className='w-[92%] m-auto h-[1px] bg-[#DDE6ED]'></div>

      {/* ADMINS */}
      <div className="w-[92%] m-auto pb-16 flex flex-col gap-y-6">

        <div>
          <p className='text-[13px] font-semibold tracking-[0.15em] uppercase text-[#4A6FA5] mb-1'>Team</p>
          <h2 className='text-[28px] text-[#1B3C53] font-bold'>Other Admins</h2>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          {users?.map((user) => (
            <div key={user._id}>
              <button
                className='bg-white rounded-2xl w-[260px] flex items-center p-5 gap-4 cursor-pointer hover:translate-y-[-2px] transition-all duration-200'
                style={{ border: '1px solid #E2EAF0', boxShadow: '0 2px 8px rgba(27,60,83,0.06)' }}
              >
                <div className='flex-shrink-0 h-[52px] w-[52px] rounded-full bg-[#1B3C53] flex items-center justify-center text-white text-[16px] font-bold'>
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <div className='text-left'>
                  <p className='text-[#1B3C53] font-semibold text-[15px] capitalize'>{user.fullname}</p>
                  <p className='text-[#4A6FA5] text-[13px] font-medium capitalize'>{user.role}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
  
}

export default Adminhome;