import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import mybase from "../mybase";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
                {isLoggedIn ? (
                    <div style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                        }}>
                        <Routes>
                            <Route exact path = "/" element={<Home userObj={userObj}/>}></Route>
                            <Route exact path = "/profile" element={<Profile userObj={userObj}/>}/>
                        </Routes>
                    </div>    
                )
                : (
                    <Routes>
                        <Route exact path = "/" element={<Auth />}/>
                    </Routes>
                )}
                
            
        </Router>
        // 위의 코드는 isLoggedIn이 True이면 Home을, 아니면 Auth를 반환
    )
}

export default AppRouter;