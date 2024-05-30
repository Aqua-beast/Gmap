import "./main.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { IoIosClose } from "react-icons/io";

// leaflet container has two parts js library and css
import { AppContext } from "./context/context";
import { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";
import Auth from "./Components/Auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const customIcon = new Icon({
    iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const { state, dispatch, setName, setEmail, setPopup } =
    useContext(AppContext);
  const [pos, setPos] = useState({
    lat: "",
    lng: "",
  });
  const fetchPopups = async () => {
    try {
      const res = await axios.get(
        `https://gmap-server.vercel.app/api/user/${state.email}`
      );
      dispatch(setPopup(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.username) {
      fetchPopups();
      console.log(state.popups);
    }
  }, [state.username]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    username: "",
    email: "",
    lat: "",
    lng: "",
    rating: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSubmit = {
      ...formData,
      username: state.username,
      email: state.email,
      lat: pos.lat,
      lng: pos.lng,
    };
    // console.log(dataToSubmit);
    try {
      const res = await axios.post(
        "https://gmap-server.vercel.app/api/new",
        dataToSubmit
      );
      // console.log(res.data);
      setShowForm(false);
      setFormData({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleMapDoubleClick = async (event) => {
    setShowForm(true);
    setPos(event.latlng);
    console.log(pos);
  };

  const MapComponent = () => {
    useMapEvent("dblclick", handleMapDoubleClick);
    return null;
  };

  return (
    <>
      <Auth
        state={state}
        dispatch={dispatch}
        setEmail={setEmail}
        setName={setName}
      />
      <MapContainer
        className="leaflet-container"
        center={[28.598994891328356, 77.20516517210228]}
        zoom={13}
      >
        {/* OPEN STREEN MAPS TILES */}
                {/* var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}); */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {state.username.length > 0 ? <MapComponent /> : null}
        <MarkerClusterGroup chunkedLoading
          iconCreateFunction={createCustomClusterIcon}>
          {state.popups.map((popup, index) => (
            <Marker
              key={index}
              position={[popup.lat, popup.lng]}
              icon={customIcon}
            >
              <Popup>
                <h3>{popup.title}</h3>
                <p>{popup.desc}</p>
                <p>Rating: {popup.rating}</p>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {state.username.length == 0 ? (
          <Marker position={[28.598994891328356, 77.20516517210228]} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ) : null}

        {showForm && (
          <form
          className="form-place"
            onSubmit={handleSubmit}
            style={{
              position: "absolute",
              top: "50px",
              left: "50px",
              backgroundColor: "white",
              padding: "10px",
              zIndex: 1000,
            }}
          >
            <IoIosClose className="close" onClick={()=>{setShowForm(false)}}/>
            <br />
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              required
            />
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </MapContainer>
    </>
  );
}
