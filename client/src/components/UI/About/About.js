import { Fragment } from "react";

import classes from "./About.module.css";

import barbellImage from "../../../assets/barbell.png";
import missionIcon from "../../../assets/fitness (2).png";
import plansIcon from "../../../assets/task (2).png";
import partnersIcon from "../../../assets/partners.png";

const About = () => {
  return (
    <Fragment>
      <section className={classes.top}>
        <h1>
          WE ARE <span>BE FIT</span> TEAM!
        </h1>
        <img src={barbellImage} alt="barbell" />
      </section>
      <div className={classes.line}></div>
      <section className={classes.lower}>
        <div className={classes.about}>
          <div>
            <h2 className={classes.about__title}>
              OUR <span className={classes.red}>MISSION</span> IS TO HELP YOU <br /> REACH
              YOUR <span className={classes.red}>FITNESS</span> AND
              <br /> <span className={classes.red}>HEALTH</span> GOALS.
            </h2>
            <div className={classes.about__description}>
              <p>
                At our company, we are committed to helping you achieve your fitness
                goals. Our mission is to provide you with personalized training and
                dietary plans that are tailored to your individual needs and preferences.
                We believe that everyone is unique, and therefore we take a personalized
                approach to each client's journey. Our experienced and knowledgeable
                trainers and nutritionists are here to guide and support you every step of
                the way.
              </p>
            </div>
          </div>
          <img className={classes.description_icon} src={missionIcon} alt="mission" />
        </div>
        <div className={classes.line}></div>
        <div className={classes["about--reverse"]}>
          <div>
            <h2 className={classes.about__title}>
              CUSTOMIZED <span className={classes.red}>TRAINING</span> AND{" "}
              <span className={classes.red}>DIET</span>
              <br />
              PLANS TO HELP YOU CREATE <br />
              SUSTAINABLE HABITS FOR <br /> A{" "}
              <span className={classes.red}>HEALTHY LIFESTYLE</span>.
            </h2>
            <div className={classes.about__description} style={{ width: "660px" }}>
              <p>
                We offer personalized training and dietary plans that are designed to help
                you achieve your fitness goals. Our services include one-on-one training
                sessions, personalized dietary plans, and ongoing support and guidance to
                ensure your success. We take a holistic approach to your health and
                fitness journey, taking into account your lifestyle, preferences, and
                goals. With our personalized approach, you can be confident that you will
                see results and achieve your goals.
              </p>
            </div>
          </div>
          <img
            src={plansIcon}
            style={{ width: "350px", height: "350px", marginTop: "15px" }}
            alt="plans"
          />
        </div>
        <div className={classes.line}></div>
        <div className={classes.about}>
          <div>
            <h2 className={classes.about__title}>
              YOUR TRUSTED PARTNER FOR <br /> ACHIEVING YOUR{" "}
              <span className={classes.red}>FITNESS</span> <br /> GOALS AND LIVING <br />{" "}
              A <span className={classes.red}>BETTER LIFE</span>.
            </h2>
            <div className={classes.about__description} style={{ width: "620px" }}>
              <p>
                At our company, we pride ourselves on our expertise and ability to deliver
                results. Our team is made up of experienced and knowledgeable trainers and
                nutritionists who are dedicated to helping you achieve your goals. We take
                a science-based approach to training and nutrition, ensuring that our
                plans are effective and safe. Our personalized approach ensures that you
                get the support and guidance you need to succeed. Choose us and let us
                help you become the best version of yourself.
              </p>
            </div>
          </div>
          <img className={classes.description_icon} src={partnersIcon} alt="partners" />
        </div>
      </section>
    </Fragment>
  );
};

export default About;
