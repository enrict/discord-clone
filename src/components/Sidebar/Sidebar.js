import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import { Headset, Mic, Settings } from "@material-ui/icons";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../../firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const handleAddChannel = () => {
    const channelName = prompt("Create new HyperChatroom");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>enrictrillo.com</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Hyper Chats</h4>
          </div>

          <AddIcon className="sidebar__addChannel" onClick={handleAddChannel} />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photoURL} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>In Lobby [2/4] - Fortnite</p>
        </div>

        <div className="sidebar__profileIcons">
          <Mic className="sidebar__profileMicIcon" />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
