import React, { useState, useEffect } from 'react'
import '../styles/Chat.css'
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { SearchOutlined } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import db from '../firebase/firebase';

function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen ....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className="chat__name">
                        Julhas Hossain
                    </span>
                    Hey Guys
                    <span className="chat__timestamp">
                        5.56pm
                    </span>

                </p>

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form action="">
                    <input
                        type="text"
                        value={input}
                        placeholder="Type a message"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={sendMessage}
                        type="submit"
                    >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat