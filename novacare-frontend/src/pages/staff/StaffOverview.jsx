import { useState } from "react";
import StaffRegistrationModal from "./StaffRegistrationModal";

const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const STAFF = [
  {
    initials: null, name: "Dr. James Wilson",   id: "NC-4829", role: "Chief Cardiologist",
    dept: "Cardiology Unit",   status: "On Duty",   statusColor: "green",  perf: 92, online: true,
  },
  {
    initials: null, name: "Sarah Mitchell, RN", id: "NC-5120", role: "Head Nurse",
    dept: "Pediatrics",        status: "Off Duty",  statusColor: "slate",  perf: 88, online: false,
  },
  {
    initials: "PK", name: "Priya K., RN",       id: "NC-5241", role: "Registered Nurse",
    dept: "ICU",               status: "In Surgery",statusColor: "amber",  perf: 76, online: true,
  },
  {
    initials: null, name: "Dr. Robert Fox",     id: "NC-3901", role: "Neurologist",
    dept: "Neurology",         status: "On Duty",   statusColor: "green",  perf: 95, online: true,
  },
  {
    initials: "ML", name: "Marcus Chen, MD",    id: "NC-4102", role: "Surgeon",
    dept: "Surgery",           status: "On Break",  statusColor: "blue",   perf: 83, online: false,
  },
];

const STATUS_COLORS = {
  green: "bg-green-100 text-green-700",
  slate: "bg-slate-100 text-slate-600",
  amber: "bg-amber-100 text-amber-700",
  blue:  "bg-blue-100  text-blue-700",
};

const AVATAR_COLORS = [
  "bg-teal-100 text-teal-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

export default function StaffOverview() {
  const [showModal, setShowModal]   = useState(false);
  const [search, setSearch]         = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("Any Status");

  const filtered = STAFF.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All Departments" || s.dept.includes(deptFilter.split(" ")[0]);
    const matchStatus = statusFilter === "Any Status" || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-weight:normal; font-style:normal; font-size:20px; line-height:1; display:inline-block; white-space:nowrap; direction:ltr; }
      `}</style>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>Staff Management</span>
              <MS icon="chevron_right" style={{ fontSize: 12 }} />
              <span className="text-teal-600 font-semibold">Staff Directory</span>
            </nav>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
              Staff Directory
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage and view credentials for all {STAFF.length * 24} medical professionals.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <MS icon="person_add" style={{ fontSize: 18 }} />
            Add Staff Member
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Staff",    value: "124", icon: "groups",          color: "teal"  },
            { label: "On Duty Now",    value: "87",  icon: "medical_services", color: "green" },
            { label: "On Leave",       value: "12",  icon: "event_busy",       color: "amber" },
            { label: "New This Month", value: "5",   icon: "person_add",       color: "blue"  },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                stat.color === "teal"  ? "bg-teal-50  text-teal-600"  :
                stat.color === "green" ? "bg-green-50 text-green-600" :
                stat.color === "amber" ? "bg-amber-50 text-amber-600" :
                                         "bg-blue-50  text-blue-600"
              }`}>
                <MS icon={stat.icon} style={{ fontSize: 20 }} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <MS icon="person_search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: 18 }} />
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-slate-50/50 transition-all"
                placeholder="Search by name, role, or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3">
              <select
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-slate-50/50 transition-all"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                {["All Departments","Cardiology","Pediatrics","Emergency Medicine","Neurology","Surgery","ICU"].map(d=>(
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-slate-50/50 transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {["Any Status","On Duty","Off Duty","On Break","In Surgery"].map(s=>(
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <button className="w-full py-2.5 px-3 border-2 border-teal-500 text-teal-600 font-bold text-sm rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                <MS icon="filter_list" style={{ fontSize: 16 }} />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-200">
                  <th className="px-6 py-3.5">Staff Member</th>
                  <th className="px-6 py-3.5">Role & Dept</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Performance</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                      <MS icon="search_off" style={{ fontSize: 32, display: "block", margin: "0 auto 8px" }} />
                      No staff members match your filters.
                    </td>
                  </tr>
                ) : filtered.map((s, i) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                            {s.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${s.online ? "bg-green-400" : "bg-slate-300"}`} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                          <p className="text-xs text-slate-400">ID: {s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700">{s.role}</p>
                      <p className="text-xs text-slate-400">{s.dept}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${STATUS_COLORS[s.statusColor]}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${s.perf}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{s.perf}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="View Profile">
                          <MS icon="visibility" style={{ fontSize: 18 }} />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                          <MS icon="edit" style={{ fontSize: 18 }} />
                        </button>
                        <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Schedule">
                          <MS icon="calendar_month" style={{ fontSize: 18 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-600">{STAFF.length}</span> staff members
            </p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                Previous
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <StaffRegistrationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
