import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "mybase";
import React from "react";
import { useState } from "react/cjs/react.development";
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const deleteTweet = async() =>{
        const ok = window.confirm("정말로 삭제하시겠습니까?"); //confirm 공부하기
        if (ok){
            await deleteDoc(doc(dbService,'tweet',tweetObj.id));
            await storageService.refFromURL(tweetObj.imgUrl).delete();
        }
    }
    
    const editTweet = () =>{
        setEditing((prev)=> !prev);
    }
    const onChange = (event)=>{
        const{
            target:{value},
        } = event;
        setNewTweet(value);
    }

    const onSubmit=async(event)=>{
        event.preventDefault();
        await updateDoc(doc(dbService,'tweet',tweetObj.id), {
            text:newTweet
        })
        setEditing(false);
    }

    
    return (
        <div className="nweet">
            {editing===true ? <>
                {isOwner && (<>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" placeholder="Edit it!" value={newTweet}
                        required autoFocus
                        onChange={onChange} className="formInput"/>
                        <input type='submit' value="Update Tweet" className="formBtn"></input>
                        <button onClick={editTweet} className="formBtn cancelBtn">Cancel</button>
                    </form>
                </>)}
            </>:<>
            <div key={tweetObj.id}>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.imgUrl && <img src={tweetObj.imgUrl}/>}
                    {isOwner && <>
                    <div className="nweet__actions">
                        <span onClick={deleteTweet}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={editTweet}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                    </>}
                </div>
            </> }
        </div>
    );
    }

export default Tweet;