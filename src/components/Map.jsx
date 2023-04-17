import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vw",
  maxWidth: "80vw",
  maxHeight: "80vh",
  minHeight: "600px",
  margin: "auto",
};

//Starting Location

function Map() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    //Graz
    lat: 47.071463853678516,
    lng: 15.437325381592837,
    zoom: 8,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    //Nicht schlau das so zu machen aber egal
    googleMapsApiKey: "AIzaSyA9JSqs-WJvBI4TO6ph_jtz-wZhML9Suik",
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const markers = [
    {
      id: "markerHouse1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.02633371420625, lng: 15.421675329092931 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/L8tQwk2w/marker-Haus1.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.00940059102161, lng: 15.28661724258363 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/SxtP4Swb/marker-Haus2.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07351405819351, lng: 15.507783765957624 },
      headname: "Mehrfamilienhaus",
      infotext: "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 4 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/kgrVpKg0/marker-Haus3.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",

    },
    {
      id: "markerHouse4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07332372956971, lng: 15.509749581697807 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 7 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/vZ6KQFM1/marker-Haus4.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",

    },
    {
      id: "markerHouse5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09391388168128, lng: 15.456062791960568 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/yNmGK99g/marker-Haus5.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09699164266566, lng: 15.454597229840179 },
      headname: "Mehrfamilienhaus",
      infotext: "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 4 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/2ykyG4d4/marker-Haus6.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.12066545896628, lng: 15.471330341950177 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/SNW24xR2/marker-Haus7.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.081790938775704, lng: 15.393503334813197 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/769Czsv3/marker-Haus8.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.071858353765606, lng: 15.388379670160251 },
      headname: "Mehrfamilienhaus",
      infotext: "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/V6Zf13QV/marker-Haus9.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 46.98529115645121, lng: 15.374556926626243 },
      headname: "Einfamilienhaus",
      infotext: "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/bvrDbXHq/markerhaus10.png",
      email: "markler.gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.09530619337348, lng: 15.438478944176552 },
      headname: "Grundstück",
    },
    {
      id: "markerLand2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.114822647916526, lng: 15.409850594924189 },
      headname: "Grundstück",
    },
    {
      id: "markerLand3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.01976697168301, lng: 15.432074253244314 },
      headname: "Grundstück",
    },
    {
      id: "markerLand4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.036326403359496, lng: 15.547632407206802 },
      headname: "Grundstück",
    },
    {
      id: "markerLand5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.04324830648531, lng: 15.410159591737346 },
      headname: "Grundstück",
    },
    {
      id: "markerLand6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.1015613281271, lng: 15.504445763531765 },
      headname: "Grundstück",
    },
    {
      id: "markerLand7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.96526765103392, lng: 15.487438609774248 },
      headname: "Grundstück",
    },
    {
      id: "markerLand8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.99971175355509, lng: 15.45130164874118 },
      headname: "Grundstück",
    },
    {
      id: "markerLand9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.98379449160411, lng: 15.326996331245729 },
      headname: "Grundstück",
    },
    {
      id: "markerLand10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.02989279866883, lng: 15.501289104963192 },
      headname: "Grundstück",
    },
    {
      id: "markerWohnanlage1",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97616184920097, lng: 15.340418703445835 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage2",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97850959142189, lng: 15.406508650799124 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage3",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.00598755659248, lng: 15.400439616738721 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage4",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.02479158902004, lng: 15.397638340511252 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage5",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.39916740259707 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage6",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.397558077324938 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage7",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.070006067545485, lng: 15.431524086017452 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage8",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.073316233380204, lng: 15.44099558606298 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage9",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.105020895110705, lng: 15.420788857494795 },
      headname: "Wohnanlage",
    },
    {
      id: "markerWohnanlage10",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04745462219467, lng: 15.4709866014228 },
      headname: "Wohnanlage",
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
      {markers.map((m) => (
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
          onClick={() => {
            setInfoWindowOpen(m.id);
            setCenter(m.position);
            map.setZoom(18);
          }}
        >
          {infoWindowOpen === m.id && (
            <InfoWindow
              position={m.position}
              onCloseClick={() => setInfoWindowOpen(null)}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            >
              <>
                <h1
                  style={{
                    fontWeight: "700",
                    fontSize: "22px",
                    marginBottom: "5px",
                  }}
                >
                  {m.headname}
                </h1>
                <div
                  className="flex"
                  style={{ maxWidth: "100%", maxHeight: "100%", gap: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      flex: "1 1 auto",
                    }}
                  >
                    <p style={{ fontWeight: "500", textAlign: "justify"}}>
                      {m.infotext}
                    </p>
                    <h1
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      Kontakt
                    </h1>
                    <p style={{ fontWeight: "500" }}>
                      <b>E-Mail: </b> {m.email}
                      <br />
                      <b>Tel.Nr: </b> {m.telnummer}
                    </p>
                  </div>
                  <img
                    style={{
                      height: "80%",
                      width: "80%",
                      objectFit: "contain",
                      flex: "1 1 auto",
                    }}
                    src=/*"https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg"*/{m.vorschauBild}
                  />
                </div>
              </>
            </InfoWindow>
          )}
        </Marker>
      ))}

      {/* Ich hab mir das jetzt mal angeschaut. Sieht interessant aus. */}

      {/* Ich hab mir das jetzt mal angeschaut. Sieht interessant aus. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
