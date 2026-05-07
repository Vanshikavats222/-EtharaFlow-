import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });

  const handleAuth = async (e) => {
    e.preventDefault();
    const path = isLogin ? 'login' : 'signup';
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${path}`, formData);
      if (isLogin) {
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
      } else {
        alert("Account Created! Let's Login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Check Backend connection!");
    }
  };

  if (user) {
    return (
      <div style={{ padding: '40px', fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '25px' }}>
            <div>
              <h1 style={{ color: '#1e293b', margin: 0, fontSize: '28px', letterSpacing: '-1px' }}>Ethara<span style={{color: '#6366f1'}}>Flow</span></h1>
              <p style={{color: '#64748b', margin: '5px 0 0 0'}}>Enterprise Task Management</p>
            </div>
            <button onClick={() => setUser(null)} style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', transition: '0.3s' }}>Logout</button>
          </div>
          
          <div style={{ marginTop: '30px', padding: '30px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '20px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ margin: 0, fontSize: '24px' }}>Welcome back, {user.name}! 👋</h2>
            <p style={{ opacity: 0.9, marginTop: '8px' }}>You are currently logged in as <strong>{user.role}</strong></p>
            <div style={{position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '100px', opacity: 0.1}}>🚀</div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{ color: '#1e293b', fontSize: '20px' }}>{user.role === 'Admin' ? 'Management Console' : 'My Active Tasks'}</h3>
              <span style={{fontSize: '14px', color: '#64748b'}}>{new Date().toDateString()}</span>
            </div>

            {user.role === 'Admin' ? (
              <div style={{ padding: '40px', border: '2px dashed #e2e8f0', borderRadius: '24px', textAlign: 'center', backgroundColor: '#fcfcfd' }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>📂</div>
                <button style={{ backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '14px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  + Create New Project
                </button>
                <p style={{ color: '#64748b', marginTop: '15px', maxWidth: '300px', margin: '15px auto' }}>Ready to start something new? Create a project and assign your team.</p>
              </div>
            ) : (
              <div style={{ padding: '30px', border: '1px solid #e2e8f0', borderRadius: '20px', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{fontSize: '30px', marginBottom: '10px'}}>🏖️</div>
                All caught up! No tasks assigned to you at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
      <form onSubmit={handleAuth} style={{ backgroundColor: 'white', padding: '45px', borderRadius: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '420px' }}>
        <div style={{textAlign: 'center', marginBottom: '35px'}}>
           <h2 style={{ margin: 0, color: '#1e293b', fontSize: '26px' }}>{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
           <p style={{color: '#64748b', marginTop: '8px'}}>{isLogin ? 'Login to your account' : 'Join Ethara Flow today'}</p>
        </div>
        
        {!isLogin && (
          <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '14px', marginBottom: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', boxSizing: 'border-box' }} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        )}
        
        <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '14px', marginBottom: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', boxSizing: 'border-box' }} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        
        <input type="password" placeholder="Password" required style={{ width: '100%', padding: '14px', marginBottom: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', boxSizing: 'border-box' }} 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        
        {!isLogin && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Assign Role</label>
            <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="Member">Team Member</option>
              <option value="Admin">Project Admin</option>
            </select>
          </div>
        )}
        
        <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' }}>
          {isLogin ? "Don't have an account?" : "Already a member?"} 
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#6366f1', cursor: 'pointer', marginLeft: '6px', fontWeight: '700' }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default App;