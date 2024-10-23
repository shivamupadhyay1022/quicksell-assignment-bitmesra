import { useEffect, useState } from "react";
import "./App.css";
import { display, down } from "./assets";
import Avatar from "./components/Avatar";
import Statuspage from "./pages/Statuspage.js";
import Userpage from "./pages/Userpage.js";
import Prioritypage from "./pages/Prioritypage";
function App() {
  const [data,setData]= useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [grouping, setGroupingOpen] = useState(false);
  const [groupingoption, setGroupingOption] = useState();
  const [sorting, setSortingOpen] = useState(false);
  const [sortingoption, setSortingOption] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if(grouping) setGroupingOpen(!grouping);
    if(sorting) setSortingOpen(!sorting);
  };

  useEffect(() => {
    fetchData();
    getOptions();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function getOptions() {
    const group_option = await window.localStorage.getItem("Group_option");
    const sort_option = await window.localStorage.getItem("Sorting_option");
    if (group_option !== null) {
      setGroupingOption(JSON.parse(group_option));
    } else {
      window.localStorage.setItem("Group_option", JSON.stringify("Status"));
      setGroupingOption("Status");
    }
    if (sort_option !== null) {
      setSortingOption(JSON.parse(sort_option));
    } else {
      window.localStorage.setItem("Sorting_option", JSON.stringify("Priority"));
      setSortingOption("Priority");
    }
  }

  const NavPageComponent = () => {
    switch (groupingoption) {
      case "Status":
        return <Statuspage />;
      case "User":
        return <Userpage />;
      case "Priority":
        return <Prioritypage />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="dropdown-btn" onClick={()=>{
            toggleDropdown();

          }}>
            <img src={display} alt="Display Icon" />
            Display
            <img src={down} alt="Dropdown Icon" />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <div className="menu-item">
                    <span>Grouping</span>
                    <button
                      className="menu-btn"
                      onClick={() => {
                        setGroupingOpen(!grouping);
                        if(sorting) setSortingOpen(!sorting)
                      }}
                    >
                      {groupingoption}
                      <img src={down} alt="Dropdown Icon" />
                    </button>
                  </div>
                </li>
                <li>
                  <div className="menu-item">
                    <span>Ordering</span>
                    <button
                      className="menu-btn"
                      onClick={() => {
                        setSortingOpen(!sorting);
                        if(grouping) setGroupingOpen(!grouping)
                      }}
                    >
                      {sortingoption}
                      <img src={down} alt="Dropdown Icon" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {grouping && (
            <div className="grouping-menu">
              <ul>
                <li>
                  <button
                    className="grouping-btn"
                    onClick={() => {
                      setGroupingOption("Status");
                      window.localStorage.setItem(
                        "Group_option",
                        JSON.stringify("Status")
                      );
                      setGroupingOpen(!grouping);
                    }}
                  >
                    Status
                  </button>
                </li>
                <li>
                  <button
                    className="grouping-btn"
                    onClick={() => {
                      setGroupingOption("User");
                      window.localStorage.setItem(
                        "Group_option",
                        JSON.stringify("User")
                      );
                      setGroupingOpen(!grouping);
                    }}
                  >
                    User
                  </button>
                </li>
                <li>
                  <button
                    className="grouping-btn"
                    onClick={() => {
                      setGroupingOption("Priority");
                      window.localStorage.setItem(
                        "Group_option",
                        JSON.stringify("Priority")
                      );
                      setGroupingOpen(!grouping);
                    }}
                  >
                    Priority
                  </button>
                </li>
              </ul>
            </div>
          )}
          {sorting && (
            <div className="sorting-menu">
              <ul>
                <li>
                  <button
                    className="sorting-btn"
                    onClick={() => {
                      setSortingOption("Priority");
                      window.localStorage.setItem(
                        "Sorting_option",
                        JSON.stringify("Priority")
                      );
                      setSortingOpen(!sorting);
                    }}
                  >
                    Priority
                  </button>
                </li>
                <li>
                  <button
                    className="sorting-btn"
                    onClick={() => {
                      setSortingOption("Title");
                      window.localStorage.setItem(
                        "Sorting_option",
                        JSON.stringify("Title")
                      );
                      setSortingOpen(!sorting);
                    }}
                  >
                    Title
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {NavPageComponent()}
    </div>
  );
}

export default App;
