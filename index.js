var numNodes = 0;
var mapOfNodes = {};
var xCenter = window.innerWidth/2;
var yCenter = window.innerHeight/2;

//will be used to add event listeners to any DOMs that need to be interacted with
window.onload = function()
{
    xCenter = window.innerWidth/2;
    yCenter = window.innerHeight/2;

    //setup all element listeners
    var nodeNumberSelect = document.getElementById("_node_number_select");
    numNodes = nodeNumberSelect.value;

    nodeNumberSelect.addEventListener("change", function(){
        //call logic to reset canvas and redisplay a network of X number of Nodes
        //apply algorithm to these nodes

        clear();
        deleteNodes();
        numNodes = nodeNumberSelect.value;
        initializeNodes();
        
        if (nodeNumberSelect.value != 0)
        {
            deleteNodes();
            numNodes = nodeNumberSelect.value;
            initializeNodes();
        }
    });

    initializeNodes();
    initializeConnection();
};


function setup() 
{
    c = createCanvas(window.innerWidth, window.innerHeight);
}
  
function windowResized() 
{
    xCenter = window.innerWidth/2;
    yCenter = window.innerHeight/2;
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() 
{   
    //sTree();

    if(numNodes != 0)
    {
        drawCircles();
    }
}

function sTree()
{   
    stroke(0);
    strokeWeight(0);
    textSize(50);
    text('Spanning Tree', xCenter, yCenter-350);
}

function drawCircles()
{
    for(var i = 0; i < numNodes; i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);

        //Draw a circles
        stroke(0);
        strokeWeight(2);
        
        fill(150, 150, 150, 127);
        ellipse(mapOfNodes[letter].x, mapOfNodes[letter].y, 90, 90);
        textSize(32);
        textAlign(CENTER,CENTER);
        text(letter, mapOfNodes[letter].x, mapOfNodes[letter].y);

        // if(i+1 == numNodes)
        // {
        //     break;
        // }
    }

    //drawConnection(mapOfNodes);
}

function drawConnection(mapOfNodes)
{
    alert("Asfa");
    //we are going to get a map [Letter as key, Node struct as value]
    //get value associated with the key
    //loop through that nodes list of connections
    //draw lines

    var currentLetter = 'A';

    for (var i = 0; i < numNodes; i++)
    {
        for (var j = 0; j < mapOfNodes[currentLetter].listOfLinkedNodes.length; j++)
        {
            //debugger;
            line(mapOfNodes[currentLetter].x, mapOfNodes[currentLetter].y, mapOfNodes[currentLetter].listOfLinkedNodes[j].x, mapOfNodes[currentLetter].listOfLinkedNodes[j].y);
        }

        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + i);
    }

    //draw a line from one node to the other
    /*stroke('red');
    strokeCap(ROUND);
    line(sixCords[node1-1].x, sixCords[node1-1].y, sixCords[node2-1].x, sixCords[node2-1].y);*/
}

function mousePressed() 
{
    var currentLetter = 'A';

    // Check if mouse is inside the circle
    for(var i = 0; i < numNodes; i++)
    {
        var d = dist(mouseX, mouseY, mapOfNodes[currentLetter].x, mapOfNodes[currentLetter].y);

        if (d < 45) 
        {
            //display info about the node
            alert(mapOfNodes[currentLetter].iAm);
        }

        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + i);
    }
  }


