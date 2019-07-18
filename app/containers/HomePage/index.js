/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import React from 'react';
// import Section from '../../components/Section';
import Img from './Img';
import BoxImg from './BoxImg';
import StyleH1 from './StyleH1';


// eslint-disable-next-line prettier/prettier

export default function HomePage() {


  return (
    <React.Fragment>
      <BoxImg>
        <Img src="https://sas.edu.vn/wp-content/themes/neda/images/backgrounds/background.jpg" />
      </BoxImg>
      <StyleH1 id="titleH1"> Welcome to page trung tam anh ngu </StyleH1>
    </React.Fragment>
  );
}
