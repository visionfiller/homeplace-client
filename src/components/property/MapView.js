import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getLatAndLong, getMyProperties, getMyProperty } from '../manager/PropertyProvider';
import { Link } from 'react-router-dom';
import { getSwapperById } from '../manager/SwapperProvider';
import { PropertyBox } from './PropertyBox';
import { IconButton, Container, Flex, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

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

export const MapView = ({ properties, mapView }) => {

    const [myProperties, setMyProperties] = useState({});

    const [loading, setLoading] = useState(true)
    const [map, setMap] = useState({ latitude: '', longitude: '' });


    useEffect(() => {
        if (myProperties && myProperties.address) {
            getLatAndLong(`${myProperties.address}+ Nashville, TN`).then((data) =>
                setMap({ latitude: data[0].boundingbox[1], longitude: data[0].boundingbox[2] })
            );
            setLoading(false)
        }
        else {
            getLatAndLong(`${properties[0].address}+ Nashville, TN`).then((data) =>
                setMap({ latitude: data[0].boundingbox[1], longitude: data[0].boundingbox[2] })
            );
            setLoading(false)
        }
    }, [myProperties]);

    return (
        <>
            {loading ? <Heading >Loading Map...</Heading>
                : <>
                    <Flex direction={{ base: "column-reverse", md: "row" }} height="full" w="full" justify="between">
                        {map.latitude ? (
                            <Box h={{ base: "100%", md: "50%" }} w={{ base: "100%", md: "50%" }} pt="2">
                                <MapContainer style={{ width: "100%"}} center={[map.latitude, map.longitude]} zoom={16} scrollWheelZoom={true}>
                                    <MyMapComponent latitude={map.latitude} longitude={map.longitude} />
                                </MapContainer>
                            </Box>

                        ) : (
                            ''
                        )}

                        <Box flex="1" height="600px" overflowX="auto" pt="2" >
                            <Flex direction={{base:"row", md:"column"}} alignItems="center" flexWrap="nowrap">
                                {properties ? (
                                    <>
                                        {properties.map((property) => (
                                            <Box p="2" flex="0 0 auto" width="full" key={property.id}>
                                                <PropertyBox mapView={mapView} setMyProperties={setMyProperties} property={property} />
                                            </Box>
                                        ))}
                                    </>
                                ) : (
                                    ""
                                )}
                            </Flex>
                        </Box>

                    </Flex>
                </>}
        </>
    );
};
