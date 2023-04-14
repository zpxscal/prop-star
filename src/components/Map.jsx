import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { m } from "framer-motion";

const containerStyle = {
  width: "1240px",
  height: "600px",
  margin: "auto",
};

//Starting Location
const center = {
  //Graz
  lat: 47.071463853678516,
  lng: 15.437325381592837,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    //Nicht schlau das so zu machen aber egal
    googleMapsApiKey: "AIzaSyA9JSqs-WJvBI4TO6ph_jtz-wZhML9Suik",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const markers = [
    {
      id: "markerHouse1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.02633371420625, lng: 15.421675329092931 },
    },
    {
      id: "markerHouse2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.00940059102161, lng: 15.28661724258363 },
    },
    {
      id: "markerHouse3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07351405819351, lng: 15.507783765957624 },
    },
    {
      id: "markerHouse4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07332372956971, lng: 15.509749581697807 },
    },
    {
      id: "markerHouse5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09391388168128, lng: 15.456062791960568 },
    },
    {
      id: "markerHouse6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09699164266566, lng: 15.454597229840179 },
    },
    {
      id: "markerHouse7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.12066545896628, lng: 15.471330341950177 },
    },
    {
      id: "markerHouse8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.081790938775704, lng: 15.393503334813197 },
    },
    {
      id: "markerHouse9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.071858353765606, lng: 15.388379670160251 },
    },
    {
      id: "markerHouse10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 46.98529115645121, lng: 15.374556926626243 },
    },
    {
      id: "markerLand1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.09530619337348, lng: 15.438478944176552 },
    },
    {
      id: "markerLand2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.114822647916526, lng: 15.409850594924189 },
    },
    {
      id: "markerLand3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.01976697168301, lng: 15.432074253244314 },
    },
    {
      id: "markerLand4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.036326403359496, lng: 15.547632407206802 },
    },
    {
      id: "markerLand5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.04324830648531, lng: 15.410159591737346 },
    },
    {
      id: "markerLand6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.1015613281271, lng: 15.504445763531765 },
    },
    {
      id: "markerLand7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.96526765103392, lng: 15.487438609774248 },
    },
    {
      id: "markerLand8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.99971175355509, lng: 15.45130164874118 },
    },
    {
      id: "markerLand9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.98379449160411, lng: 15.326996331245729 },
    },
    {
      id: "markerLand10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.02989279866883, lng: 15.501289104963192 },
    },
    {
      id: "markerWohnanlage1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97616184920097, lng: 15.340418703445835 },
    },
    {
      id: "markerWohnanlage2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97850959142189, lng: 15.406508650799124 },
    },
    {
      id: "markerWohnanlage3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.00598755659248, lng: 15.400439616738721 },
    },
    {
      id: "markerWohnanlage4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.02479158902004, lng: 15.397638340511252 },
    },
    {
      id: "markerWohnanlage5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.39916740259707 },
    },
    {
      id: "markerWohnanlage6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.397558077324938 },
    },
    {
      id: "markerWohnanlage7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.070006067545485, lng: 15.431524086017452 },
    },
    {
      id: "markerWohnanlage8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.073316233380204, lng: 15.44099558606298 },
    },
    {
      id: "markerWohnanlage9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.105020895110705, lng: 15.420788857494795 },
    },
    {
      id: "markerWohnanlage10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04745462219467, lng: 15.4709866014228 },
    },
  ];
  return isLoaded ? (
    <GoogleMap
      className="z-40"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components */}
      <></>

      {markers.map((m) => {
        <Marker
          key={m.id}
          id={m.id}
          options={{
            draggable: false,
            label: "",
            position: { ...m.position },
            icon: {
              url: m.iconUrl,
              scaledSize: new window.google.maps.Size(20, 20),
            },
          }}
        ></Marker>;
      })}

      {/* Ich hab mir das jetzt mal angeschaut. Sieht interessant aus. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
