var c;
var sixCords = [];
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
        initializeConnection();
        
        if (nodeNumberSelect.value != 0)
        {
            deleteNodes();
            numNodes = nodeNumberSelect.value;
            initializeNodes();
            initializeConnection();
        }
    });
    
    sixCords.push({node:'A',x:xCenter-175,y:yCenter-200});
    sixCords.push({node:'B',x:xCenter+175,y:yCenter-200});
    sixCords.push({node:'C',x:xCenter-175,y:yCenter+200});
    sixCords.push({node:'D',x:xCenter+175,y:yCenter+200});
    sixCords.push({node:'E',x:xCenter-300,y:yCenter});
    sixCords.push({node:'F',x:xCenter+300,y:yCenter}); 

    //initializeNodes();
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
    if(numNodes != 0)
    {
        drawCircles();
        drawConnections();
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
    for(var i = 0; i < sixCords.length;i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);

        //Draw a circles
        stroke(0);
        strokeWeight(2);
        
        fill(150, 150, 150, 127);
        ellipse(sixCords[i].x, sixCords[i].y, 90, 90);
        textSize(32);
        textAlign(CENTER,CENTER);
        text(letter, sixCords[i].x, sixCords[i].y);

        if(i+1 == numNodes)
        {
            break;
        }
    }
}

function drawConnections()
{
    for(var key in mapOfNodes)
    {
        var letterKey = mapOfNodes[key].iAm;
        var xCord1 = sixCords[letterKey].x;
        var yCord1 = sixCords[letterKey].y;

        for(var i = 0; i<mapOfNodes[key].listOfLinkedNodes.length;i++)
        {   
            var linkedLetter = mapOfNodes[key].listOfLinkedNodes[i];
            var xCord2 = sixCords[linkedLetter].x;
            var yCord2 = sixCords[linkedLetter].y;
            line(xCord1, yCord1, xCord2, yCord2);
        }
    }

}

function mousePressed() 
{
    // Check if mouse is inside the circle
    for(var i = 0; i < sixCords.length;i++)
    {
        var d = dist(mouseX, mouseY, sixCords[i].x, sixCords[i].y);
        if (d < 45) 
        {
            //display info about the node
            alert(sixCords[i].node + " - " + "x:" + sixCords[i].x + " y:" + sixCords[i].y);
        }
    }
  }


