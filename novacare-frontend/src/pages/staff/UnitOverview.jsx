const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const DEPARTMENTS = [
  {
    icon: "favorite",
    name: "Cardiology Wing",
    capacity: "85%",
    capWidth: "w-[85%]",
    capColor: "bg-teal-500",
    stats: [
      { label: "Cardiology", sub: "12 Consultants • 8 Nurses",  right: "24 Active", rightSub: "Patients" },
      { label: "Cardiac ICU", sub: "6 Specialists • 4 Nurses",  right: "18 Active", rightSub: "Beds"     },
      { label: "Cardiac Rehab", sub: "4 Therapists • 3 Nurses", right: "30 Active", rightSub: "Sessions" },
    ],
    extraTop: { label: "Nursing Staff: 10", label2: "Physicians: 6", barWidth: "w-[65%]" },
  },
  {
    icon: "biotech",
    name: "Diagnostic Lab",
    capacity: "78%",
    capWidth: "w-[78%]",
    capColor: "bg-teal-500",
    stats: [
      { label: "Hematology",   sub: "6 Specialists • 4 Techs",  right: "12 Active", rightSub: "Tests/hr" },
      { label: "Microbiology", sub: "4 Specialists • 2 Techs",  right: "8 Active",  rightSub: "Tests/hr" },
      { label: "Radiology",    sub: "8 Specialists • 5 Techs",  right: "18 Active", rightSub: "Tests/hr" },
    ],
    extraTop: null,
  },
  {
    icon: "medication",
    name: "Central Pharmacy",
    capacity: "60%",
    capWidth: "w-[60%]",
    capColor: "bg-amber-400",
    pharmacy: true,
    stats: [
      { label: "Inpatient Pharmacy", sub: "12 Staff", icon: "check_circle" },
      { label: "Retail Counter",     sub: "8 Staff",  icon: "check_circle" },
    ],
    pharmacyStats: { dispensed: "1,204", lowStock: "12 Items" },
  },
];

const RESOURCE_TABLE = [
  { unit: "Hematology Wing B",  status: "NORMAL",   statusCls: "bg-green-500/20 text-green-400 border-green-500/30",  beds: "14/20", manager: "Dr. Sarah Chen"          },
  { unit: "ER Triage Alpha",    status: "CRITICAL",  statusCls: "bg-red-500/20   text-red-400   border-red-500/30",    beds: "12/12", manager: "Dr. Marcus Thorne"       },
  { unit: "Post-Op Recovery",   status: "CAUTION",   statusCls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",beds:"18/22", manager: "Nurse Elena Rodriguez"   },
];

export default function UnitOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
          Unit Overview
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          System-wide view of department capacity, personnel distribution, and bed occupancy.
        </p>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Personnel", value: "412",  icon: "groups",     color: "teal"  },
          { label: "Staffing Eff.",   value: "92%",  icon: "trending_up",color: "green" },
          { label: "Beds Occupied",   value: "44/57",icon: "bed",         color: "amber" },
          { label: "Active Units",    value: "8",    icon: "domain",      color: "blue"  },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              m.color === "teal"  ? "bg-teal-50  text-teal-600"  :
              m.color === "green" ? "bg-green-50 text-green-600" :
              m.color === "amber" ? "bg-amber-50 text-amber-600" :
                                    "bg-blue-50  text-blue-600"
            }`}>
              <MS icon={m.icon} style={{ fontSize: 20 }} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{m.value}</p>
              <p className="text-xs text-slate-400 font-medium">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.name} className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                  <MS icon={dept.icon} style={{ fontSize: 20 }} />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: "Manrope, sans-serif" }}>{dept.name}</h3>
              </div>
              <MS icon="more_vert" className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>

            <div className="p-5 flex-1 space-y-4">
              {dept.pharmacy ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Dispensed</p>
                      <p className="text-xl font-bold text-teal-600">{dept.pharmacyStats.dispensed}</p>
                      <p className="text-[10px] text-slate-400">Today</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Low Stock</p>
                      <p className="text-xl font-bold text-red-600">{dept.pharmacyStats.lowStock}</p>
                      <p className="text-[10px] text-slate-400">Action Required</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {dept.stats.map((s) => (
                      <div key={s.label} className="flex items-center gap-3 text-sm">
                        <MS icon={s.icon} className="text-teal-500 flex-shrink-0" style={{ fontSize: 18 }} />
                        <span className="text-slate-700">{s.label}: <span className="font-semibold">{s.sub}</span></span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {dept.stats.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{s.label}</p>
                        <p className="text-xs text-slate-400">{s.sub}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-teal-600 font-bold text-sm">{s.right}</p>
                        <p className="text-[10px] text-slate-400">{s.rightSub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Capacity bar */}
            <div className="px-5 pb-5">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-600">Overall Capacity</span>
                  <span className="text-xs font-bold text-slate-800">{dept.capacity}</span>
                </div>
                <div className="w-full bg-white rounded-full h-1.5 overflow-hidden border border-slate-200">
                  <div className={`${dept.capWidth} ${dept.capColor} h-full rounded-full`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Facility Resource Allocation */}
      <div className="bg-[#0D2B45] text-white rounded-xl shadow-xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none select-none flex items-center justify-center">
          <MS icon="hub" style={{ fontSize: 200, color: "white" }} />
        </div>
        <div className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                Facility Resource Allocation
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                System-wide overview of personnel distribution and bed occupancy across active clinical wings.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-black text-amber-400">92%</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Staffing Efficiency</p>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block self-center" />
              <div className="text-center">
                <p className="text-3xl font-black text-white">412</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Total Personnel</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase tracking-widest">
                  <th className="pb-3 font-medium">Unit Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Occupancy</th>
                  <th className="pb-3 font-medium">Shift Manager</th>
                </tr>
              </thead>
              <tbody>
                {RESOURCE_TABLE.map((row, i) => (
                  <tr key={row.unit} className={`border-b border-white/5 ${i === RESOURCE_TABLE.length - 1 ? "border-0" : ""}`}>
                    <td className="py-4 font-semibold">{row.unit}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold ${row.statusCls}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-300">{row.beds} Beds</td>
                    <td className="py-4 text-slate-300">{row.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
