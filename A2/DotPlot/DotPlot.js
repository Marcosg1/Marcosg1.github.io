let table;
let ageCounts = {}; // stores number of passengers by age

function preload() {
  table = loadTable("../titanic.csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 600);
  noLoop(); // draws once, no 60 fps
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
    .map((a) => int(a))
    .sort((a, b) => a - b);

  console.log("Ages:", ages);

  let maxAgeValue = Math.max(...ages);

  console.log("Max Age:", maxAgeValue);

  let marginLeft = 70;
  let marginBottom = 70;
  let marginTop = 70;
  let YaxisTicks = 35;

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
    let y = height - marginBottom - count * 10;
    fill(90, 130, 180);
    ellipse(x, y, 9, 9);
  }

  textAlign(CENTER, TOP);
  fill(0);
  text("Age", marginLeft + graphWidth / 2, height - 30);

  // X-axis bins and labels
  for (let a = 5; a <= maxAgeValue; a += 5) {
    let x = marginLeft + (a / maxAgeValue) * graphWidth;

    line(x, height - marginBottom, x, height - marginBottom + 5);
    text(a, x, height - marginBottom + 15);
  }

    // Y-axis ticks and numbers
  for (let b = 5 ; b <= YaxisTicks; b+= 5) {
    let y = height - marginBottom - (b / YaxisTicks) * (height - marginBottom - marginTop);
    line(marginLeft - 15, y, marginLeft, y);
    text(b, marginLeft - 10, y);
  }

  // Y-axis title
  textAlign(CENTER, CENTER);
  rotate(-HALF_PI);
  text("Number of Passengers", -height / 2, 20);
}
