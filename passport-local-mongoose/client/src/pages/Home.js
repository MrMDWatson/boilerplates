import React from "react";
import { Container, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgTest1 from "../images/imgTest1.jpg";
import imgTest2 from "../images/imgTest2.jpg";
import imgTest3 from "../images/imgTest3.jpg";
import "../App.css";

function Home() {

  const [quote, setQuote] = React.useState("");
  
  const getQuote = async () => {
    try {
      const response = await fetch("/quote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      setQuote(result);
    } catch(error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    //getQuote();
  }, []);
  
  return (
    <div id="Home">
      
      <Carousel>
        <Carousel.Item>
          <Image src={imgTest1} alt="img 1" fluid />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={imgTest2} alt="img 2" fluid />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={imgTest3} alt="img 3" fluid />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      <br />
      
      <div id="quote-box">
        <div id="quote">
          <h3 id="text">{quote.description}</h3>
        </div>
        <div id="author">
          <p>{quote.author ? `- ${quote.author}`: ""}</p>
        </div>
        <div id="quote-footer">
          <a href="https://twitter.com/intent/tweet" id="tweet-quote" target="_blank">Post on X</a>
          <button id="new-quote"  onClick={getQuote}>New Quote</button>
        </div>
      </div>
      
    </div>
  );
}

export default Home;