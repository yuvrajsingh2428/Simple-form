// client/src/components/DataForm.jsx
import { useState } from 'react';
import axios from '../api/auth';

function showToast(msg, type = 'error') {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = type === 'error' ? '#d32f2f' : '#388e3c';
  toast.style.color = '#fff';
  toast.style.padding = '1rem 2rem';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = 9999;
  toast.style.fontSize = '1.1rem';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

const initialForm = {
  fullName: '',
  dob: '',
  gender: '',
  contact: '',
  email: '',
  address: '',
  idProof: '',
  maritalStatus: '',
  familyMembers: '',
  occupation: '',
  income: '',
  education: '',
  joiningAs: '',
  supportNeeded: '',
  languages: '',
  skills: '',
  skillsLevel: '',
  preferredTraining: '',
  digitalLiteracy: '',
  healthConcerns: '',
  refugeeStatus: '',
  availability: '',
  emergencyName: '',
  emergencyRelation: '',
  emergencyContact: '',
  declaration: false
};

function validate(form) {
  if (!form.fullName.trim()) return 'Full Name is required';
  if (!form.dob) return 'Date of Birth is required';
  if (!form.gender) return 'Gender is required';
  if (!/^\d{10,15}$/.test(form.contact)) return 'Contact must be 10-15 digits';
  if (!/^.+@.+\..+$/.test(form.email)) return 'Invalid email';
  if (!form.address.trim()) return 'Address is required';
  if (!form.idProof.trim()) return 'ID Proof is required';
  if (!form.maritalStatus) return 'Marital Status is required';
  if (!form.familyMembers || isNaN(form.familyMembers) || Number(form.familyMembers) < 0) return 'Family Members must be a non-negative number';
  if (!form.occupation.trim()) return 'Occupation is required';
  if (!form.income || isNaN(form.income) || Number(form.income) < 0) return 'Income must be a non-negative number';
  if (!form.education.trim()) return 'Education is required';
  if (!form.joiningAs) return 'Joining As is required';
  if (!form.supportNeeded.trim()) return 'Support Needed is required';
  if (!form.languages.trim()) return 'Languages are required';
  if (!form.skills.trim()) return 'Skills are required';
  if (!form.skillsLevel) return 'Skills Level is required';
  if (!form.digitalLiteracy) return 'Digital Literacy is required';
  if (!form.refugeeStatus) return 'Status is required';
  if (!form.availability.trim()) return 'Availability is required';
  if (!form.emergencyName.trim()) return 'Emergency Contact Name is required';
  if (!form.emergencyRelation.trim()) return 'Emergency Contact Relation is required';
  if (!/^\d{10,15}$/.test(form.emergencyContact)) return 'Emergency Contact must be 10-15 digits';
  if (!form.declaration) return 'You must accept the declaration';
  return null;
}

export default function DataForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const error = validate(form);
    if (error) {
      showToast(error, 'error');
      return;
    }
    setLoading(true);
    // Convert comma-separated to array for languages and skills
    const submitData = {
      ...form,
      languages: form.languages.split(',').map(s=>s.trim()).filter(Boolean),
      skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean),
      familyMembers: Number(form.familyMembers),
      income: Number(form.income)
    };
    try {
      await axios.post('/data', submitData);
      showToast('Form submitted successfully!', 'success');
      setForm(initialForm);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        showToast('Server: ' + err.response.data.message, 'error');
      } else {
        showToast('Submission failed. Please check your details.', 'error');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    }}>
      <form onSubmit={handleSubmit} className="data-form" style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 500,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem 1.5rem',
        alignItems: 'center',
      }}>
        <h2 style={{gridColumn: '1/3', textAlign: 'center', color: '#1a237e', fontWeight: 700, marginBottom: '1rem'}}>Enter Your Details</h2>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required style={{gridColumn:'1/3'}} />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Gender</option>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required style={{gridColumn:'1/3'}} />
        <input name="idProof" value={form.idProof} onChange={handleChange} placeholder="ID Proof (e.g. Aadhaar)" required />
        <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required>
          <option value="">Marital Status</option>
          <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
        </select>
        <input name="familyMembers" type="number" min="0" value={form.familyMembers} onChange={handleChange} placeholder="Family Members" required />
        <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" required />
        <input name="income" type="number" min="0" value={form.income} onChange={handleChange} placeholder="Monthly Income" required />
        <input name="education" value={form.education} onChange={handleChange} placeholder="Education" required />
        <select name="joiningAs" value={form.joiningAs} onChange={handleChange} required>
          <option value="">Joining As</option>
          <option>Learner</option><option>Trainer</option><option>Volunteer</option><option>Other</option>
        </select>
        <input name="supportNeeded" value={form.supportNeeded} onChange={handleChange} placeholder="Support Needed" required style={{gridColumn:'1/3'}} />
        <input name="languages" value={form.languages} onChange={handleChange} placeholder="Languages (comma separated)" required />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" required />
        <select name="skillsLevel" value={form.skillsLevel} onChange={handleChange} required>
          <option value="">Skills Level</option>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <input name="preferredTraining" value={form.preferredTraining} onChange={handleChange} placeholder="Preferred Training" />
        <select name="digitalLiteracy" value={form.digitalLiteracy} onChange={handleChange} required>
          <option value="">Digital Literacy</option>
          <option>None</option><option>Basic</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <input name="healthConcerns" value={form.healthConcerns} onChange={handleChange} placeholder="Health Concerns (if any)" style={{gridColumn:'1/3'}} />
        <select name="refugeeStatus" value={form.refugeeStatus} onChange={handleChange} required>
          <option value="">Status</option>
          <option>Citizen</option><option>Refugee</option><option>Displaced</option><option>Other</option>
        </select>
        <input name="availability" value={form.availability} onChange={handleChange} placeholder="Availability (e.g. Weekends)" required />
        <input name="emergencyName" value={form.emergencyName} onChange={handleChange} placeholder="Emergency Contact Name" required />
        <input name="emergencyRelation" value={form.emergencyRelation} onChange={handleChange} placeholder="Emergency Contact Relation" required />
        <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact Number" required />
        <label style={{display:'block',margin:'1rem 0',gridColumn:'1/3'}}>
          <input name="declaration" type="checkbox" checked={form.declaration} onChange={handleChange} required />
          I declare that the above information is true.
        </label>
        <button type="submit" style={{
          gridColumn:'1/3',
          padding: '0.9rem 0',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
          color: '#fff',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          marginTop: '0.5rem',
        }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
