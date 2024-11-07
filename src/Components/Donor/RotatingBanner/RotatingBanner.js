import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import './RotatingBanner.css';

const RotatingBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        // 'https://media.licdn.com/dms/image/D5612AQH4UwVMye63zg/article-cover_image-shrink_720_1280/0/1682324822448?e=1727308800&v=beta&t=agauIIbW1XLwWuFseconv32gCiY0Rt_h8y4Ju9CIlPE',
        'https://www.usatoday.com/gcdn/-mm-/d3b6dffaeec46acd6996b0f8d5e950f095216e0b/c=0-125-2045-1280/local/-/media/2018/06/12/USATODAY/USATODAY/636643942202141206-GettyImages-515836063.jpg',
        '/token.png',
        "https://image.savethechildren.org/three-friends-tanya-shathi-and-jhumur-ch11043036.jpg/pxvvof42byj6mv8betnp40w6ou100q50.jpg?g=auto&w=1536&format=webp&itok=yJEt1aV2"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="rotating-banner">
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={images[currentIndex]}
                    alt="Banner Image"
                />
            </Card>
        </Box>
    );
};

export default RotatingBanner;
