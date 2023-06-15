import { useEffect, useRef, useState } from "react"
import {Button} from "@chakra-ui/react"


export const UploadWidget =({onUpload}) => {
    const [url, setURL] = useState("")
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(
        () => {
            cloudinaryRef.current = window.cloudinary 
            widgetRef.current= cloudinaryRef.current.createUploadWidget({
                cloudName: 'diltmb7lo',
                uploadPreset: 'soa8w9ic',
                api_key: '373756337472976'
            }, function (error,result) {
                if ( error || result.event === 'success' ) {
                    onUpload(error, result);
                  }
                
               
            })
        },[]
    )
    return (
        <Button size="sm"color='gray.500'
        fontWeight='semibold'
        letterSpacing='wide'
        fontSize='m'
        textTransform='uppercase'
        ml='2'onClick={(event) => {event.preventDefault(); widgetRef.current.open()}} > Upload Picture</Button>
    )
}