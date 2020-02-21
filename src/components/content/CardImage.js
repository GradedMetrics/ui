import React, {useContext} from 'react';
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

  return (
    <img className={classes.cardImage} src={`https://i.gradedmetrics.com/raw/${setId}/${cardId}.jpg`} alt={description} />
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
