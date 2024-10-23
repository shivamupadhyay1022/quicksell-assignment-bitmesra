import React, { useState, useEffect } from "react";
import {
  add,
  backlog,
  cancelled,
  done,
  dotmenu,
  inProgress,
  toDo,
} from "./../assets";
import Card from "./../components/Card";
import "./Statuspage.css";

function Statuspage() {

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [sortedTickets, setSortedTickets] = useState([]);
    const [sortOption, setSortOption] = useState("Priority");
  
    useEffect(() => {
      fetchData();
      getOptions();
      const grouped = groupTicketsByStatus();
      const sortedGroupedTickets = {};
  
      Object.keys(grouped).forEach((status) => {
        sortedGroupedTickets[status] = sortTickets(grouped[status], sortOption);
      });
  
      setSortedTickets(sortedGroupedTickets);
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
  
    const groupTicketsByStatus = () => {
      const grouped = {
        "Backlog": [],
        "Todo": [],
        "In progress": [],
        "Done": [],
        "Cancelled": [],
      };
  
      tickets.forEach((ticket) => {
        const { status } = ticket;
        if (grouped[status]) {
          grouped[status].push(ticket);
        }
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
    {/* Column 1: Backlog */}
    <div className="prioritypage-column">
      <div className="prioritypage-header">
        <div className="statuspage-header-title">
          <img className="icon-small" src={backlog} alt="Backlog" />
          <span>Backlog</span>
          <span className="prioritypage-count">
            ({sortedTickets["Backlog"]?.length || 0})
          </span>
        </div>
        <div className="prioritypage-header-menu">
          <img className="icon-small" src={add} alt="Add" />
          <img className="icon-small" src={dotmenu} alt="Menu" />
        </div>
      </div>
      <div className="prioritypage-cards">
        {sortedTickets["Backlog"]?.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} page={"statuspage"} />
        ))}
      </div>
    </div>

    {/* Column 2: Todo */}
    <div className="prioritypage-column">
      <div className="prioritypage-header">
        <div className="statuspage-header-title">
          <img className="icon-small" src={toDo} alt="Todo" />
          <span>Todo</span>
          <span className="statuspage-count">
            ({sortedTickets["Todo"]?.length || 0})
          </span>
        </div>
        <div className="prioritypage-header-menu">
          <img className="icon-small" src={add} alt="Add" />
          <img className="icon-small" src={dotmenu} alt="Menu" />
        </div>
      </div>
      <div className="statuspage-cards">
        {sortedTickets["Todo"]?.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} page={"statuspage"} />
        ))}
      </div>
    </div>
    {/* Column 3: In progress */}
    <div className="prioritypage-column">
      <div className="prioritypage-header">
        <div className="statuspage-header-title">
          <img className="icon-small" src={inProgress} alt="in progress" />
          <span>In progress</span>
          <span className="statuspage-count">
            ({sortedTickets["In progress"]?.length || 0})
          </span>
        </div>
        <div className="prioritypage-header-menu">
          <img className="icon-small" src={add} alt="Add" />
          <img className="icon-small" src={dotmenu} alt="Menu" />
        </div>
      </div>
      <div className="statuspage-cards">
        {sortedTickets["In progress"]?.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} page={"statuspage"} />
        ))}
      </div>
    </div>
    {/* Column 4: Done */}
    <div className="prioritypage-column">
      <div className="prioritypage-header">
        <div className="statuspage-header-title">
          <img className="icon-small" src={done} alt="done" />
          <span>Done</span>
          <span className="statuspage-count">
            ({sortedTickets["Done"]?.length || 0})
          </span>
        </div>
        <div className="prioritypage-header-menu">
          <img className="icon-small" src={add} alt="Add" />
          <img className="icon-small" src={dotmenu} alt="Menu" />
        </div>
      </div>
      <div className="statuspage-cards">
        {sortedTickets["Done"]?.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} page={"statuspage"} />
        ))}
      </div>
    </div>
    {/* Column 5: Cancelled */}
    <div className="prioritypage-column">
      <div className="prioritypage-header">
        <div className="statuspage-header-title">
          <img className="icon-small" src={cancelled} alt="cancelled" />
          <span>Cancelled</span>
          <span className="statuspage-count">
            ({sortedTickets["Cancelled"]?.length || 0})
          </span>
        </div>
        <div className="prioritypage-header-menu">
          <img className="icon-small" src={add} alt="Add" />
          <img className="icon-small" src={dotmenu} alt="Menu" />
        </div>
      </div>
      <div className="statuspage-cards">
        {sortedTickets["Cancelled"]?.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} users={users} page={"statuspage"} />
        ))}
      </div>
    </div>

    {/* Repeat similar structure for other columns */}
  </div>
  )
}

export default Statuspage