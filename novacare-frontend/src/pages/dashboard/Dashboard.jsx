import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";

/* ─── tiny helpers ─────────────────────────────────────────────────────── */
const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const Badge = ({ label, color }) => {
  const map = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
    red:   "bg-red-100   text-red-700",
    blue:  "bg-blue-100  text-blue-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${map[color] ?? map.slate}`}>
      {label}
    </span>
  );
};

/* ─── Mock Data ────────────────────────────────────────────────────────── */
const BARS = [
  { day: "M", pct: 60 }, { day: "T", pct: 78 }, { day: "W", pct: 90 },
  { day: "T", pct: 45 }, { day: "F", pct: 82 }, { day: "S", pct: 30 },
  { day: "S", pct: 52 },
];

const STATS = [
  { label: "Invoices",       value: "$28,450", icon: "receipt_long", delta: "+12%",  up: true  },
  { label: "New Patients",   value: "142",     icon: "person",       delta: "+8%",   up: true  },
  { label: "Appointments",   value: "84",      icon: "event_note",   delta: "−3%",   up: false },
  { label: "Available Beds", value: "12 / 85", icon: "bed",          delta: "Stable",up: null  },
];

const TIMELINE = [
  { time: "09:00 AM", color: "teal", title: "Board Meeting",   sub: "Conference Room B" },
  { time: "01:00 PM", color: "red",  title: "Emergency Drill", sub: "Main Lobby"        },
];

const ACTIVITY = [
  { icon: "history",  text: <><b>Nurse Kelly</b> discharged Patient #2938</>, when: "15m ago" },
  { icon: "payments", text: <>Invoice <b>#IV-2034</b> marked as paid</>,       when: "1h ago"  },
];

/* ─── Main Component ───────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav,  setActiveNav]  = useState("dashboard");
  const [apptFilter, setApptFilter] = useState("All Day");

  // Dynamic initials from login
  const userName = localStorage.getItem("userName") || "Admin User";
  const initials  = userName.split(" ").map((n) => n[0]).join("").toUpperCase();

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("userRole");
    if (!token || role !== "admin") {
      console.log("Unauthorized access attempt");
      navigate("/login");
    }
  }, [navigate]);

  // Sidebar nav handler — maps sidebar ids to routes
  const handleSidebarNav = (id) => {
    setActiveNav(id);
    const routes = {
      dashboard:    "/admin-dashboard",
      staff:        "/staff",
      appointments: "/appointments",
      inventory:    "/inventory",
    };
    if (routes[id]) navigate(routes[id]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        body { margin: 0; background: #f7fafd; font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal;
          font-size: 20px; line-height: 1; display: inline-block; white-space: nowrap; direction: ltr;
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="flex min-h-screen bg-[#f7fafd]">
        <Sidebar activeItem={activeNav} onNavigate={handleSidebarNav} />

        <div className="md:ml-60 flex flex-col flex-1 min-h-screen">

          {/* ── Header ── */}
          <header className="fixed top-0 right-0 left-0 md:left-60 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur border-b border-slate-200 z-30 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-xl font-extrabold text-teal-600 md:hidden">NovaCare</span>
              <div className="relative hidden md:flex items-center w-80">
                <MS icon="search" className="absolute left-3 text-slate-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Search records..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-full hover:bg-slate-50 transition">
                <MS icon="notifications" className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="h-7 w-px bg-slate-200 mx-1" />
              <span className="hidden sm:block text-xs font-bold text-slate-700">{userName}</span>
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold border-2 border-teal-200 shadow">
                {initials}
              </div>
            </div>
          </header>

          {/* ── Content ── */}
          <div className="flex flex-1 pt-16">
            <main className="flex-1 p-6 xl:p-8 space-y-8 max-w-[1100px]">

              {/* Welcome + Add Staff button */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Admin Overview</h1>
                  <p className="text-sm text-slate-500">
                    System Status:{" "}
                    <span className="text-green-600 font-bold">● Online</span>
                  </p>
                </div>

                {/* ─── ADD STAFF — navigates to /staff ─── */}
                <button
                  onClick={() => navigate("/staff")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-700 active:scale-95 transition-all"
                >
                  <MS icon="person_add" style={{ fontSize: 18 }} />
                  Add Staff
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 rounded-lg bg-teal-50">
                        <MS icon={s.icon} className="text-teal-600" />
                      </div>
                      {s.up !== null
                        ? <Badge label={s.delta} color={s.up ? "green" : "red"} />
                        : <Badge label={s.delta} color="slate" />
                      }
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                      {s.label}
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Weekly Patient Activity Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Weekly Patient Activity</h3>
                <div className="flex items-end gap-3 h-32">
                  {BARS.map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-100 rounded-t-md relative" style={{ height: "100px" }}>
                        <div
                          className="absolute bottom-0 w-full rounded-t-md transition-all duration-500"
                          style={{
                            height: `${b.pct}%`,
                            background: "linear-gradient(180deg, #2dd4bf, #0d9488)",
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            {/* ── Side Panel ── */}
            <aside className="hidden lg:block w-80 bg-white border-l border-slate-200 p-6 space-y-8 overflow-y-auto">

              {/* Timeline */}
              <div>
                <h3 className="font-bold text-slate-800 mb-5">Today's Timeline</h3>
                <div className="relative space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {TIMELINE.map((ev, i) => (
                    <div key={i} className="flex gap-4 pl-2 relative">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 z-10 ${
                          ev.color === "teal" ? "bg-teal-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className={`text-[10px] font-bold uppercase ${ev.color === "teal" ? "text-teal-600" : "text-red-500"}`}>
                          {ev.time}
                        </p>
                        <p className="text-sm font-bold text-slate-800">{ev.title}</p>
                        <p className="text-xs text-slate-400">{ev.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <MS icon={a.icon} className="text-slate-400" style={{ fontSize: 15 }} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-700 leading-snug">{a.text}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">{a.when}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick link to Staff Directory */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => navigate("/staff")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-teal-500 text-teal-600 font-bold text-sm rounded-xl hover:bg-teal-50 active:scale-95 transition-all"
                >
                  <MS icon="groups" style={{ fontSize: 18 }} />
                  View Staff Directory
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
