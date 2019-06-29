export default class DistanceConverter {
  static transform(distance) {
    let numDistance, unit;
    distance = distance / 1000;
    let distanceAsString = (distance * 1000).toString();
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'km';
    } else {
      numDistance = parseInt(distanceAsString, 10);
      unit = 'm';
    }
    return numDistance + unit;
  }
}