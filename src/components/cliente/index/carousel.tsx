import React from 'react';
import { Carousel } from 'antd';
import imagem1 from '../../assets/imgs/carousel-banner.png';

const slides = [imagem1, imagem1, imagem1, imagem1];

const carouselItemStyle: React.CSSProperties = {
  width: '100vw',
  height: '250px'
};

const App: React.FC = () => (
  <Carousel autoplay autoplaySpeed={7000}>
    {slides.map((image, index) => (
      <div key={index}>
        <div
          style={{
            ...carouselItemStyle,
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </div>
    ))}
  </Carousel>
);

export default App;
