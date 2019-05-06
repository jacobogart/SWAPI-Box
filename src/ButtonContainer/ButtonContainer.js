import React from 'react';
import PropTypes from "prop-types";

export default function ButtonContainer(props) {
  return (
    <section
      className="ButtonContainer"
      onClick={event => props.selectCategory(event)}
    >
      <button className="category-button people-button">people</button>
      <button className="category-button planets-button">planets</button>
      <button className="category-button vehicles-button">vehicles</button>
      <button className="category-button favorites-button">favorites</button>
    </section>
  );
}

ButtonContainer.propTypes = {
  selectCategory: PropTypes.func
}