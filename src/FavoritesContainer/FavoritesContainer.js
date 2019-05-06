import React from "react";
import Card from "../Card/Card";

export default function FavoritesContainer(props) {
  console.log(props);
  const favoriteCards = props.favorites.map(favorite => (
    <Card 
      key={favorite.key} 
      data={favorite} 
      category="favorite" 
      addToFavorites={props.addToFavorites}
    />
  ));

  return (
    <section className="cardContainer favoritesContainer">
      {favoriteCards}
    </section>
  );
}

