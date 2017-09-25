ready(main);

/**
 * The main function
 */
function main() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var width = innerWidth;
  var height = innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Element for showing points
  var pointSpan = document.getElementById('points');
  // Element for flash effect
  var flash = document.getElementById('flash');

  // Load sounds for shooting and hitting the target
  var shoot = new Audio('pang.mp3');
  var hit = new Audio('hit.mp3');

  var points = 0;
  // Make the radius of the circle responsive
  var targetRadius = (width / 20);
  // X and Y should not make the circle go outside of the viewable area
  var getRandX = generateRandIntFunc(targetRadius, width - targetRadius);
  var getRandY = generateRandIntFunc(targetRadius, height - targetRadius);
  var targetX = getRandX();
  var targetY = getRandY();
  var lastMouseX = 0;
  var lastMouseY = 0;

  // Draw target and show points initially (if not, the user won't see them
  // before moving the mouse)
  drawTarget(ctx, targetX, targetY, targetRadius);
  showPoints(pointSpan, points);

  window.addEventListener('mousemove', function(evt) {
    lastMouseX = evt.clientX;
    lastMouseY = evt.clientY;

    ctx.clearRect(0, 0, width, height); // Clear the whole canvas

    drawTarget(ctx, targetX, targetY, targetRadius);
    drawCrosshair(ctx, evt.clientX, evt.clientY, '#00ff00');
  });

  window.addEventListener('click', function(evt) {
    shoot.load();
    shoot.play();
    shootEffect(flash);

    var centerRadius = targetRadius / 3;
    var centerX = targetX - centerRadius;
    var centerY = targetY - centerRadius;

    // Check if the user hit the target
    if (mouseInRect(evt.clientX, evt.clientY, centerX, centerY, centerRadius * 2, centerRadius * 2)) {
      points++;
    }
    if (mouseInRect(evt.clientX, evt.clientY, targetX - targetRadius,
      targetY - targetRadius, targetRadius * 2, targetRadius * 2)) {
      hit.load();
      hit.play();

      ctx.clearRect(0, 0, width, height);
      // Increment points and generate new target
      points++;
      targetX = getRandX();
      targetY = getRandY();
      showPoints(pointSpan, points);
      drawTarget(ctx, targetX, targetY, targetRadius);
      drawCrosshair(ctx, evt.clientX, evt.clientY, '#00ff00');
    }
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 32) {
      shoot.load();
      shoot.play();
      shootEffect(flash);

      // Check if the last known X and Y was on the target
      var centerRadius = targetRadius / 3;
      var centerX = targetX - centerRadius;
      var centerY = targetY - centerRadius;

      // Check if the user hit the target
      if (mouseInRect(lastMouseX, lastMouseY, centerX, centerY, centerRadius * 2, centerRadius * 2)) {
        points++;
      }
      if (mouseInRect(lastMouseX, lastMouseY, targetX - targetRadius,
        targetY - targetRadius, targetRadius * 2, targetRadius * 2)) {
        hit.load();
        hit.play();

        ctx.clearRect(0, 0, width, height);
        // Increment points and generate new target
        points++;
        targetX = getRandX();
        targetY = getRandY();
        showPoints(pointSpan, points);
        drawTarget(ctx, targetX, targetY, targetRadius);
        drawCrosshair(ctx, lastMouseX, lastMouseY, '#00ff00');
      }
    }
  });

  /**
   * If the user resizes the window, we want to assign width and height again,
   * set canvas width and height to the new values, generate new random
   * functions, and also generate a new target
   */
  window.addEventListener('resize', function() {
    width = innerWidth;
    height = innerHeight;
    canvas.width = width;
    canvas.height = height;

    targetRadius = (width / 20);
    getRandX = generateRandIntFunc(targetRadius, width - targetRadius);
    getRandY = generateRandIntFunc(targetRadius, height - targetRadius);
    targetX = getRandX();
    targetY = getRandY();

    drawTarget(ctx, targetX, targetY, targetRadius);
  });
}

/**
 * The shooting effect. Set opacity to 1, and wait for next animation frame
 * to apply transition (so the transition only is in effect when setting
 * opacity back to 0). Remove the styles after a timeout of 200ms (the
 * transition duration) so the effect works the next time
 */
function shootEffect(el) {
  el.style.opacity = 1;
  requestAnimationFrame(function() {
    el.style.transition = 'opacity 200ms';
    el.style.opacity = 0;

    setTimeout(function() {
      requestAnimationFrame(function() {
        el.style.opacity = null;
        el.style.transition = null;
      });
    }, 200);
  });
}

/**
 * Check if mouse position is inside of the specified rectangle's boundaries
 */
function mouseInRect(mouseX, mouseY, rectX, rectY, rectW, rectH) {
  if ((mouseX >= rectX && mouseX <= rectX + rectW) &&
    (mouseY >= rectY && mouseY <= rectY + rectH)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Draw a crosshair.
 */
function drawCrosshair(ctx, x, y, color) {
  var lineWidth = 5;
  var lineLength = 20;
  var spacing = 5;

  ctx.fillStyle = color;
  ctx.fillRect(x - (lineLength + spacing), y - (lineWidth / 2), lineLength, lineWidth);
  ctx.fillRect(x + spacing, y - (lineWidth / 2), lineLength, lineWidth);

  ctx.fillRect(x - (lineWidth / 2), y - (lineLength + spacing), lineWidth, lineLength);
  ctx.fillRect(x - (lineWidth / 2), y + spacing, lineWidth, lineLength);
}

/**
 * Draw the target
 */
function drawTarget(ctx, x, y, radius) {
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, (radius * 2) / 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(x, y, radius / 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

/**
 * Show the points inside the specified element
 */
function showPoints(el, points) {
  el.textContent = points;
}

/**
 * Generate a function that returns a random integer between min and max
 * (includes min and max). If only one argument is specified, set min to 0 and
 * use the specified argument as max
 */
function generateRandIntFunc(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }

  return function() {
    return Math.round((Math.random() * (max - min)) + min);
  }
}

/**
 * Call function if the document has been loaded
 */
function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
