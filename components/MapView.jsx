"use client";
import { useState, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { FONTS } from "@/lib/constants";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "16px",
};

const center = { lat: 42.4315, lng: -83.4838 };

export default function MapView({ listings, color, catName }) {
  const [selectedListing, setSelectedListing] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });

  const pins = useMemo(() => {
    if (!listings) return [];
    return listings.filter((l) => l.latitude && l.longitude);
  }, [listings]);

  if (loadError) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6B6B6B" }}>
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={{
          height: "600px",
          borderRadius: "16px",
          background: "#F5F0EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6B6B6B",
          fontFamily: FONTS.body,
        }}
      >
        Loading map...
      </div>
    );
  }

  const pinIcon = (pinColor) => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: pinColor,
    fillOpacity: 1,
    strokeColor: "#fff",
    strokeWeight: 2,
    scale: 1.5,
    anchor: { x: 12, y: 22 },
  });

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {pins.map((listing, i) => (
        <Marker
          key={i}
          position={{ lat: listing.latitude, lng: listing.longitude }}
          icon={pinIcon(color)}
          onClick={() => setSelectedListing(listing)}
        />
      ))}
      {selectedListing && (
        <InfoWindow
          position={{
            lat: selectedListing.latitude,
            lng: selectedListing.longitude,
          }}
          onCloseClick={() => setSelectedListing(null)}
        >
          <div style={{ fontFamily: FONTS.body, maxWidth: "220px" }}>
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "15px",
                fontWeight: 700,
                margin: "0 0 4px",
                color: "#1A1A1A",
              }}
            >
              {selectedListing.name}
            </h3>
            {selectedListing.rating && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#D4A017",
                  marginBottom: "2px",
                }}
              >
                {"★"} {selectedListing.rating}
              </div>
            )}
            {selectedListing.city && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B6B6B",
                  marginBottom: "4px",
                }}
              >
                {selectedListing.city}
              </div>
            )}
            {selectedListing.desc && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B6B6B",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {selectedListing.desc.length > 80
                  ? selectedListing.desc.slice(0, 80) + "..."
                  : selectedListing.desc}
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
