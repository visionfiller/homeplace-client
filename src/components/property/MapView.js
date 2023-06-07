import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getLatAndLong, getMyProperties } from '../manager/PropertyProvider';
import { Link } from 'react-router-dom';
import { getSwapperById } from '../manager/SwapperProvider';

const customIcon = L.icon({
    iconUrl: '../pin.svg',
    iconSize: [36, 36],
    iconAnchor: [16, 32],
});

const MyMapComponent = ({ latitude, longitude }) => {
    const map = useMap();

    useEffect(() => {
        if (latitude && longitude) {
            map.flyTo([latitude, longitude], map.getZoom());
        }
    }, [map, latitude, longitude]);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {latitude && longitude && (
                <Marker icon={customIcon} position={[latitude, longitude]}>
                    <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                </Marker>
            )}
        </>
    );
};

export const MapView = ({ properties }) => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [myProperties, setMyProperties] = useState({});
    const [swapper, setSwapper] = useState({})
    const [map, setMap] = useState({ latitude: '', longitude: '' });

    useEffect(() => {
        getMyProperties().then((data) => setMyProperties(data[0]))
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data)=> setSwapper(data));
    }, []);

    useEffect(() => {
        if (myProperties.address) {
            getLatAndLong(`${myProperties.address}+ Nashville, TN`).then((data) =>
                setMap({ latitude: data[0].boundingbox[1], longitude: data[0].boundingbox[2] })
            );
        }
    }, [myProperties]);

    return (
        <>
        
            <div className="flex row">
                {map.latitude ? (
                    <div className="w-full h-full ">
                        <MapContainer center={[map.latitude, map.longitude]} zoom={16} scrollWheelZoom={true}>
                            <MyMapComponent latitude={map.latitude} longitude={map.longitude} />
                        </MapContainer>
                    </div>
                ) : (
                    ''
                )}
                <div className="w-1/2">
                    <div>
                        <div>My Home</div>
                        <div>{myProperties.address}</div>
                    </div>
                    <div>
                        <div> Available Swaps</div>
                        {properties ? (
                            <>
                                {properties.map((property) => {
                                    return (
                                        <div key={property.id} to={`/property_details/${property.id}`}>
                                            <div key={property.id}>{property.address}</div>
                                            <div>Neighborhood: {property.area.neighborhood}</div>
                                            <img className="w-1/4 h-1/4 object-cover" src={property.image} />
                                            <button onClick={() => setMyProperties(property)}>Find</button>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
