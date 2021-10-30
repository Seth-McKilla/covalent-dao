export function numbersWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function abbrNumber(x) {
  if (x >= 1000000000) {
    return (x / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (x >= 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (x >= 1000) {
    return (x / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return x;
  }
}
