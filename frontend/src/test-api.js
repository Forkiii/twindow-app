import { authAPI } from './services/api';

// Test signup
const testSignup = async () => {
  try {
    const data = await authAPI.signup('username111', 'asd');
    console.log('✅ Signup Success:', data);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log('❌ Signup Error:', error.message);
  }
};

// Test login
const testLogin = async () => {
  try {
    const data = await authAPI.login('username111', 'asd');
    console.log('✅ Login Success:', data);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log('❌ Login Error:', error.message);
  }
};

// Test verify
const testVerify = async () => {
  try {
    const data = await authAPI.verify();
    console.log('✅ Verify Success:', data);
  } catch (error) { 
    console.log('❌ Verify Error:', error.message);
  }
};

// Run tests
// testSignup();
// testLogin();
testVerify();