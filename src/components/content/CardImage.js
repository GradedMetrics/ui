import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';
// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/CardImage';

const useStyles = createUseStyles(style);

function CardImage({
  cardId,
  description,
  setId,
}) {
  const classes = useStyles(useContext(ThemeContext));

  const [isPlaceholder, setPlaceholder] = useState();

  /**
   * If image url is 404 then this function is triggered, setting isPlaceholder to true
   */
  function handleImageError() {
    setPlaceholder(true);
  }

  /**
   * If isPlaceholder is false then the full image is loaded.  If the image cannot be found, onError
   * is triggered which runs handleImageError and sets isPlaceholder to true.  Only the span is
   * returned and a placeholder image is populated through the stylesheet
   */
  if (!isPlaceholder) {
    return (
      <img
        className={classes.cardImage}
        alt={description}
        onError={handleImageError}
        src={`https://i.gradedmetrics.com/raw/${setId}/${cardId}.jpg`}
      />
    );
  }
  return (
    <span className={classes.placeholder} />
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
