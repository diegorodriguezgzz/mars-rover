// Rover Object Goes Here
// ======================

/*Mapa del terreno
si está vacío no hay obstáculo, si no, sí hay obstáculo
Notablemente, está transpuesto y en inverso. La primera fila
es en realidad la columna 0*/
 var grid = [
   ["", "", "", "", "", "", "", "", "", ""],
   ["X", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "X", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
   ["", "", "", "", "", "", "", "", "", ""],
]

var renderMap = grid;

var travelLog = [];

var rover = {
  direction : "N",
  x : 0,
  y : 0
}

// ======================
function turnLeft(rover){
  if (rover.direction === "N") {
    rover.direction = "W";
  }
  else if (rover.direction === "W") {
    rover.direction = "S";
  }
  else if (rover.direction === "S") {
    rover.direction = "E";
  }
  else {
    rover.direction = "N";
  }
  console.log("turnLeft was called!");
  return rover;
}

function turnRight(rover){
  if (rover.direction === "N") {
    rover.direction = "E";
  }
  else if (rover.direction === "E") {
    rover.direction = "S";
  }
  else if (rover.direction === "S") {
    rover.direction = "W";
  }
  else {
    rover.direction = "N";
  }
  console.log("turnRight was called!");
  return rover;
}

//vamos a tener que checar que 0 <= x e y <= 9
function moveForward(rover){
  pastCoords = "[" + rover.x + "," + rover.y + "]";
  if (rover.direction === "N" && rover.y > 0) {
    rover.y = rover.y - 1;
    //Si choca, regresa true
    if (collisionCheck(rover.x, rover.y, grid)) {
      rover.y = rover.y + 1;
    }
  }
  else if (rover.direction === "W" && rover.x > 0) {
    rover.x = rover.x - 1;
    if (collisionCheck(rover.x, rover.y, grid)) {
      rover.y = rover.x + 1;
    }
  }
  else if (rover.direction === "S" && rover.y < 9) {
    rover.y = rover.y + 1;
    if (collisionCheck(rover.x, rover.y, grid)) {
      rover.y = rover.y - 1;
    }
  }
  else if (rover.direction === "E" && rover.x < 9){
    rover.x = rover.x + 1;
    if (collisionCheck(rover.x, rover.y, grid)) {
      rover.y = rover.x - 1;
    }
  }
  else {
    console.log("You can't move off the grid!");
  }
  console.log("You are now in [" + rover.x + "," + rover.y + "].");
  travelLog.push(pastCoords);
  // plotPosition(rover, grid);
  return rover;
}

function moveBackward(rover){
  pastCoords = "[" + rover.x + "," + rover.y + "]";
    if (rover.direction === "N" && rover.y < 9) {
      rover.y = rover.y + 1;
      if (collisionCheck(rover.x, rover.y, grid)) {
        rover.y = rover.y - 1;
      }
    }
    else if (rover.direction === "W" && rover.x < 9) {
      rover.x = rover.x + 1;
      if (collisionCheck(rover.x, rover.y, grid)) {
        rover.y = rover.y - 1;
      }
    }
    else if (rover.direction === "S" && rover.y > 0) {
      rover.y = rover.y - 1;
      if (collisionCheck(rover.x, rover.y, grid)) {
        rover.y = rover.y + 1;
      }
    }
    else if (rover.direction === "E" && rover.x > 0){
      rover.x = rover.x - 1;
      if (collisionCheck(rover.x, rover.y, grid)) {
        rover.y = rover.x + 1;
      }
    }
    else {
      console.log("You can't move off the grid!");
    }
    console.log("You are now in [" + rover.x + "," + rover.y + "].");
    travelLog.push(pastCoords);
    // plotPosition(rover, grid);
    return rover;
  }

function chainCommand (string) {
  for (char in string) {
    if (string[char] === "r"){
      rover = turnRight(rover);
    }
    else if (string[char] === "l") {
      rover = turnLeft(rover);
    }
    else if (string[char] === "f") {
      rover = moveForward(rover);
    }
    else if (string[char] === "b") {
      rover = moveBackward(rover);
    }
    else {
      console.log(string[char] + " is not a recognized instruction.");
    }
  }
  console.log(travelLog);
  return rover;
}

//Regresa TRUE si hay una colisión
function collisionCheck (x, y, map) {
  var check = false;
  if (map[x][y] !== "") {
    check = true;
    console.log("You encountered an obstacle!")
  }
  return check;
}

//Aquí estoy modificando grid, ¿por qué?
//Sólo quiero alterar la copia local.
//Al parecer es una bronca de pass by reference 
//Porque así se modifican los objetos y arreglos
// function plotPosition (rover, map) {
//   var localMap = map;
//   localMap[rover.x][rover.y] = "R";
//   console.log(localMap);
// }