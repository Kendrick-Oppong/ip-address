import  { useState } from "react";
import styles from "./Search.module.css";
import background from "../../assets/images/pattern-bg-desktop.png";

import { useAddress } from "../../context/addressContext";
import toast from "react-hot-toast";

export const Search = () => {
  const { address, searchTerm, setSearchTerm, setIsLoading } = useAddress();
  const [inputValue, setInputValue] = useState(searchTerm || address?.ip);

  async function handleSubmit(e) {
    e.preventDefault();
    const ipAddress = inputValue.trim(); // Remove leading/trailing spaces
    if (!ipAddress) {
      toast.error("Field can't be empty");
      return;
    }

    setIsLoading(true); // Start loading spinner

    setSearchTerm(ipAddress);
    setInputValue(ipAddress); // Update the input value to the submitted IP
  }

  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className={styles.title}>IP Address Tracker</h1>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.search}
            type="search"
            name="search"
            placeholder=" Search for any IP address or domain"
            defaultValue={address?.ip}
            // value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
};
