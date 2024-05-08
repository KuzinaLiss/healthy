import React from "react";
import {About} from "../pages/StartPage/about";
import {Star} from "../pages/StartPage/start";
import {Work} from "../pages/StartPage/work";
import {Contact} from "../pages/StartPage/contact";
import {Footer} from "../pages/StartPage/footer";



export const Start = () => {
 


    return (
        <div id="contentContainer">

          <Star />
          <About />
          <Work  />
          <Contact />
          <Footer />
          
        </div>
      );
 };
