
export function getArc(lastAngle: number, total: number, value: number) {
    let angle = Math.round(lastAngle + (value / total) * 360);
    return angle;
  }
  
 export function getSecondEndpoints(
    startingX: number,
    startingY: number,
    radius: number,
    lastAngle: number,
    angle: number,
    centerX: number,
    centerY: number
  ) {
    let x = 0;
    let y = 0;
    let largeArc = 0;
    let direction = 0;
    let midAngle = lastAngle + (angle - lastAngle) / 2;
    let lengthOfArc = Math.abs(calculateArcLength(lastAngle - angle, radius));
    let perimeter = calculateArcLength(360, radius);
    x = centerX + Math.round(radius * Math.cos((angle * Math.PI) / 180));
    y = centerY + Math.round(radius * Math.sin((angle * Math.PI) / 180));
    let xMid =
      centerX + Math.round(radius * Math.cos((midAngle * Math.PI) / 180));
    let yMid =
      centerY + Math.round(radius * Math.sin((midAngle * Math.PI) / 180));
    let xInner =
      centerX +
      Math.round(
        (radius - ((lengthOfArc / perimeter) * 100 >= 40 ? 20 : 35)) *
          Math.cos((midAngle * Math.PI) / 180)
      );
    let yInner =
      centerY +
      Math.round(
        (radius - ((lengthOfArc / perimeter) * 100 >= 40 ? 20 : 35)) *
          Math.sin((midAngle * Math.PI) / 180)
      );
  
    let xOuter =
      centerX +
      Math.round(
        (radius + ((lengthOfArc / perimeter) * 100 >= 40 ? 100 : 30)) *
          Math.cos((midAngle * Math.PI) / 180)
      );
    let yOuter =
      centerY +
      Math.round(
        (radius + ((lengthOfArc / perimeter) * 100 >= 40 ? 80 : 30)) *
          Math.sin((midAngle * Math.PI) / 180)
      );
  
    if ((angle - lastAngle) % 360 <= 90) {
      largeArc = 0;
      direction = 1;
    } else if (
      (angle - lastAngle) % 360 > 90 &&
      angle - (lastAngle % 360) <= 180
    ) {
      largeArc = 0;
      direction = 1;
    } else if (angle - lastAngle > 180 && angle - lastAngle <= 270) {
      largeArc = 1;
      direction = 1;
    } else {
      largeArc = 1;
      direction = 1;
    }
    return {
      x,
      y,
      largeArc,
      direction,
      xMid,
      yMid,
      xInner,
      yInner,
      yOuter,
      xOuter,
    };
  }
  
 export function calculateArcLength(Theta: number, R: number): number {
    // Convert the angle to radians if it's given in degrees
    const angleInRadians = (Theta * Math.PI) / 180;
  
    // Calculate the arc length
    const arcLength = angleInRadians * R;
  
    return arcLength;
  }