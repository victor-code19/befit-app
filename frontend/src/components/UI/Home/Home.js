import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./Home.module.css";

import photo from "../../../assets/befit-main.png";

import { FaDumbbell } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { GiProgression } from "react-icons/gi";

const Home = () => {
  return (
    <Fragment>
      <section className={classes.top}>
        <div>
          <div className={classes.slogan}>
            <span className={classes.slogan__red}>UNLEASH YOUR POTENTIAL</span>
            <span className={classes.slogan__white}>WITH OUR FITNESS</span>
            <span className={classes.slogan__white}>PROGRAMS</span>
          </div>
          <p className={classes.description}>
            We will help you reach your health and fitness goals through personalized
            nutrition <br /> and workout plans. Our team of experts has crafted a variety
            of effective diet and <br /> exercise programs to suit your individual needs.
            Check out our offer and blog <br /> for the latest fitness trends, nutrition
            tips and more.
          </p>
          <Link to="/offer" className={classes.offer__btn}>
            Check offer
          </Link>
        </div>
        <img className={classes.main_photo} src={photo} alt="main" />
      </section>
      <div className={classes.line} />
      <section className={classes.lower}>
        <div className={classes.container}>
          <div className={classes.card}>
            <span>
              <FaDumbbell size="3em" fontSize="20px" color="#F4F4F4" />
            </span>
            <h2>TRAINING PLANS</h2>
            <p>
              We offer a wide range of fitness training plans that are designed to help
              you achieve your fitness goals. Whether you want to build muscle, lose
              weight, or improve your overall fitness level, our plans are tailored to
              your individual needs and preferences. With expert guidance and support,
              you'll be on your way to a healthier, happier you in no time!
            </p>
          </div>
          <div className={classes.card}>
            <span>
              <BiFoodMenu size="3em" fontSize="20px" color="#F4F4F4" />
            </span>
            <h2>DIET PLANS</h2>
            <p>
              Say goodbye to one-size-fits-all diets and hello to personalized nutrition
              plans! Our team of registered dietitians will work with you to create a
              customized meal plan that meets your unique dietary needs and preferences.
              From weight loss to managing chronic conditions, our plans are designed to
              help you achieve optimal health and wellness.
            </p>
          </div>
          <div className={classes.card}>
            <span>
              <GiProgression size="3em" fontSize="20px" color="#F4F4F4" />
            </span>
            <h2>TRACKING PROGRESS</h2>
            <p>
              We understand the importance of keeping track of your progress, which is why
              we provide personalized progress reports to help you stay on track towards
              your fitness and nutrition goals. Our trainers will work with you to create
              a plan that fits your individual needs and abilities, and then regularly
              assess your progress and provide feedback to help you make any necessary
              adjustments.
            </p>
          </div>
        </div>
      </section>
      <div className={classes.line} />
      <section className={classes.lower}>
        <div className={classes.slogan_two}>
          <span className={classes.slogan__red}>GYM AND FITNESS</span>
          <span style={{ marginLeft: "15px" }} className={classes.slogan__white}>
            IS A JOURNEY SO
          </span>
          <span className={classes.slogan__white}>
            LET
            <span
              style={{ display: "inline", marginLeft: "10px", marginRight: "10px" }}
              className={classes.slogan__red}
            >
              US
            </span>
            GUIDE YOU.
          </span>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
