import React, { useEffect, useState } from "react";
import { backlog, cancelled, inProgress, toDo, urgentPriorityGrey, highPriority, mediumPriority, lowPriority, noPriority, circle } from "../assets";
import Avatar from "./Avatar";
import "./Card.css"; 

function Card({ ticket, users, page }) {
  const [showPriority, setShowPriority] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const [progress, setProgress] = useState();
  const [urgency, setUrgency] = useState();
  const { id, title, tag, userId, status, priority } = ticket;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = getUserDetails(userId);
    if (user) {
      setUserDetails(user);
    }
    getProgress();
    getUrgency();
    getHiddenElements();
  }, [userId, users]);

  const getUserDetails = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getProgress = () => {
    switch (status) {
      case "Todo":
        setProgress(toDo);
        break;
      case "In progress":
        setProgress(inProgress);
        break;
      case "Backlog":
        setProgress(backlog);
        break;
      case "Cancelled":
        setProgress(cancelled);
        break;
      default:
        break;
    }
  };

  const getUrgency = () => {
    switch (priority) {
      case 4:
        setUrgency(urgentPriorityGrey);
        break;
      case 3:
        setUrgency(highPriority);
        break;
      case 2:
        setUrgency(mediumPriority);
        break;
      case 1:
        setUrgency(lowPriority);
        break;
      case 0:
        setUrgency(noPriority);
        break;
      default:
        break;
    }
  };

  const getHiddenElements = () => {
    switch (page) {
      case "prioritypage":
        setShowPriority(false);
        break;
      case "statuspage":
        setShowStatus(false);
        break;
      case "userpage":
        setShowAvatar(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card">
      {/* Row 1 */}
      <div className="row row-1">
        <div className="card-id">{id || "CAM-11"}</div>
        <div>
          {showAvatar && userDetails && (
            <Avatar name={userDetails.name} available={userDetails.available} />
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="row row-2">
        {showStatus && (
          <div className="status-icon">
            <img className="status-img" src={progress} alt="progress" />
          </div>
        )}
        <p className="card-title">{title || "Update user profile UI"}</p>
      </div>

      {/* Row 3 */}
      <div className="row row-3">
        {showPriority && (
          <div className="priority-icon">
            <img className="priority-img" src={urgency} alt="urgency" />
          </div>
        )}
        <div className="tag-icon">
          <img src={circle} alt="tag" />
          <p className="tag-text">{tag || "Tags"}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;