import { authAPI, userAPI } from './services/api';

// Test signup
const testSignup = async () => {
  try {
    const data = await authAPI.signup('testOne', 'asd');
    console.log('✅ Signup Success:', data);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log('❌ Signup Error:', error.message);
  }
};

// Test login
const testLogin = async () => {
  try {
    const data = await authAPI.login('testOne', 'asd');
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


const testCreateFriendRequest = async()=>{
  try{
    const data= await userAPI.createFriendRequest("testOne");
    console.log('✅  Success:',data);
    
  }catch(error){
    console.log('❌ Error:', error.message);
    
  }
}
const testReject = async()=>{
  try{
    const data= await userAPI.rejectFriendRequest('testOne'); 
    console.log('✅  Success:',data);
    
  }catch(error){
    console.log('❌ Error:', error.message);
    
  }
}

const testRemove= async () => {
  try {
    const data= await userAPI.removeFriend('testOne'); 
    console.log('✅  Remove Success:',data);

  } catch (error) {
    console.log('❌ Remove  Error:', error.message);
    
  }
}

const testGetRequests= async () => {
  try {
    const data= await userAPI.getFriendRequests(); 
    console.log('✅  getFriendsRequests Success:',data);
  } catch (error) {
    console.log('❌  getFriendsRequests  Error:', error.message);
    
  }
} 

const testGetFriends= async () => {
  try {
    const data= await userAPI.getFriends(); 
    console.log('✅  getFriends  Success:',data);
  } catch (error) {
    console.log('❌ getFriends  Error:', error.message);
    
  }
} 
// Run tests
// testSignup();
// testLogin();
// testVerify();
// await testCreateFriendRequest()
//  testAccept()
// testReject()
// testRemove();
// testGetRequests();
// testGetFriends();