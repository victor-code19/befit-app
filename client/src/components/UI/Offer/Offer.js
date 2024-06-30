import { useState, useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";

import CartContext from "../../../store/cart-context";
import Modal from "../Modals/WarningModal";

import classes from "./Offer.module.css";

const Offer = () => {
  const cartCtx = useContext(CartContext);

  const authToken = useRouteLoaderData("root");
  const [showWarningModal, setShowWarningModal] = useState(false);

  const addToCartHandler = (item) => {
    if (authToken) {
      cartCtx.addItem(item);
    } else {
      setShowWarningModal(true);
    }
  };

  const closeModalHandler = () => {
    setShowWarningModal(false);
  };

  return (
    <section className={classes.offer}>
      <h1>
        OUR <span className={classes.red}>OFFER</span>
      </h1>
      <div className={classes.cards}>
        <div className={classes.card}>
          <h2>WORKOUT PLAN</h2>
          <ul>
            <li>Personalized to your fitness level and goals</li>
            <li>Designed by experienced trainers</li>
            <li>
              Address your individual needs, such as weight loss, muscle gain, or injury
              recovery
            </li>
            <li>Include both cardio and strength training</li>
            <li>Offer flexible scheduling options to fit your busy lifestyle</li>
            <li>Provide support and motivation to help you reach your goals</li>
          </ul>
          <div>
            <span>
              49.99<span className={classes.dollar}>$</span>
            </span>
            <button
              onClick={() => {
                addToCartHandler({
                  id: "1",
                  name: "Workout Plan",
                  price: 49.99,
                  quantity: 1,
                });
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <h2>DIET PLAN</h2>
          <ul>
            <li>Tailored to your individual dietary needs and preferences</li>
            <li>Designed by registered dietitians with expertise in nutrition science</li>
            <li>Provide balanced and healthy meals that taste delicious</li>
            <li>Offer vegetarian, vegan, and gluten-free options</li>
            <li>Meal plans that are easy to follow and fit into your lifestyle</li>
            <li>Tips and tricks for healthy eating on the go</li>
          </ul>
          <div>
            <span>49.99$</span>
            <button
              onClick={() => {
                addToCartHandler({
                  id: "2",
                  name: "Diet Plan",
                  price: 49.99,
                  quantity: 1,
                });
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <h2>WORKOUT PLAN + DIET PLAN</h2>
          <ul>
            <li>Includes both workout and diet plan</li>
            <li>This option provides the best results</li>
            <li>Premium quality at affordable price</li>
            <li>Save up to 20$ buying this plan</li>
            <li style={{ color: "#8bad8d" }}>
              PLUS: Receive a bonus pack of fitness gear, including resistance bands, a
              jump rope, and a shaker bottle!
            </li>
          </ul>
          <div>
            <span>99.99$</span>
            <button
              onClick={() => {
                addToCartHandler({
                  id: "3",
                  name: "Workout + Diet Plan",
                  price: 99.99,
                  quantity: 1,
                });
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {showWarningModal && (
        <Modal
          title="Authorization Error"
          message="Create an account or login to purchase the plan."
          onConfirm={closeModalHandler}
        />
      )}
    </section>
  );
};

export default Offer;
