import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  add,
  dotmenu,
  highPriority,
  lowPriority,
  mediumPriority,
  noPriority,
  urgentPriorityColor,
} from "./../assets";
import "./Prioritypage.css"; 

function Prioritypage() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
    console.log(tickets);
    console.log(users);
  }, []);

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

  const getSortedTicketsByPriority = (priorityLevel) => {
    return tickets.filter((ticket) => ticket.priority === priorityLevel);
  };

  const renderCards = (tickets) => {
    return tickets.map((ticket) => (
      <Card key={ticket.id} ticket={ticket} users={users} page={"prioritypage"} />
    ));
  };

  return (
    <div className="prioritypage-grid">
      {/* No Priority Column */}
      <div className="prioritypage-column">
        <div className="prioritypage-header">
          <div className="statuspage-header-title">
            <img className="icon-small" src={noPriority} alt="No Priority" />
            <span>No Priority</span>
            <span className="prioritypage-count">
              {getSortedTicketsByPriority(0).length}
            </span>
          </div>
          <div className="prioritypage-header-menu">
            <img className="icon-small" src={add} alt="Add" />
            <img className="icon-small" src={dotmenu} alt="Menu" />
          </div>
        </div>
        <div className="prioritypage-cards">
          {renderCards(getSortedTicketsByPriority(0))}
        </div>
      </div>

      {/* Urgent Priority Column */}
      <div className="prioritypage-column">
        <div className="prioritypage-header">
          <div className="statuspage-header-title">
            <img className="icon-small" src={urgentPriorityColor} alt="Urgent" />
            <span>Urgent</span>
            <span className="prioritypage-count">
              {getSortedTicketsByPriority(4).length}
            </span>
          </div>
          <div className="prioritypage-header-menu">
            <img className="icon-small" src={add} alt="Add" />
            <img className="icon-small" src={dotmenu} alt="Menu" />
          </div>
        </div>
        <div className="prioritypage-cards">
          {renderCards(getSortedTicketsByPriority(4))}
        </div>
      </div>

      {/* High Priority Column */}
      <div className="prioritypage-column">
        <div className="prioritypage-header">
          <div className="statuspage-header-title">
            <img className="icon-small" src={highPriority} alt="High" />
            <span>High</span>
            <span className="prioritypage-count">
              {getSortedTicketsByPriority(3).length}
            </span>
          </div>
          <div className="prioritypage-header-menu">
            <img className="icon-small" src={add} alt="Add" />
            <img className="icon-small" src={dotmenu} alt="Menu" />
          </div>
        </div>
        <div className="prioritypage-cards">
          {renderCards(getSortedTicketsByPriority(3))}
        </div>
      </div>

      {/* Medium Priority Column */}
      <div className="prioritypage-column">
        <div className="prioritypage-header">
          <div className="statuspage-header-title">
            <img className="icon-small" src={mediumPriority} alt="Medium" />
            <span>Medium</span>
            <span className="prioritypage-count">
              {getSortedTicketsByPriority(2).length}
            </span>
          </div>
          <div className="prioritypage-header-menu">
            <img className="icon-small" src={add} alt="Add" />
            <img className="icon-small" src={dotmenu} alt="Menu" />
          </div>
        </div>
        <div className="prioritypage-cards">
          {renderCards(getSortedTicketsByPriority(2))}
        </div>
      </div>

      {/* Low Priority Column */}
      <div className="prioritypage-column">
        <div className="prioritypage-header">
          <div className="statuspage-header-title">
            <img className="icon-small" src={lowPriority} alt="Low" />
            <span>Low</span>
            <span className="prioritypage-count">
              {getSortedTicketsByPriority(1).length}
            </span>
          </div>
          <div className="prioritypage-header-menu">
            <img className="icon-small" src={add} alt="Add" />
            <img className="icon-small" src={dotmenu} alt="Menu" />
          </div>
        </div>
        <div className="prioritypage-cards">
          {renderCards(getSortedTicketsByPriority(1))}
        </div>
      </div>
    </div>
  );
}

export default Prioritypage;
