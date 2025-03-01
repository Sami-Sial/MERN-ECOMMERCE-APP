import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import ProductCard from "./ProductCard";
import Pagination from "react-js-pagination";
import "./stylesheets/Home.css";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import { fetchProducts } from "../../redux-toolkit/slices/allProducts.slice";
import { useSelector, useDispatch } from "react-redux";
import HomeCarousel from "./HomeCarousel";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Home = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.allProductsSlice);

  const setCurrentPageNo = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  if (error) {
    toast.error(error);
  }

  let count = filteredProductsCount;
  console.log(resultPerPage, count);

  return (
    <div>
      <Header />

      <main>
        <HomeCarousel />

        <div id="main-content-part">
          <div id="sidebar">
            <h4 style={{ textAlign: "center" }}>All Filters</h4>

            <div className="filterBox" style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "18px" }}>Price</p>
              <Box sx={{ width: "100%" }}>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  size="small"
                  min={0}
                  max={25000}
                  color="danger"
                />
              </Box>
            </div>

            <p style={{ fontSize: "18px", marginBottom: "10px" }}>Categories</p>
            <div className="categoryBox">
              {categories.map((category) => (
                <p
                  style={{ marginBottom: "5px", cursor: "pointer" }}
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </p>
              ))}
            </div>

            <p style={{ marginTop: "1.5rem", fontSize: "18px" }}>
              Ratings Above
            </p>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
              color="danger"
              size="small"
            />
          </div>

          <div id="products">
            <h2>All Products</h2>
            <div id="product-card-wrapper">
              {Array.isArray(products) &&
                products.length > 0 &&
                products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
            </div>

            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
