import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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

  return isLoaded ? (
    <GoogleMap
      className="z-40"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      {/* Child components */}
      <></>

      {/*Häuser */}
      <Marker
        id="markerHouse1"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.02633371420625, lng: 15.421675329092931 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse2"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.00940059102161, lng: 15.28661724258363 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse3"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.07351405819351, lng: 15.507783765957624 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse4"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.07332372956971, lng: 15.509749581697807 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse5"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.09391388168128, lng: 15.456062791960568 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse6"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.09699164266566, lng: 15.454597229840179 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse7"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.12066545896628, lng: 15.471330341950177 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse8"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.081790938775704, lng: 15.393503334813197 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse9"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.071858353765606, lng: 15.388379670160251 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerHouse10"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.98529115645121, lng: 15.374556926626243 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>

      {/*Grundstücke */}
      <Marker
        id="markerLand1"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.09530619337348, lng: 15.438478944176552 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand2"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.114822647916526, lng: 15.409850594924189 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand3"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.01976697168301, lng: 15.432074253244314 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand4"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.036326403359496, lng: 15.547632407206802 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand5"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.04324830648531, lng: 15.410159591737346 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand6"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.1015613281271, lng: 15.504445763531765 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand7"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.96526765103392, lng: 15.487438609774248 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand8"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.99971175355509, lng: 15.45130164874118 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand9"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.98379449160411, lng: 15.326996331245729 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerLand10"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.02989279866883, lng: 15.501289104963192 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>

      {/*Wohnanlagen */}
      <Marker
        id="markerWohnanlage1"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.97616184920097, lng: 15.340418703445835 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage2"
        options={{
          draggable: false,
          label: "",
          position: { lat: 46.97850959142189, lng: 15.406508650799124 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage3"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.00598755659248, lng: 15.400439616738721 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage4"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.02479158902004, lng: 15.397638340511252 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage5"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.04694130701723, lng: 15.39916740259707 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage6"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.04694130701723, lng: 15.397558077324938 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage7"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.070006067545485, lng: 15.431524086017452 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage8"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.073316233380204, lng: 15.44099558606298 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage9"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.105020895110705, lng: 15.420788857494795 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>
      <Marker
        id="markerWohnanlage10"
        options={{
          draggable: false,
          label: "",
          position: { lat: 47.04745462219467, lng: 15.4709866014228 },
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
            scaledSize: new window.google.maps.Size(20, 20),
          },
        }}></Marker>

      {/* Ich hab mir das jetzt mal angeschaut. Sieht interessant aus. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
