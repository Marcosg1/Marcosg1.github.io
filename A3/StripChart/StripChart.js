let ageClassArr = [];

function preload() {
    table = loadTable("../titanic.csv", "csv", "header");
}

function setup() {
    createCanvas(1000, 600);
    noLoop();

    // gets rounded up ages and their corresponding Pclass
    for (let r = 0; r < table.getRowCount(); r++) {
        let rawAge = table.getString(r, "Age");
        let age = Number(rawAge);
        let pclass = table.getString(r, "Pclass");

        if (!isNaN(age) && age > 0) {
            let ageClassObj = { age: Math.ceil(age), pclass };
            ageClassArr.push(ageClassObj);
        }
    }
    console.log("ageClassArr:", ageClassArr);
}

function draw() {
    background(255);

    let marginLeft = 70;
    let marginRight = 70;
    let marginTop = 70;
    let marginBottom = 70;

    // y-axis
    stroke(0);
    line(marginLeft, marginTop, marginLeft, height - marginBottom);
    
    // y-axis ticks
    textSize(12);
    textAlign(RIGHT, CENTER);
    for (let yVal = 0; yVal <= 80; yVal += 10) {
        let y = map(yVal, 0, 80, height - marginBottom, marginTop);

        stroke(0);
        line(marginLeft - 6, y, marginLeft, y);

        noStroke();
        text(yVal, marginLeft - 10, y);
    }

    // y-axis label
    push();
    translate(20, height / 2);
    rotate(-HALF_PI);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Age (rounded)", 0, 0);
    pop();

    // x-axis labels
    let classes = ["1", "2", "3"];
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Pclass", width / 2, height - marginBottom + 50);
    textSize(14);

    // place class labels under x-axis with same spacing as points
    for (let i = 0; i < classes.length; i++) {
        let x = map(i + 1, 1, 3, marginLeft + 50, width - marginRight - 50);
        text(classes[i], x, height - marginBottom + 20);
    }

    // title
    textSize(24);
    textAlign(CENTER);
    text("Strip Chart of Age vs Pclass", width / 2, 40);

    // plot points with jitter
    for (let i = 0; i < ageClassArr.length; i++) {
        let ageClass = ageClassArr[i];

        // place points on same x for each class
        let x = map(Number(ageClass.pclass), 1, 3, marginLeft + 50, width - marginRight - 50);

        // jitter
        x += random(-20, 20);

        let y = map(ageClass.age, 0, 80, height - marginBottom, marginTop);

        // different colors for each class
        if (ageClass.pclass == "1") {
            fill(200, 0, 0, 150); 
        } else if (ageClass.pclass == "2") {
            fill(0, 0, 200, 150);
        } else if (ageClass.pclass == "3") {
            fill(0, 150, 0, 150);
        }

        noStroke();
        ellipse(x, y, 7, 7);
    }
}
