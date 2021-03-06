import firebase from "firebase/app";
import "firebase/auth";
import './Login.css'
import firebaseConfig from "./firebase.config";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else{
  firebase.app();
}

const Login = () => {
 const [newUser,setNewUser] = useState(false)
  const [user,setUser] =useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  });
  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSingIn =() =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then (res =>{
      // handleResponse(res,true)
      const {displayName,email,photoURL} =res.user;
      const signedInUser ={
        isSignedIn: true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser)
      console.log(displayName,email,photoURL)

    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }
//   const handleResponse = (res ,redirect) =>{
//     setUser(res);
//    setLoggedInUser(res)
//    if(redirect){
       
//    history.replace(from)
//    }
// }
  const handleSignOut =() =>{
    firebase.auth().signOut()
    .then(res => {
      // handleResponse(res,true)
        const signOutuser = {
          isSignedIn: false,
          name:'',
          email:'',
          error:'',
          success: false
        }
        setUser(signOutuser)
        console.log(res)
    })
    .catch(err => {

    })
  }
  const handleBlur =(e)=> {
    let isFieldValid = true;
    if(e.target.name === 'email'){
    isFieldValid =/\S+@\S+\.\S+/.test(e.target.value)
  
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =/\d{1}/.test(e.target.value)
      isFieldValid= isPasswordValid && passwordHasNumber
      
    }
    if(isFieldValid){
      const newUserInfo ={...user};
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  const handleFbSignin= () =>{
    firebase.auth().signInWithPopup(fbProvider)
  .then((res) => {
    var credential = res.credential;
    // handleResponse(res,true)
    var user = res.user;
    console.log('fb user after sign in',user)
    var accessToken = credential.accessToken;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

    console.log(credential,errorMessage,errorCode,email)
  });
  }
  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    // handleResponse(res,true)
    // console.log(res.user)
    const newUserInfo = {...user}
    newUserInfo.error ='';
    newUserInfo.success = true;
    setUser(newUserInfo);
    updateUserName(user.name)
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error =error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
    }
  
if(!newUser && user.email && user.password){
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    // handleResponse(res,true)
    const newUserInfo = {...user}
    newUserInfo.error ='';
    newUserInfo.success = true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo)
    history.replace(from);
    console.log('sign in user info',res.user)
  }) 
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error =error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
}

    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name
  }).then(function() {
    console.log('user name updated successfully')
  }).catch(function(error) {
    console.log(error)
  });
  }

  return (
      <div className="login">
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUer">New User Sign up</label>
        <form className="login-form" onSubmit={handleSubmit}>
        {newUser &&  <input name="name"  onBlur={handleBlur} type="text" placeholder="Your Name"/>}
         <input type="text" onBlur={handleBlur} name="email"  required placeholder="Your Email" />
      
      <input type="password" onBlur={handleBlur} name="password"  required placeholder="Password" />
      {/* {errors.password && <span className="error">Password is required</span>} */}
     
      <input  className="btn-primary" type="submit" value="Login"/>
      <p style={{color:'red'}}>{user.error}</p>
     {
       user.success &&  <p style={{color:'green'}}>User {user.email ? 'created' : 'Logged in'} successfully </p>
     }
      <p>Don't have an account ? <a href="/signUp">create an account</a></p>
      <br/>
      
     
      <button onClick={handleFbSignin} className="social-media">Continue with Facebook</button>

      <br/>     
     {
       user.isSignedIn ? <button onCkick={handleSignOut}>Sign out</button> :
      <button onClick={handleGoogleSingIn} className="social-media">Continue with Google</button>
     }
      
    </form>
    {
        user.isSignedIn &&  <div>
           <p>Welcome, {user.name}</p>
            <p>Your email: {user.email}</p>
           </div>
      }

      </div>

      
   
  );

};

export default Login;
