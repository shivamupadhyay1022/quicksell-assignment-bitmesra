import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import { add, dotmenu } from "./../assets";
import Card from "../components/Card";
import "./Userpage.css"; 

function Userpage() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedTickets, setSortedTickets] = useState({});
  const [sortOption, setSortOption] = useState("Priority");

  useEffect(() => {
    fetchData();
    getOptions();
    if (tickets.length && users.length) {
      const grouped = groupTicketsByUser();
      const sortedGroupedTickets = {};

      Object.keys(grouped).forEach((userId) => {
        sortedGroupedTickets[userId] = sortTickets(grouped[userId], sortOption);
      });

      setSortedTickets(sortedGroupedTickets);
    }
  }, [tickets, sortOption]);

  async function getOptions() {
    const sort_option = await window.localStorage.getItem("Sorting_option");
    if (sort_option !== null) {
      setSortOption(JSON.parse(sort_option));
    } else {
      window.localStorage.setItem("Sorting_option", JSON.stringify("Priority"));
      setSortOption("Priority");
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const result = await response.json();
      setTickets(result.tickets);
      setUsers(result.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupTicketsByUser = () => {
    const grouped = {};

    users.forEach((user) => {
      grouped[user.id] = tickets.filter((ticket) => ticket.userId === user.id);
    });

    return grouped;
  };

  const sortTickets = (ticketsArray, option) => {
    return ticketsArray.sort((a, b) => {
      if (option === "Priority") {
        return b.priority - a.priority;
      } else if (option === "Title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="prioritypage-grid">
      {users.map((user) => (
        <div key={user.id} className="prioritypage-column">
          <div className="prioritypage-header">
            <div className="prioritypage-header-title">
              <Avatar name={user.name} available={user.available} />
              <span className="userpage-name">{user.name}</span>
              <span className="userpage-count">
                {sortedTickets[user.id]?.length || 0}
              </span>
            </div>
            <div className="userpage-header-menu">
              <img className="icon-small" src={add} alt="Add" />
              <img className="icon-small" src={dotmenu} alt="Menu" />
            </div>
          </div>
          <div className="prioritypage-cards">
            {sortedTickets[user.id]?.map((ticket) => (
              <Card key={ticket.id} ticket={ticket} users={users} page={"userpage"} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Userpage;
