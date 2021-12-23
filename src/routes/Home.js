import { dbService, storageService } from "mybase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDoc, getDocsFromCache, query, getDocs, onSnapshot } from "firebase/firestore";
import { map } from "@firebase/util";
import Tweet from "./tweet";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [imgfile, setImgfile] = useState("");


    useEffect(()=>{
        onSnapshot(collection(dbService,'tweet'),(snapshot)=>{
            const tweetArray = snapshot.docs.map(doc=>({id:doc.id,...doc.data(),}));
            setTweets(tweetArray);
        });
    }, []);

    const onSubmit = async (event) =>{
        event.preventDefault();
        let imgUrl = "";
        if (imgfile!==""){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(imgfile, "data_url");
            imgUrl = await response.ref.getDownloadURL()
        }

        const post = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            imgUrl,
        }
        await addDoc(collection(dbService, "tweet"), post)
        setTweet('');
        setImgfile('');
        // const DocRef = await addDoc(collection(dbService,"tweet"),{
        //     text: tweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // setTweet("")
    };
    const onChange = (event) =>{
        const {target:{value},} = event;
        setTweet(value);
    };
    const onFileChange = (event) =>{
        const {
            target: {files},
        }=event;
    
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
        const{
            currentTarget: {result},
        }=finishedEvent;
        setImgfile(result);
    }
    reader.readAsDataURL(theFile);
    }

    const clearPhoto = () => setImgfile("");
    // opacity:0은 뭔지 알아보기
    //onClick={clearPhoto()} 문제 해결하기
    return(
    <div className="container">    
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    type="text"
                    value={tweet}
                    placeholder="What's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    className="factoryInput__input">
                    </input>
                <input type="submit" value="&rarr;" className="factoryInput__arrow"></input>
            </div>
            <label for='attach-file' className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            
            <input id='attach-file' type="file" accept="image/*" onChange={onFileChange} style={{opacity:0,}}/>
                
                {imgfile && 

                    (<div className="factoryForm__attachment">
                        <img src={imgfile} style={{backgoundImage: imgfile,}}/>
                        <div className="factoryForm__clear" onClick={clearPhoto} >
                            <span >Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>)

                }
            
        </form>
        <div key={tweet.id} style={{marginTop: 30}}>
            {tweets.map(tweet=>
                <Tweet tweetObj={tweet} isOwner={tweet.creatorId===userObj.uid}/>)}
        </div>
    </div>
    
    );
}

export default Home;