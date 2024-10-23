import React, { useState } from "react";
import { circle, circleavail } from "../assets";
import "./Avatar.css"; 

function Avatar({ name, available }) {
  const [availability] = useState(true);

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : "");
    return initials.toUpperCase();
  };

  const getColorFromName = (name) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA833", "#8E44AD"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const backgroundColor = getColorFromName(name);

  return (
    <div className="avatar">
      <div
        className="avatar-initials"
        style={{ backgroundColor }}
      >
        {initials}
      </div>
      <img
        src={available ? circleavail : circle}
        alt="availability"
        className="avatar-status"
      />
    </div>
  );
}

export default Avatar;
