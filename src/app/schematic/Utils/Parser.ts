export function toBoolean(str: string) {
  if (str && str.toLowerCase() == 'true') {
    return true;
  } else {
    return false;
  }
}

export function convertPlanToScaleNumber(num: string) {
  if (num.indexOf('.') > 0) {
    const [left, right] = num.split('.');
    const leftNumber = parseInt(left);
    if (leftNumber > 0) {
      if (left.length >= 12) {
      } else if (left.length >= 9 && left.length <= 11) {
      } else if (left.length >= 6 && left.length <= 11) {
      }
    } else {
    }
  }
}
