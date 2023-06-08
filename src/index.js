import React from 'react';
import  { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { HomePlace } from './HomePlace';
import { ChakraProvider} from '@chakra-ui/react'
 import './index.css';



const container = document.getElementById("root")
const root = createRoot(container)
root.render(
   
    <BrowserRouter>
        <HomePlace/>
    </BrowserRouter>
    
)
