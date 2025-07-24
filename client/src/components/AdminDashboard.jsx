// client/src/components/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from '../api/auth';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  useEffect(()=>{
    const user = localStorage.getItem('adminUser');
    const pw = localStorage.getItem('adminPw');
    const auth = 'Basic ' + btoa(user + ':' + pw);
    axios.get('/data', { headers: { Authorization: auth } })
      .then(r=>setEntries(r.data));
  },[]);

  function handleDownload() {
    const user = localStorage.getItem('adminUser');
    const pw = localStorage.getItem('adminPw');
    const auth = 'Basic ' + btoa(user + ':' + pw);
    window.open(`http://localhost:5000/api/data/export`, '_blank');
  }

  // Visualization: Entries per day
  const dateCounts = {};
  const skillCounts = {};
  const genderCounts = { Male: 0, Female: 0, Other: 0 };
  entries.forEach(e => {
    const d = new Date(e.createdAt).toLocaleDateString();
    dateCounts[d] = (dateCounts[d] || 0) + 1;
    (e.skills || []).forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
    if (e.gender) genderCounts[e.gender] = (genderCounts[e.gender] || 0) + 1;
  });
  const chartData = {
    labels: Object.keys(dateCounts),
    datasets: [
      {
        label: 'Entries per Day',
        data: Object.values(dateCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };
  const skillData = {
    labels: Object.keys(skillCounts),
    datasets: [
      {
        label: 'Skills Distribution',
        data: Object.values(skillCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };
  const genderData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      padding: '2rem 0',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem 1rem',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem',marginBottom:'2rem'}}>
          <h2 style={{color:'#1a237e',fontWeight:700,fontSize:'2rem',marginBottom:0}}>All Entries</h2>
          <button onClick={handleDownload} style={{
            padding: '0.7rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
          }}>Download CSV</button>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'2rem',marginBottom:'2rem'}}>
          <div style={{width:'100%',maxWidth:600,minWidth:260,background:'#f5f7fa',borderRadius:12,padding:'1rem'}}>
            <Bar data={chartData} options={{responsive:true,plugins:{legend:{display:true},title:{display:true,text:'Entries per Day'}}}} />
          </div>
          <div style={{width:300,minWidth:220,background:'#f5f7fa',borderRadius:12,padding:'1rem'}}>
            <Pie data={skillData} options={{plugins:{title:{display:true,text:'Skills Distribution'}}}} />
          </div>
          <div style={{width:300,minWidth:220,background:'#f5f7fa',borderRadius:12,padding:'1rem'}}>
            <Pie data={genderData} options={{plugins:{title:{display:true,text:'Gender Distribution'}}}} />
          </div>
        </div>
        <div style={{overflowX:'auto',marginTop:'2rem'}}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.98rem',
            background: '#fafbfc',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <thead style={{background:'#e3eafc'}}>
              <tr>
                <th style={{padding:'0.7rem',fontWeight:700}}>Full Name</th>
                <th>DOB</th><th>Gender</th><th>Contact</th><th>Email</th><th>Address</th><th>ID Proof</th><th>Marital Status</th><th>Family Members</th><th>Occupation</th><th>Income</th><th>Education</th><th>Joining As</th><th>Support Needed</th><th>Languages</th><th>Skills</th><th>Skills Level</th><th>Preferred Training</th><th>Digital Literacy</th><th>Health Concerns</th><th>Status</th><th>Availability</th><th>Emergency Name</th><th>Emergency Relation</th><th>Emergency Contact</th><th>Declaration</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e=>(
                <tr key={e._id} style={{background:'#fff',borderBottom:'1px solid #e0e0e0'}}>
                  <td style={{padding:'0.6rem'}}>{e.fullName}</td>
                  <td>{e.dob ? new Date(e.dob).toLocaleDateString() : ''}</td>
                  <td>{e.gender}</td>
                  <td>{e.contact}</td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.idProof}</td>
                  <td>{e.maritalStatus}</td>
                  <td>{e.familyMembers}</td>
                  <td>{e.occupation}</td>
                  <td>{e.income}</td>
                  <td>{e.education}</td>
                  <td>{e.joiningAs}</td>
                  <td>{e.supportNeeded}</td>
                  <td>{Array.isArray(e.languages) ? e.languages.join(', ') : e.languages}</td>
                  <td>{Array.isArray(e.skills) ? e.skills.join(', ') : e.skills}</td>
                  <td>{e.skillsLevel}</td>
                  <td>{e.preferredTraining}</td>
                  <td>{e.digitalLiteracy}</td>
                  <td>{e.healthConcerns}</td>
                  <td>{e.refugeeStatus}</td>
                  <td>{e.availability}</td>
                  <td>{e.emergencyName}</td>
                  <td>{e.emergencyRelation}</td>
                  <td>{e.emergencyContact}</td>
                  <td>{e.declaration ? 'Yes' : 'No'}</td>
                  <td>{e.createdAt ? new Date(e.createdAt).toLocaleString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
