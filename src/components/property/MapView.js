import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getLatAndLong, getMyProperties, getMyProperty } from '../manager/PropertyProvider';
import { Link } from 'react-router-dom';
import { getSwapperById } from '../manager/SwapperProvider';
import { PropertyBox } from './PropertyBox';
import { IconButton, Container, Flex, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'

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
        getMyProperty().then((data) => setMyProperties(data))
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data)=> setSwapper(data));
    }, []);

    useEffect(() => {
        if (myProperties && myProperties.address) {
            getLatAndLong(`${myProperties.address}+ Nashville, TN`).then((data) =>
                setMap({ latitude: data[0].boundingbox[1], longitude: data[0].boundingbox[2] })
            );
        }
        else{
            getLatAndLong(`116 Rep John Lewis Way, Nashville, TN`).then((data) =>
                setMap({ latitude: data[0].boundingbox[1], longitude: data[0].boundingbox[2] })
            );
        }
    }, [myProperties]);

    return (
        <>
        
           <Flex direction="row">
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
                    {/* {myProperties && myProperties.address && (
                    <div>
                        <div>My Home</div>
                        <div>{myProperties?.address}</div>
                    </div>
                    )} */}
                    <div>
                        <div> Available Swaps</div>
                        {properties ? (
                            <>
                                {properties.map((property) => {
                                    return (<Container>
                                       <PropertyBox property={property}/>
                                            <Button onClick={() => setMyProperties(property)}>Find</Button>
                                        </Container>
                                    );
                                })}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </Flex>
        </>
    );
};
