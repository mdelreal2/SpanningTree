var numNodes = 0;
var isOverCircle;
var backgroundColor;
var listOfNodes = [];

//will be used to add event listeners to any DOMs that need to be interacted with
window.onload = function()
{
    //setup all element listeners
    var nodeNumberSelect = document.getElementById("_node_number_select");
    numNodes = nodeNumberSelect.value;

    nodeNumberSelect.addEventListener("change", function(){
        //call logic to reset canvas and redisplay a network of X number of Nodes
        //apply algorithm to these nodes
        if (nodeNumberSelect.value != 0)
        {
            numNodes = nodeNumberSelect.value;
        }
    });

    initializeNodes();

    /*
    var newNode = SpanningTreeNode("A");
    var pushNode = SpanningTreeNode("B");
    var pushNode2 = SpanningTreeNode("C");

    newNode.listOfLinkedNodes.push(pushNode);
    newNode.listOfLinkedNodes.push(pushNode2);

    for (var i = 0; i < newNode.listOfLinkedNodes.length; i++)
    {
        alert(newNode.listOfLinkedNodes[i].rootIs);
    }
    */
}

function setup() 
{
    createCanvas(640, 480);
    backgroundColor = color(255, 255, 255);
}

function draw() 
{
    background(backgroundColor);
    // get distance between mouse and circle
    var distance = dist(mouseX, mouseY, 200, 200); 
     
    // if the distance is less than the circle's radius
    if(distance < 50)
    {
     isOverCircle = true;
    } else {
       isOverCircle = false;
    }
     
    //draw a circle
    ellipseMode(CENTER);
    stroke(0);
    strokeWeight(5);

    if(isOverCircle == true)
    {
      fill(100);
      cursor(HAND);
    } else {
     fill(200); 
     cursor(ARROW); 
    }
    ellipse(200, 200, 100, 100);
}

function mousePressed()
{
  if(isOverCircle == true)
  {
    backgroundColor = color(random(255), random(255), random(255));
  }
}

