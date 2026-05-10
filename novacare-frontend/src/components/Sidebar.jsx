import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: "dashboard" },
  { id: "appointments", label: "Appointments", icon: "event" },
  { id: "patients",     label: "Patients",     icon: "group" },
  { id: "doctors",      label: "Doctors",      icon: "medical_services" },
  { id: "departments",  label: "Departments",  icon: "domain" },
  { id: "schedule",     label: "Schedule",     icon: "calendar_month" },
  { id: "pharmacy",     label: "Pharmacy",     icon: "pill" },
  { id: "laboratory",   label: "Laboratory",   icon: "biotech" },
  { id: "wards",        label: "Wards",        icon: "meeting_room" },
  { id: "billing",      label: "Billing",      icon: "payments" },
  { id: "inventory",    label: "Inventory",    icon: "inventory_2" },
  { id: "emergency",    label: "Emergency",    icon: "emergency" },
  { id: "reports",      label: "Reports",      icon: "analytics" },
  { id: "messages",     label: "Messages",     icon: "mail", badge: 3 },
  { id: "settings",     label: "Settings",     icon: "settings" },
];

/**
 * NovaCare Reusable Sidebar
 *
 * Props:
 *   activeItem  {string}   – id of the active nav item (e.g. "dashboard")
 *   onNavigate  {function} – callback(id: string) when a nav item is clicked
 *   className   {string}   – optional extra Tailwind classes for the <aside>
 */
export default function Sidebar({ activeItem = "dashboard", onNavigate, className = "" }) {
  const [hovered, setHovered] = useState(null);

  const handleNav = (id) => {
    if (onNavigate) onNavigate(id);
  };

  return (
    <>
      {/* Google Fonts & Material Symbols — include once in your index.html if already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .ms { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal;
              font-size: 20px; line-height: 1; letter-spacing: normal; text-transform: none;
              display: inline-block; white-space: nowrap; direction: ltr;
              font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>

      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-white border-r border-slate-100 z-40 hidden md:flex flex-col shadow-sm ${className}`}
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center shadow-sm">
              <span className="ms text-white" style={{ fontSize: 15 }}>local_hospital</span>
            </div>
            <h1 className="text-lg font-extrabold text-teal-600 tracking-tight">NovaCare</h1>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest pl-9">
            Hospital Management
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold
                  transition-all duration-150 text-left relative group
                  ${isActive
                    ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                    : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                  }
                `}
              >
                {/* Active left-accent bar */}
                {isActive && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-l-full" />
                )}

                <span
                  className="ms flex-shrink-0"
                  style={{
                    fontSize: 19,
                    color: isActive ? "white" : hovered === item.id ? "#0d9488" : "#94a3b8",
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 300",
                    transition: "color 0.15s",
                  }}
                >
                  {item.icon}
                </span>

                <span className="flex-1">{item.label}</span>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight
                      ${isActive ? "bg-amber-400 text-amber-900" : "bg-red-100 text-red-600"}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-100 px-3 py-3 space-y-0.5">
          <button
            onClick={() => handleNav("profile")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-all"
          >
            <span className="ms" style={{ fontSize: 19, color: "#94a3b8" }}>account_circle</span>
            <span>Staff Profile</span>
          </button>
          <button
            onClick={() => handleNav("logout")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <span className="ms" style={{ fontSize: 19, color: "#f87171" }}>logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
