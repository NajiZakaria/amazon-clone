import React from "react";
import Product from "../Product/Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/08/digital/video/magellan/country/france/EvergreenRefresh/FromDec-19/FR_Evergreen_Refresh_ENG_SADLP_Tablet_1453x363.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="4545784"
            title="the lean startup"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={14.99}
            rating={5}
          />
          <Product
            id="45545784"
            title="hello its me ok"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={10.99}
            rating={4}
          />
        </div>
        <div className="home__row">
        <Product
            id="564423"
            title="hello its me ok"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={10.99}
            rating={3}
          />
          <Product
            id="54456456"
            title="hello its me ok"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={10.99}
            rating={3}
          />
          <Product
            id="54545"
            title="hello its me ok"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={10.99}
            rating={3}
          />
        </div>
        <div className="home__row">
        <Product
            id="02154651"
            title="hello its me ok"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT10v8n5CpJzTwD5Pn6Ab4Z0DWGKZjUUykWpw&usqp=CAU"
            price={10.99}
            rating={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
