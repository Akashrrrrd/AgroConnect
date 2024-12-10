import React, { useState, useEffect } from "react";
import "./NearFarm.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import farm_1 from "../../assets/farm_1.png";
import farm_2 from "../../assets/farm_2.png";
import farm_3 from "../../assets/farm_3.png";
import farmers_1 from "../../assets/farmers_1.png";
import farmers_2 from "../../assets/farmers_2.png";
import farmers_3 from "../../assets/farmers_3.png";
import Modal from "react-modal"; // Import modal for live stream

// Fix Leaflet's default marker icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom hook to update map center
const MapCenterUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
};

// Utility function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2); // Returning the distance rounded to 2 decimal places
};

const NearFarm = () => {
  const [location, setLocation] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmsWithDistance, setFarmsWithDistance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStreamUrl, setCurrentStreamUrl] = useState("");

  const farms = [
    {
      name: "Unnamed Farm",
      address: "Unnmaed Road, kerala 685565, India",
      image: farmers_1,
      organic: true,
      contact: "info@unnamed.com",
      details: "Known for their fresh, organic vegetables and fruits.",
      farmerName: "Unnamed",
      farmerMobile: "+919876543210",
      lat: 9.97634,
      lng: 77.13239333333333,
      liveStreamUrl: "https://www.youtube.com/embed/F64e9Sdm4f0",
    },
    {
      name: "Unnamed Farm",
      address: "Unnmaed Road, kerala 685565, India",
      image: farmers_2,
      organic: true,
      contact: "info@unfarmed.com",
      details: "Specializes in seasonal produce and flowers.",
      farmerName: "Unnamed",
      farmerMobile: "+919998877665",
      lat: 9.976346666666666,
      lng: 77.13244,
      liveStreamUrl:
        "https://www.youtube.com/embed/jfKfPfyJRdk?si=c44dQ3zIi4_iptJP", // Replace with actual video ID
    },
    {
      name: "Unnamed Farm",
      address: "Unnmaed Road, kerala 685565, India",
      image: farmers_3,
      organic: true,
      contact: "info@unnamed.com",
      details: "Provides a wide range of certified organic products.",
      farmerName: "Unnamed",
      farmerMobile: "+914455667788",
      lat: 9.97637,
      lng: 77.13240666666667,
      liveStreamUrl:
        "https://www.youtube.com/embed/xRPjKQtRXR8?si=oxxqzM_4j_Be-TGb", // Replace with actual video ID
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);

        // Calculate distances to farms
        const farmsWithDistances = farms.map((farm) => ({
          ...farm,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            farm.lat,
            farm.lng
          ),
        }));
        setFarmsWithDistance(farmsWithDistances);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to retrieve your location. Please check your browser settings."
        );
      }
    );
  }, []);

  const openModal = (url) => {
    setCurrentStreamUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStreamUrl("");
  };

  return (
    <div className="nf-page">
      <h1 className="nf-heading">Nearby Farms</h1>
      <div className="nf-info">
        <p>Showing farms near your location</p>
        {location && (
          <p>
            Current Location: Latitude {location.lat}, Longitude {location.lng}
          </p>
        )}
      </div>

      <div className="nf-farm-list">
        {farmsWithDistance.map((farm, index) => (
          <div className="nf-farm-item" key={index}>
            <img src={farm.image} alt={farm.name} className="nf-farm-image" />
            <h2 className="nf-farm-name">{farm.name}</h2>
            <p className="nf-farm-organic">
              {farm.organic ? "Organic Farm" : "Non-Organic Farm"}
            </p>
            <p className="nf-farm-distance">Distance: {farm.distance} km</p>
            <p className="nf-farmer-name">Farmer: {farm.farmerName}</p>
            <p className="nf-farmer-mobile">Mobile: {farm.farmerMobile}</p>
            <p className="nf-farm-address">Address: {farm.address}</p>
            <p className="nf-farm-contact">Mail: {farm.contact}</p>
            <p className="nf-farm-details">{farm.details}</p>
            <button
              className="nf-view-map"
              onClick={() => setSelectedFarm(farm)}
            >
              View on Map
            </button>
            <button
              className="nf-watch-live"
              onClick={() => openModal(farm.liveStreamUrl)}
            >
              Watch Live
            </button>
          </div>
        ))}
      </div>

      {(location || selectedFarm) && (
        <div className="nf-map">
          <MapContainer
            center={location || { lat: 37.7749, lng: -122.4194 }} // Default to a general location if no geolocation
            zoom={12}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <MapCenterUpdater
              position={
                selectedFarm
                  ? { lat: selectedFarm.lat, lng: selectedFarm.lng }
                  : location
              }
            />

            {/* Show user's current location */}
            {location && (
              <Marker
                position={{ lat: location.lat, lng: location.lng }}
                icon={
                  new L.Icon({
                    iconUrl:
                      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  })
                }
              >
                <Popup>Your Current Location</Popup>
              </Marker>
            )}

            {/* Show farms */}
            {farmsWithDistance.map((farm, index) => (
              <Marker
                key={index}
                position={{ lat: farm.lat, lng: farm.lng }}
                icon={
                  new L.Icon({
                    iconUrl:
                      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  })
                }
              >
                <Popup>
                  <strong>{farm.name}</strong>
                  <br />
                  Farmer: {farm.farmerName}
                  <br />
                  Contact: {farm.farmerMobile}
                  <br />
                  {farm.details}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* Modal for Live Stream */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Live Stream"
        className="live-stream-modal"
        overlayClassName="live-stream-overlay"
      >
        <h2>Live Stream</h2>
        <div className="live-stream-container">
          {currentStreamUrl && (
            <iframe
              src={currentStreamUrl}
              title="Live Stream"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default NearFarm;
