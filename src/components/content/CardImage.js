import React from 'react';

function CardImage({
  cardId,
  description,
  setId
}) {
  return (
    <img src={`https://i.gradedmetrics.com/raw/${setId}/${cardId}.jpg`} alt={description}/>
  )
};

export default CardImage;