import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// formData now includes: { name, email, password, staffId, department, role, etc. }
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

// Add this to fetch the list for your StaffOverview page
export const fetchStaff = () => API.get('/auth/users'); 

export default API;