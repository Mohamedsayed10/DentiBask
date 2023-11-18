import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const teamMembers = [
  { id: 1, name: 'Mohammed Ali', image: '/1.jpeg', phoneNumber: '01149444026',email:'Muhammed.alyaleem@gmail.com' },
  { id: 2, name: 'Yehia Mohammed', image: '/2.jpeg', phoneNumber: '01156929289',email:'yehia.mohammed@gmail.com' },
  { id: 3, name: 'Mohammed Ashraf', image: '/3.jpeg', phoneNumber: '01111143574',email: 'mohammedaly9810@gmail.com'},
  { id: 4, name: 'Mohammed Sayed', image: '/4.jpeg', phoneNumber: '01113289444' ,email:'Mohamed.sayed@gmail.com'},
  { id: 5, name: 'Saher Emad', image: '/5.jpeg', phoneNumber: '01112424042',email: 'Shaher.emad@gmail.com'},
];

const AboutUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <img
        src="https://i.pinimg.com/originals/9c/87/99/9c879909741ebaa6b7a614071079e542.jpg"
        alt="Logo"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <h1>About Us</h1>
      <h4>
        Welcome to DentiBask! We are dedicated to providing quality services and products. Learn more about our
        team behind DentiBask.
      </h4>

      <Slider {...settings}>
        {teamMembers.map((member) => (
          <div key={member.id}>
            <Card>
              <CardMedia component="img" alt={member.name} height="380" image={member.image} />

              <CardContent>
                <Typography variant="h5" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {member.phoneNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {member.email}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AboutUs;
