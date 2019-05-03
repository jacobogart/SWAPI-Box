import React from 'react';

export default function CardContainer(props) {
  return (
    <section 
      className="ButtonContainer"
      onClick={event => props.selectCategory(event)}
    >
      <button className="category-button">people</button>
      <button className="category-button">planets</button>
      <button className="category-button">vehicles</button>
    </section>
  );
}