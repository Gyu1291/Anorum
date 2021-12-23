import React from "react";
import { storageService, dbService } from "mybase";
import {v4 as uuidv4} from "uuid";
const TweetFactory = ({userObj}) =>{
    const [tweet, setTweet] = useState("");
    const [imgfile, setImgfile] = useState("");


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

    const clearPhoto = () => setImgfile(null);




    return (
    <form onSubmit={onSubmit}>
        <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}></input>
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="tweet"></input>
        {imgfile && 
        <>
            <img src={imgfile} width='50px' height='50px'/>
            <button onClick={clearPhoto}>Clear</button>
        </>
        }
    
    </form>);
}
export default TweetFactory;