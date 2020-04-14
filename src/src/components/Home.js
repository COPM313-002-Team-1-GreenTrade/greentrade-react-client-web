
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';
import Carousel from "react-bootstrap/Carousel";

function Home(props)
{
    const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

      return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            style={{width: 1600, height: 620}}
            src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plastic-bottle-on-beach-1524563288.jpg'
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Green Trade Means Less Pollution</h3>
            <p>Environment is life, pollution is death.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{width: 1600, height: 620}}
            src='https://www.rd.com/wp-content/uploads/2020/03/GettyImages-1176700286.jpg'
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Green Trade Means More Sustanability</h3>
            <p>No intelligent species would destroy their own environment.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{width: 1600, height: 620}}
            src='https://www.utoronto.ca/sites/default/files/2018-06-18-plastic-lake-getty.jpg'
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Green Trade Means Brighter Future</h3>
            <p>
              Heal the earth, heal our future.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      )

}

export default withRouter(Home);