import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLoaderData } from "react-router";

// Fix marker icon paths for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component to fly the map
const FlyToLocation = ({ lat, lng, zoom = 14 }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], zoom, { duration: 1.5 });
    }
  }, [lat, lng, zoom, map]);

  return null;
};

const Coverage = () => {
  const districts = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSelectedDistrict(null);
      return;
    }

    const found = districts.find((d) =>
      d.district.toLowerCase().includes(query.toLowerCase())
    );

    setSelectedDistrict(found || null);
  };

  const displayedDistricts = selectedDistrict ? [selectedDistrict] : districts;

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search district..."
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded mb-4"
      />

      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {selectedDistrict && (
          <FlyToLocation
            lat={selectedDistrict.latitude}
            lng={selectedDistrict.longitude}
          />
        )}

        {searchQuery.trim() === "" ? (
          <FlyToLocation lat={23.685} lng={90.3563} zoom={7} />
        ) : (
          selectedDistrict && (
            <FlyToLocation
              lat={selectedDistrict.latitude}
              lng={selectedDistrict.longitude}
              zoom={14}
            />
          )
        )}

        {displayedDistricts.map((dist, i) => (
          <Marker key={i} position={[dist.latitude, dist.longitude]}>
            <Popup>
              <strong>{dist.district}</strong>
              <br />
              Areas: {dist.covered_area?.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
