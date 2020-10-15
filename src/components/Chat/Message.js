import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message() {
  return (
    <div className="message">
      <Avatar />
      <div className="message__info">
        <h4>
          rx2 <span className="message__timestamp">15</span>
        </h4>
        <p>this is messages component</p>
      </div>
    </div>
  );
}

export default Message;
