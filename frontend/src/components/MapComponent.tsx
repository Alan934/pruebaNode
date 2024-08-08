import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIconRed from "../app/assets/img/location.png";

const customIcon = new L.Icon({
    iconUrl: markerIconRed.src,
    iconSize: [30, 30],
});

export default function MapComponent() {
    return (
        <div className="w-full h-32">
            <MapContainer center={[-32.8719556, -68.8283655]} zoom={15} className="w-full h-full">
                <TileLayer
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[-32.871909390614924, -68.82771107145592]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
