import toast from "react-hot-toast";
import { useAddress } from "../../context/addressContext";
import styles from "./Results.module.css";

export const Results = () => {
  const { address, error, isLoading } = useAddress();

  // Display error toast only when an error occurs and loading is complete
  if (error && !isLoading) {
    toast.error("Invalid IP Address");
    return;
  }

  return (
    <section className={`${styles.grid} ${styles.position}`}>
      {isLoading ? (
        <div className={styles.fullPageLoader}>
          <span className={styles.loader}></span>
          <p>Fetching data...</p>
        </div>
      ) : (
        // Display address data when not loading
        <>
          <div>
            <p>IP ADDRESS</p>
            <h3>{address?.ip}</h3>
          </div>
          <div className={styles.location}>
            <p>LOCATION</p>
            <h3>{`${address?.region ?? ""} ${address?.country_name ?? ""}`}</h3>
          </div>
          <div>
            <p>TIMEZONE</p>
            <h3>{`${address?.timezone ?? ""} ${address?.utc_offset ?? ""}`}</h3>
          </div>
          <div className={styles.asn}>
            <p>ASN</p>
            <h3>{address?.asn || ""}</h3>
          </div>
        </>
      )}
    </section>
  );
};
