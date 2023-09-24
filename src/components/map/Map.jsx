import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import marker from "../../assets/images/icon-location.svg";
import { useAddress } from "../../context/addressContext";
import { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
const defaultLatitude = 5.5486; // Replace with your default latitude
const defaultLongitude = -0.2012;

export const Map = () => {
  const { address, error } = useAddress();
  const mapRef = useRef(null);
  const [position, setPosition] = useState([
    Number(address?.latitude) || defaultLatitude,
    Number(address?.longitude) || defaultLongitude,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const newPosition = [
        Number(address?.latitude) || defaultLatitude,
        Number(address?.longitude) || defaultLongitude,
      ];

      // Clear existing markers (if any)
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add a new marker to the map
      const customIcon = L.icon({
        iconUrl: marker,
        iconSize: [40, 48],
      });

      const newMarker = L.marker(newPosition, { icon: customIcon }).addTo(map);

      // Set the view to the new position
      map.setView(newPosition, 18);

      // Create a new popup content

      const popupContent = error
        ? "Could not fetch address"
        : `${address?.region ?? ""}, ${address?.country_name ?? ""}`;

      const customPopup = L.popup({ className: `${styles.popup}` }).setContent(
        popupContent
      );

      // Bind the new popup content to the new marker
      newMarker.bindPopup(customPopup).openPopup();

      // Update the position state for the original Marker component
      setPosition(newPosition);
    }
  }, [address,error]);

  return (
    <main>
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={18}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        style={{ height: "30rem" }}
        zoomAnimation={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </main>
  );
};
