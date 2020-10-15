import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectChannelID, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import firebase from "../../../node_modules/firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelID = useSelector(selectChannelID);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelID) {
      db.collection("channels")
        .doc(channelID)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelID]);

  const sendMessages = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelID).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  console.log(messages);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />

        <form>
          <input
            value={input}
            disabled={!channelName}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              channelName ? `Message #${channelName}` : "Message disabled"
            }
          />
          <button
            type="submit"
            className="chat__inputButton"
            disabled={!channelName}
            onClick={sendMessages}
          >
            Send Chat
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
