import { useState } from "react";
import Sidebar from "../../components/sidebar";
import StaffOverview from "./StaffOverview";
import UnitOverview from "./UnitOverview";
import Schedules from "./Schedules";

const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const TABS = [
  { id: "unit",     label: "Unit Overview",  icon: "domain"            },
  { id: "staff",    label: "Staff Overview", icon: "groups"            },
  { id: "schedules",label: "Schedules",      icon: "calendar_month"    },
];

export default function StaffPage() {
  const [activeNav, setActiveNav] = useState("staff");
  const [activeTab, setActiveTab] = useState("staff");
  const [prevTab,   setPrevTab]   = useState("staff");
  const [animating, setAnimating] = useState(false);

  const switchTab = (id) => {
    if (id === activeTab || animating) return;
    setAnimating(true);
    setPrevTab(activeTab);
    setTimeout(() => {
      setActiveTab(id);
      setAnimating(false);
    }, 180);
  };

  const renderView = () => {
    switch (activeTab) {
      case "unit":      return <UnitOverview />;
      case "schedules": return <Schedules />;
      default:          return <StaffOverview />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #f7fafd; font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal;
          font-size: 20px; line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap; direction: ltr;
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .tab-content { transition: opacity 0.18s ease, transform 0.18s ease; }
        .tab-content.entering { opacity: 1; transform: translateY(0); }
        .tab-content.exiting  { opacity: 0; transform: translateY(6px); }
      `}</style>

      <div className="flex min-h-screen bg-[#f7fafd]">
        <Sidebar activeItem={activeNav} onNavigate={setActiveNav} />

        <div className="md:ml-60 flex flex-col flex-1 min-h-screen">

          {/* ── Top Bar ── */}
          <header className="fixed top-0 right-0 left-0 md:left-60 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur border-b border-slate-200 z-30 shadow-sm">

            {/* Left: brand + tab nav */}
            <div className="flex items-center gap-8">
              <span className="text-xl font-extrabold text-teal-600 md:hidden" style={{ fontFamily: "Manrope, sans-serif" }}>
                NovaCare
              </span>

              {/* Tab Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-teal-50 text-teal-600 shadow-sm border border-teal-100"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <MS icon={tab.icon} style={{ fontSize: 16 }} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-0.5" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right: search + actions */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:flex items-center">
                <MS icon="search" className="absolute left-3 text-slate-400" style={{ fontSize: 16 }} />
                <input
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 w-60"
                  placeholder="Search records…"
                />
              </div>
              <button className="relative p-2 rounded-full hover:bg-slate-50 transition">
                <MS icon="notifications" className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button className="p-2 rounded-full hover:bg-slate-50 transition">
                <MS icon="help" className="text-slate-500" />
              </button>
              <div className="h-7 w-px bg-slate-200 mx-1" />
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold border-2 border-teal-100 shadow cursor-pointer">
                AW
              </div>
            </div>
          </header>

          {/* ── Mobile Tab Bar ── */}
          <div className="md:hidden fixed top-16 left-0 right-0 z-20 bg-white border-b border-slate-200 flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex-1 py-3 text-xs font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "text-teal-600 border-teal-500"
                    : "text-slate-400 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Main Content ── */}
          <main className="flex-1 pt-30 md:pt-16 p-6 xl:p-8">
            <div
              className="tab-content"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.18s ease, transform 0.18s ease",
              }}
            >
              {renderView()}
            </div>
          </main>

          {/* ── Footer ── */}
          <footer className="border-t border-slate-200 px-6 py-3 flex items-center justify-between bg-white">
            <p className="text-xs text-slate-400">© 2024 NovaCare · Hospital Management</p>
            <div className="flex gap-4 text-xs text-slate-400">
              <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Support</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
