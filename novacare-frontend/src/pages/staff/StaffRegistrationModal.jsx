import { useState, useEffect } from "react";
import { signUp } from "../../api/axios"; // Ensure this path matches your file structure

const MS = ({ icon, className = "", style = {} }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}
  >
    {icon}
  </span>
);

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-white transition-all w-full";

export default function StaffRegistrationModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);

  // Consolidated Form State
  const [formData, setFormData] = useState({
    name: "", // We will combine first, middle, last name before sending
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "Password123!", // Default password
    gender: "",
    dob: "",
    phone: "",
    nationalId: "",
    kraPin: "",
    nhif: "",
    nssf: "",
    county: "",
    town: "",
    street: "",
    staffId: "NC-" + Math.floor(1000 + Math.random() * 9000),
    role: "staff",
    department: "",
    dateOfHire: new Date().toISOString().split('T')[0],
    employmentType: "Full-time",
    designation: "",
    specialization: "",
    shift: "Morning",
    systemAccess: true,
    emergencyName: "",
    emergencyRelation: "Spouse",
    emergencyPhone: ""
  });

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setMounted(false), 300);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const autoGenId = () => {
    const newId = "NC-" + Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, staffId: newId }));
  };



  if (!mounted) return null;

  const tabs = [
    { id: "personal",    label: "Personal",    icon: "person"      },
    { id: "employment",  label: "Employment",  icon: "work"        },
    { id: "professional",label: "Professional",icon: "school"      },
    { id: "access",      label: "Access",      icon: "lock"        },
  ];

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col transition-all duration-300 ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm">
              <MS icon="person_add" className="text-white" style={{ fontSize: 18 }} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base leading-tight">Staff Registration</h2>
              <p className="text-xs text-slate-400">Onboard new personnel</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-all">
            <MS icon="close" style={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 px-6 pt-4 pb-0 flex-shrink-0 border-b border-slate-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 -mb-px ${
                activeTab === t.id ? "text-teal-600 border-teal-600 bg-teal-50/50" : "text-slate-500 border-transparent"
              }`}
            >
              <MS icon={t.icon} style={{ fontSize: 15 }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === "personal" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <Field label="First Name" required><input name="firstName" value={formData.firstName} onChange={handleChange} className={inputCls} placeholder="John" /></Field>
                <Field label="Middle Name"><input name="middleName" value={formData.middleName} onChange={handleChange} className={inputCls} placeholder="Kip" /></Field>
                <Field label="Last Name" required><input name="lastName" value={formData.lastName} onChange={handleChange} className={inputCls} placeholder="Bett" /></Field>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Gender" required>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={inputCls}>
                    <option value="">Select</option>
                    <option value="Male">Male</option><option value="Female">Female</option>
                  </select>
                </Field>
                <Field label="Date of Birth" required><input name="dob" value={formData.dob} onChange={handleChange} className={inputCls} type="date" /></Field>
                <Field label="Phone Number" required><input name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+254" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="National ID" required><input name="nationalId" value={formData.nationalId} onChange={handleChange} className={inputCls} /></Field>
                <Field label="Email Address" required><input name="email" value={formData.email} onChange={handleChange} className={inputCls} type="email" /></Field>
              </div>
            </div>
          )}

          {activeTab === "employment" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Staff ID" required>
                  <div className="flex gap-2">
                    <input name="staffId" value={formData.staffId} readOnly className={`${inputCls} bg-slate-50 font-mono`} />
                    <button onClick={autoGenId} className="px-3 py-2 text-xs font-semibold border border-teal-500 text-teal-600 rounded-lg whitespace-nowrap">Auto-Gen</button>
                  </div>
                </Field>
                <Field label="Role" required>
                  <select name="role" value={formData.role} onChange={handleChange} className={inputCls}>
                    <option value="staff">Staff</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Admin</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Department" required>
                  <select name="department" value={formData.department} onChange={handleChange} className={inputCls}>
                    <option value="">Select Department</option>
                    <option value="Outpatient">Outpatient</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Laboratory">Laboratory</option>
                  </select>
                </Field>
                <Field label="Date of Hire"><input name="dateOfHire" value={formData.dateOfHire} onChange={handleChange} className={inputCls} type="date" /></Field>
              </div>
              <Field label="Work Shift">
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {["Morning", "Evening", "Night"].map((s) => (
                    <button key={s} onClick={() => setFormData(p => ({...p, shift: s}))}
                      className={`py-2 px-3 border-2 rounded-xl text-sm font-semibold transition-all ${formData.shift === s ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-200 text-slate-500"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {activeTab === "professional" && (
            <div className="space-y-5">
              <Field label="Specialization">
                <input name="specialization" value={formData.specialization} onChange={handleChange} className={inputCls} placeholder="e.g. Oncology" />
              </Field>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50">
                <MS icon="cloud_upload" className="text-slate-400 mb-2" style={{ fontSize: 36 }} />
                <p className="text-sm text-slate-600">Document Upload ready for завтра</p>
              </div>
            </div>
          )}

          {activeTab === "access" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Enable System Access</p>
                  <p className="text-xs text-slate-400">Allow staff to log into portal</p>
                </div>
                <button onClick={() => setFormData(p => ({...p, systemAccess: !p.systemAccess}))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${formData.systemAccess ? "bg-teal-600" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${formData.systemAccess ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-4">Emergency Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" required><input name="emergencyName" value={formData.emergencyName} onChange={handleChange} className={inputCls} /></Field>
                  <Field label="Phone" required><input name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className={inputCls} /></Field>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <div className="flex gap-2">
            {tabs.map((t) => (
              <div key={t.id} className={`w-2 h-2 rounded-full transition-all ${activeTab === t.id ? "bg-teal-600 w-5" : "bg-slate-200"}`} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 border rounded-lg">Cancel</button>
            {activeTab !== "access" ? (
              <button onClick={() => {
                const order = ["personal","employment","professional","access"];
                setActiveTab(order[order.indexOf(activeTab) + 1]);
              }} className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg flex items-center gap-1.5">
                Next <MS icon="arrow_forward" style={{ fontSize: 16 }} />
              </button>
            ) : (
              <button 
                onClick={handleCompleteRegistration}
                disabled={loading}
                className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {loading ? "Saving..." : <><MS icon="save" style={{ fontSize: 16 }} /> Save Staff Record</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}