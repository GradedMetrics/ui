export const formatNumber = (number) => {
  if (!number) {
    return 0;
  }

  if (typeof number === 'number') {
    return number;
  }

  if (typeof number === 'string') {
    switch (number) {
      case 'BWP': // Unnumbered BW-P promo.
      case 'BW-P': // Unnumbered BW-P promo.
      case 'ONE': // Alph Lithograph from HeartGold & SoulSilver.
      case 'SM-P': // Unnumbered SM-P promo.
      case 'XY-P': // Unnumbered XY-P promo.
        return 9999;

      default:
        break;
    }

    if (/(a|b)$/.test(number)) {
      // Alternative artwork, sort above regular number.
      return Number(`${number.replace(/(a|b)$/, '')}.1`);
    }

    if (/\/[A-Z]$/.test(number)) {
      // Promo cards ending in /s.
      return Number(number.replace(/\/[A-Z]$/, ''));
    }

    if (/^BW[0-9]+$/.test(number)) {
      // BW Promo.
      return Number(number.replace('BW', ''));
    }

    if (/^DP[0-9]+$/.test(number)) {
      // DP Promo.
      return Number(number.replace('DP', ''));
    }

    if (/^H[0-9]+$/.test(number)) {
      // Uses H prefix for holos (Aquapolis, etc.). Sort before regular numbers begin.
      return Number(`0.${number.length === 2 ? '0' : ''}${number.replace('H', '')}`);
    }

    if (/^HGSS[0-9]+$/.test(number)) {
      // HGSS promo.
      return Number(number.replace('HGSS', ''));
    }

    if (/^RC[0-9]+$/.test(number)) {
      // Radiant Collection prefixes with 'RC'.
      return Number(number.replace('RC', ''));
    }

    if (/^SM[0-9]+$/.test(number)) {
      // SM Promo.
      return Number(number.replace('SM', ''));
    }

    if (/^TPCi[0-9]+$/.test(number)) {
      // Ishihara GX.
      return Number(number.replace('TPCi', ''));
    }

    if (/^XY[0-9]+$/.test(number)) {
      // XY Promo.
      return Number(number.replace('XY', ''));
    }
  }

  console.error('Unhandled card number', number); // eslint-disable-line no-console
  return -1;
};

/**
 * This take a year string from the api and formats it to include the century of the year
 * Greater than 94 is used as Pokemon TCG started in 1995 according to PSA
 * @param {String} year -  Year is the raw year string from api
 */
export const formatYear = (year) => {
  if (year.substring(0, 2) > 94) {
    return `19${year}`;
  }
  return `20${year}`;
};

export default {
  formatNumber,
  formatYear,
};
