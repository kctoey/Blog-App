import React from "react";
import classes from "./footer.module.css";
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
            voluptate tenetur officia excepturi iusto qui enim inventore
            provident? Voluptas repudiandae id sed alias mollitia labore eius
            reiciendis, temporibus veritatis explicabo.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contact</h2>
          <span>Phone</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Europe</span>
          <span>Current Location: Bulgaria</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
