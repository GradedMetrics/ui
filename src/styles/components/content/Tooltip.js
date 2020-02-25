const text = {
  background: '#111',
  borderRadius: 8,
  border: {
    color: '#333',
    style: 'solid',
    width: 1,
  },
  boxShadow: {
    blur: 3,
    color: '#000',
    x: 1,
    y: 1,
  },
  boxSizing: 'border-box',
  fontSize: 14,
  left: -103,
  lineHeight: '17px',
  margin: [4, 0],
  padding: [8, 12],
  position: 'absolute',
  transition: 'opacity .2s',
  width: 256,
  zIndex: 2,

  '& div': {
    margin: [0, 0, 4],

    '&:last-child': {
      marginBottom: 0,
    },
  },
};

export default {
  tooltip: {
    alignItems: 'center',
    cursor: 'help',
    display: 'inline-flex',
    position: 'relative',
  },
  hidden: {
    ...text,
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    ...text,
    opacity: 1,
  },
  helper: {
    borderBottom: {
      color: '#fff',
      style: 'dotted',
      width: 1,
    },
    color: '#C1BEBE',
    fontSize: 12,
    lineHeight: 'inherit',
  },
};
