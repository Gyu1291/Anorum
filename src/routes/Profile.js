import React from "react";
import mybase, { dbService } from "mybase";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const authService = getAuth(mybase)
export default ({userObj}) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMypost = async() =>{
        const tweets = await getDocs(query(collection(dbService, 'tweet'), where('creatorId', '==', userObj.uid), orderBy('createdAt')));
        console.log(tweets.docs.map((doc)=>doc.data()))
    };
    useEffect(()=>{
        getMypost();
    },[])
    return (
    <div className="container">
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    );
};