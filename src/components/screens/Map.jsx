import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "../../componentsCss/Map.css";
import MapSearchBar from "../common/MapSearchBar";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

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
  const markerIcons = {
    House: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
    Industry: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
    Property: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
  };

  const markers = [
    {
      id: "markerHouse1",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.02633371420625, lng: 15.421675329092931 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/L8tQwk2w/marker-Haus1.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse2",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.00940059102161, lng: 15.28661724258363 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/SxtP4Swb/marker-Haus2.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse3",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07351405819351, lng: 15.507783765957624 },
      headname: "Mehrfamilienhaus",
      infotext:
        "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 4 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/kgrVpKg0/marker-Haus3.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse4",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.07332372956971, lng: 15.509749581697807 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 7 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/vZ6KQFM1/marker-Haus4.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse5",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09391388168128, lng: 15.456062791960568 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/yNmGK99g/marker-Haus5.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse6",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.09699164266566, lng: 15.454597229840179 },
      headname: "Mehrfamilienhaus",
      infotext:
        "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 4 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/2ykyG4d4/marker-Haus6.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse7",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.12066545896628, lng: 15.471330341950177 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/SNW24xR2/marker-Haus7.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse8",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.081790938775704, lng: 15.393503334813197 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/769Czsv3/marker-Haus8.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse9",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 47.071858353765606, lng: 15.388379670160251 },
      headname: "Mehrfamilienhaus",
      infotext:
        "Verkaufe geräumiges Mehrfamilienhaus mit jeweils 5 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/V6Zf13QV/marker-Haus9.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerHouse10",
      type: "home",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/9899/9899458.png",
      position: { lat: 46.98529115645121, lng: 15.374556926626243 },
      headname: "Einfamilienhaus",
      infotext:
        "Verkaufe geräumiges Einfamilienhaus mit 6 Zimmern und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/bvrDbXHq/markerhaus10.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand1",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.09530619337348, lng: 15.438478944176552 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 802 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/CKmsN4k4/land1.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand2",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.114822647916526, lng: 15.409850594924189 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 1640 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/j51QVd8w/land2.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand3",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.01976697168301, lng: 15.432074253244314 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 3400 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/667F87xP/land3.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand4",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.036326403359496, lng: 15.547632407206802 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 12694 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/Jz8FYPHw/land4.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand5",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.04324830648531, lng: 15.410159591737346 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 460 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/CMjHrYG1/land5.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand6",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.1015613281271, lng: 15.504445763531765 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 1000 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/ht39QGBC/land6.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand7",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.96526765103392, lng: 15.487438609774248 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 6691 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/D0gGvv6P/land7.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand8",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.99971175355509, lng: 15.45130164874118 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 450 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/mrHFcNVD/land8.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand9",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 46.98379449160411, lng: 15.326996331245729 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 3591 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/fWKS0b7x/land9.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerLand10",
      type: "property",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6752/6752040.png",
      position: { lat: 47.02989279866883, lng: 15.501289104963192 },
      headname: "Grundstück",
      infotext:
        "Verkaufe mein Grundstück in exzellenter Lage. Es befindet sich in einer der begehrtesten Gegenden der Stadt und bietet eine perfekte Mischung aus Ruhe und urbanem Leben. Mit einer Fläche von 1750 m2 bietet es viel Platz für den Bau eines Traumhauses oder eines Mehrfamilienhauses. Wenn Sie an diesem Angebot interessiert sind, zögern Sie nicht, mich zu kontaktieren, um weitere Informationen zu erhalten.",
      vorschauBild: "https://i.postimg.cc/SKCJQQNY/land10.jpg",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage1",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97616184920097, lng: 15.340418703445835 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 4 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/nVRg4ZWT/wohn-Anlage1.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage2",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 46.97850959142189, lng: 15.406508650799124 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 5 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/G3PMhRFq/wohn-Anlage2.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage3",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.00598755659248, lng: 15.400439616738721 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 7 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/9M3NftL7/wohn-Anlage3.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage4",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.02479158902004, lng: 15.397638340511252 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 4 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/yxDJrczL/wohn-Anlage4.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage5",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.39916740259707 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 3 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/xdFNGtwX/wohn-Anlage5.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage6",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04694130701723, lng: 15.397558077324938 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 5 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/C13N7F3n/wohn-Anlage6.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage7",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.070006067545485, lng: 15.431524086017452 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 5 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/kGz8vwLJ/wohn-Anlage7.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage8",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.073316233380204, lng: 15.44099558606298 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 6 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/zXXTGhhm/wohn-Anlage8.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage9",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.105020895110705, lng: 15.420788857494795 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 4 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/hvGhc95p/wohn-Anlage9.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
    {
      id: "markerWohnanlage10",
      type: "industry",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1838/1838480.png",
      position: { lat: 47.04745462219467, lng: 15.4709866014228 },
      headname: "Wohnanlage",
      infotext:
        "Verkaufe geräumige Wonanlage mit 2 Wohnungen und großem Garten. Ruhige Lage, gute Anbindung an öffentliche Verkehrsmittel, Einkaufsmöglichkeiten, Schulen und Kindergärten in der Nähe. Ideal für Familien und Paare.",
      vorschauBild: "https://i.postimg.cc/MKvXLmRG/wohn-Anlage10.png",
      email: "markler@gmail.com",
      telnummer: "+43 677 6789190",
    },
  ];

  const [infoWindowOpen, setInfoWindowOpen] = useState(null);
  const [map, setMap] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState(properties);
  const [center, setCenter] = useState({
    //Graz
    lat: 47.071463853678516,
    lng: 15.437325381592837,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    //Nicht schlau das so zu machen aber egal
    googleMapsApiKey: "AIzaSyA9JSqs-WJvBI4TO6ph_jtz-wZhML9Suik",
  });

  useEffect(() => {
    axios
      .get("/api/item/all")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("an error happened :D");
      });
  }, []);

  useEffect(() => {
    setFiltered(properties);
  }, [properties]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    setTimeout(() => {
      map.setZoom(10);
    }, 500);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleSeach = (info) => {
    setCenter({ lat: parseFloat(info.lat), lng: parseFloat(info.lon) });
    map.setZoom(20 - info.size * 40);
  };

  const handleFilter = (f) => {
    if (f === null) {
      setFiltered(properties);
      return;
    }

    setFiltered(properties.filter((m) => m.type === f));
  };

  return isLoaded ? (
    <div style={{ width: "100vw", maxWidth: "80vw", margin: "auto" }}>
      <MapSearchBar onSelect={handleSeach} onFilter={handleFilter} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {filtered.map((m) => (
          <Marker
            key={m._id}
            id={m._id}
            options={{
              draggable: false,
              label: "",
              position: { lat: m.location.lat, lng: m.location.lng },
              icon: {
                url: markerIcons[m.type],
                scaledSize: new window.google.maps.Size(20, 20),
              },
            }}
            onClick={() => {
              setInfoWindowOpen(m._id);
              setCenter({ lat: m.location.lat, lng: m.location.lng });
              map.setZoom(18);
            }}
          >
            {infoWindowOpen === m._id && (
              <InfoWindow
                position={{ lat: m.location.lat, lng: m.location.lng }}
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
                    {m.title}
                  </h1>
                  <div
                    className="flex info-wrapper"
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
                      <p style={{ fontWeight: "500" }}>{m.description}</p>
                      <h1
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        Kontakt
                      </h1>
                      <p style={{ fontWeight: "500" }}>
                        <b>E-Mail: </b> {m.seller.email}
                        <br />
                        <b>Tel.Nr: </b> {m.seller.tel || ""}
                      </p>
                    </div>
                    <img
                      style={{
                        height: "15vh",
                        width: "20vw",
                        objectFit: "contain",
                        flex: "1 1 auto",
                      }}
                      src=/*"https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg" d*/ {
                        m.images.find((i) => i.thumbnail).data
                      }
                    />
                  </div>
                </>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
