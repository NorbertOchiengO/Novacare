import { useState } from "react";

const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const DAYS = [
  { day: "MON", date: 12, isToday: false },
  { day: "TUE", date: 13, isToday: false },
  { day: "WED", date: 14, isToday: true  },
  { day: "THU", date: 15, isToday: false },
  { day: "FRI", date: 16, isToday: false },
  { day: "SAT", date: 17, isToday: false, isWeekend: true },
  { day: "SUN", date: 18, isToday: false, isWeekend: true },
];

const SHIFTS = {
  morning: { label: "Morning", time: "06:00 - 14:00", color: "border-teal-500",   bg: "bg-teal-500/10",   text: "text-teal-600"   },
  evening: { label: "Evening", time: "14:00 - 22:00", color: "border-amber-500",  bg: "bg-amber-500/10",  text: "text-amber-600"  },
  night:   { label: "Night",   time: "22:00 - 06:00", color: "border-slate-400",  bg: "bg-slate-400/10",  text: "text-slate-600"  },
  conflict:{ label: "Night (Conflict)", time: "22:00 - 06:00", color: "border-red-500", bg: "bg-red-500/10", text: "text-red-600" },
};

// Each row: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
const SCHEDULE_ROWS = [
  {
    name: "Dr. Aris Thorne",
    initials: "AT",
    shifts: ["morning", null, "conflict", null, "morning", null, null],
  },
  {
    name: "Sarah Jenkins",
    initials: "SJ",
    shifts: [null, "evening", null, "evening", null, "morning", null],
  },
  {
    name: "Marcus Chen",
    initials: "MC",
    shifts: ["night", "night", null, null, "night", null, null],
  },
  {
    name: "Janet Doe, RN",
    initials: "JD",
    shifts: ["morning", null, "morning", null, "morning", "evening", null],
  },
  {
    name: "Dr. Robert Fox",
    initials: "RF",
    shifts: [null, "morning", "morning", "evening", null, null, null],
  },
];

const AVAILABLE_STAFF = [
  { initials: "JD", name: "Janet Doe, RN",    status: "Available",  statusCls: "text-green-600", dot: "bg-green-500" },
  { initials: "LW", name: "Liam Wilson, MD",  status: "Off-duty",   statusCls: "text-slate-400", dot: null           },
  { initials: "PK", name: "Priya K., RN",     status: "In Surgery", statusCls: "text-amber-600", dot: null           },
  { initials: "RF", name: "Dr. Robert Fox",   status: "Available",  statusCls: "text-green-600", dot: "bg-green-500" },
];

export default function Schedules() {
  const [view, setView] = useState("Week");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Unit Schedule
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">May 12 – May 18, 2024 · Medical Surgical Unit A</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {["Week", "Month"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  view === v ? "bg-white shadow text-teal-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-teal-700 active:scale-95 transition-all">
            <MS icon="add" style={{ fontSize: 16 }} />
            Assign Shift
          </button>
        </div>
      </div>

      {/* Conflict Alert */}
      <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
        <MS icon="warning" className="text-red-600 flex-shrink-0 mt-0.5" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }} />
        <div className="flex-1">
          <h4 className="font-bold text-red-800 text-sm">Schedule Conflict Detected</h4>
          <p className="text-red-700/80 text-xs mt-0.5">
            Dr. Aris Thorne is assigned to both Emergency Ward and ICU for the Night Shift on May 14th.
          </p>
        </div>
        <button className="text-red-600 font-bold text-xs underline underline-offset-2 flex-shrink-0 hover:text-red-800 transition-colors">
          Resolve Now
        </button>
      </div>

      <div className="flex gap-5">
        {/* Schedule Grid */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
              <div className="p-4 border-r border-slate-200 flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">STAFF</span>
              </div>
              {DAYS.map((d) => (
                <div
                  key={d.date}
                  className={`p-4 text-center ${d.isToday ? "bg-teal-50" : ""} ${d.isWeekend ? "opacity-40" : ""}`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${d.isToday ? "text-teal-600" : "text-slate-400"}`}>
                    {d.day}
                  </p>
                  <p className={`font-bold mt-0.5 ${d.isToday ? "text-teal-600" : "text-slate-800"}`}>{d.date}</p>
                </div>
              ))}
            </div>

            {/* Staff Rows */}
            <div className="divide-y divide-slate-100">
              {SCHEDULE_ROWS.map((row) => (
                <div key={row.name} className="grid grid-cols-8 group hover:bg-slate-50/50 transition-colors">
                  {/* Staff info cell */}
                  <div className="p-4 border-r border-slate-200 flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {row.initials}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 truncate">{row.name}</span>
                  </div>

                  {/* Shift cells */}
                  {row.shifts.map((shiftKey, di) => {
                    const d = DAYS[di];
                    const shift = shiftKey ? SHIFTS[shiftKey] : null;
                    return (
                      <div
                        key={di}
                        className={`p-2 h-20 ${d.isToday ? "bg-teal-50/50" : ""} ${d.isWeekend ? "bg-slate-50/50" : ""}`}
                      >
                        {shift && (
                          <div className={`h-full rounded-lg ${shift.bg} border-l-4 ${shift.color} p-2 text-xs relative overflow-hidden`}>
                            <p className={`font-bold ${shift.text} truncate`}>{shift.label}</p>
                            <p className="text-slate-400 text-[10px] mt-0.5">{shift.time}</p>
                            {shiftKey === "conflict" && (
                              <MS
                                icon="error_outline"
                                className="text-red-500 absolute right-1 bottom-1"
                                style={{ fontSize: 14 }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="w-64 flex-shrink-0 space-y-4">
          {/* Shift Legend */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Shift Legend
            </h3>
            <div className="space-y-3">
              {[
                { color: "bg-teal-500",   label: "Morning Shift", time: "06:00 AM – 02:00 PM" },
                { color: "bg-amber-400",  label: "Evening Shift", time: "02:00 PM – 10:00 PM" },
                { color: "bg-slate-400",  label: "Night Shift",   time: "10:00 PM – 06:00 AM" },
                { color: "bg-red-500",    label: "Conflict",      time: "Needs Resolution"     },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${l.color} flex-shrink-0`} />
                  <div>
                    <p className="text-xs font-bold text-slate-700">{l.label}</p>
                    <p className="text-[10px] text-slate-400">{l.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Staff */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
                Available Staff
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Medical Surgical Unit</p>
            </div>
            <div className="flex-1 p-3 space-y-2">
              {AVAILABLE_STAFF.map((staff) => (
                <div
                  key={staff.name}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold flex-shrink-0">
                      {staff.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{staff.name}</p>
                      <p className={`text-[10px] font-semibold flex items-center gap-1 ${staff.statusCls}`}>
                        {staff.dot && <span className={`w-1.5 h-1.5 rounded-full ${staff.dot}`} />}
                        {staff.status}
                      </p>
                    </div>
                  </div>
                  <MS
                    icon="drag_handle"
                    className="text-slate-300 group-hover:text-slate-500 transition-colors"
                    style={{ fontSize: 18 }}
                  />
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100">
              <button className="w-full text-teal-600 font-bold text-xs flex items-center justify-center gap-2 py-2 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                Manage Directory
                <MS icon="arrow_forward" style={{ fontSize: 14 }} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
