
import './SignUp.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from 'react';


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else{
  firebase.app();
}
const SignUp = () => {
  const [user,setUser] =useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSingIn =() =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then (res =>{
      const {displayName,email} =res.user;
      const signedInUser ={
        isSignedIn: true,
        name:displayName,
        email:email,
      }
      setUser(signedInUser)
      console.log(displayName,email)

    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }
  const handleSignOut =() =>{
    firebase.auth().signOut()
    .then(res => {
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
  .then((result) => {

    var user = result.user;
    console.log('fb user after sign in',user)

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
    if(user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    console.log(res.user)
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
if(!user.email && user.password){
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    const newUserInfo = {...user}
    newUserInfo.error ='';
    newUserInfo.success = true;
    setUser(newUserInfo);
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
      <div className="SignUp">
        <form className="SignUp-form" onSubmit={handleSubmit}>

        
      <input type="text" onBlur={handleBlur} name="name"  required placeholder="Your Name" />
      {/* {errors.name && <span className="error">Name is required</span>} */}
      
      <input type="text" onBlur={handleBlur} name="email"  required placeholder="Your Email" />
      {/* {errors.email && <span className="error">Username or Email is required</span>} */}
      
      <input type="password" onBlur={handleBlur} name="password"  required placeholder="Password" />
      {/* {errors.password && <span className="error">Password is required</span>} */}
      
      <input type="password" onBlur={handleBlur} name="confirmpassword"  required placeholder="Confirm Password" />
      {/* {errors.confirmpassword && <span className="error">Confirm Password is required</span>} */}
     
     <input className="btn-primary" type="submit" value="Create An Account"/>
     <p style={{color:'red'}}>{user.error}</p>
     {
       user.success &&  <p style={{color:'green'}}>User {user.email ? 'created' : 'Logged in'} successfully </p>
     }
      <p style={{color:'black'}}>You have an account ? <a href="/LogIn">Login account</a></p>
      <br/>
      <button onClick={handleFbSignin} className="social-media"> Continue with Facebook</button>
     
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

export default SignUp;