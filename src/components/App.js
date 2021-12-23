import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import mybase from "mybase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function App(){
  const authService = getAuth(mybase)
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //이걸 지워버리고 userObj를 Boolean(userObj)로 해서 구분하는것도 가능하다
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }
      else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
  <>
  {init ? (
    
    <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj}/>
    
    
    
  
    ):(
    "Initializing..."
  )}
  
  <footer>&copy; Anorum {new Date().getFullYear()}</footer>
  </>);
}

export default App;
