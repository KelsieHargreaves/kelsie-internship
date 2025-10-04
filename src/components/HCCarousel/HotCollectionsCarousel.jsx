import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import './owl.css';
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const HotCollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
          setCollections(res.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row title" style={{ marginBottom: "20px" }}></div>
      </div>
      <div className="container-fluid">
        <OwlCarousel {...options}>
          {collections.map((item, index) => (
            <div className="item" key={index}>
              <div className="nft_coll">
                {imgLoaded ? (
                  <>
                    <Skeleton
                      width="100%"
                      height="200px"
                      style={{ marginBottom: "10px" }}
                    />
                    <Skeleton
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                      style={{ margin: "0 auto 10px" }}
                    />
                    <Skeleton
                      width="70%"
                      height="20px"
                      style={{ margin: "0 auto" }}
                    />
                    <Skeleton
                      width="40%"
                      height="15px"
                      style={{ margin: "5px auto 0" }}
                    />
                  </>
                ) : (
                  <>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                          onLoad={() =>
                            setImgLoaded((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC{item.code}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default HotCollectionsCarousel;
