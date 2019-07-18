/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Section from '../../components/Section';
import Img from './Img';
import BoxImg from './BoxImg';
import StyleH1 from './StyleH1';


// eslint-disable-next-line prettier/prettier

export default function HomePage() {


  // useEffect(() => {
  //   const text = document.getElementById("titleH1");

  //   const split = new SplitText(text);

  //   function random(min, max) {
  //     return (Math.random() * (max - min)) + min;
  //   }

  //   split.chars.each(function (i) {
  //     TweenMax.from($(this), 2.5, {
  //       opacity: 0,
  //       x: random(-500, 500),
  //       y: random(-500, 500),
  //       z: random(-500, 500),
  //       scale: .1,
  //       delay: i * .02,
  //       yoyo: true,
  //       repeat: -1,
  //       repeatDelay: 10
  //     });
  //   });
  // }, [])

  return (
    <Section>
      <BoxImg>
        <Img src="https://sas.edu.vn/wp-content/themes/neda/images/backgrounds/background.jpg" />
      </BoxImg>
      <StyleH1 id="titleH1"> Welcome to page trung tam anh ngu </StyleH1>
    </Section>
  );
}
