import React from 'react';
import PropTypes from 'prop-types';

function CardImage({
  cardId,
  description,
  setId,
}) {
  return (
    <img src={`https://i.gradedmetrics.com/raw/${setId}/${cardId}.jpg`} alt={description} />
  );
}

CardImage.propTypes = {
  // The ID of the card.
  cardId: PropTypes.number.isRequired,

  // A description of the card (used as the image's `alt` tag).
  description: PropTypes.string.isRequired,

  // The ID of the set the card belongs to.
  setId: PropTypes.number.isRequired,
};

export default CardImage;
