let table;
let ageCounts = {}; // stores number of passengers by age

function preload() {
  table = loadTable('../titanic.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 600);
  textSize(20);
  fill(0);

  // Count passengers by age (rounded up)
  for (let r = 0; r < table.getRowCount(); r++) {
    let ageStr = table.getString(r, "Age");
    let age = Number(ageStr);

    if (!isNaN(age) && age > 0) {
      let roundedAge = Math.ceil(age);
      ageCounts[roundedAge] = (ageCounts[roundedAge] || 0) + 1;
    }
  }
}

function draw() {
  background(240);
  text("P5 Graph", width / 2, 20);

  let ages = Object.keys(ageCounts)
                  .map(a => int(a))
                  .sort((a, b) => a - b);

  let maxAgeValue = Math.max(...ages);

  let marginLeft = 50;
  let marginBottom = 50;
  let marginTop = 50;

  // draws axes
  stroke(0);
  line(marginLeft, height - marginBottom, width - 20, height - marginBottom); // X-axis
  line(marginLeft, height - marginBottom, marginLeft, marginTop); // Y-axis

  let graphWidth = width - marginLeft - 20;

  // draws dots for each age
  for (let i = 0; i < ages.length; i++) {
    let age = ages[i];
    let count = ageCounts[age];

    let x = marginLeft + (age / maxAgeValue) * graphWidth;

    for (let j = 0; j < count; j++) {
      let y = height - marginBottom - j * 5;
      fill(90, 130, 180);
      ellipse(x, y, 4, 4);
    }
  }

  textAlign(CENTER, TOP);
  fill(0);
  text("Age", marginLeft + graphWidth / 2, height - 20);

  // X-axis bins and labels
  for (let a = 0; a <= maxAgeValue; a += 5) {
    let x = marginLeft + (a / maxAgeValue) * graphWidth;

    line(x, height - marginBottom, x, height - marginBottom + 5);
    text(a, x, height - marginBottom + 15);
  }

  // Y-axis title
  textAlign(CENTER, CENTER);
  push();
  rotate(-HALF_PI);
  text("Number of Passengers", -height / 2, 20);
  pop();
}
