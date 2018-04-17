//will be used to add event listeners to any DOMs that need to be interacted with
window.onload = function()
{
    //setup all element listeners
    var nodeNumberSelect = document.getElementById("_node_number_select");
    nodeNumberSelect.addEventListener("change", function(){
        //call logic to reset canvas and redisplay a network of X number of Nodes
        //apply algorithm to these nodes
        alert("adf");
    });


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
}

function draw() 
{
    // if (mouseIsPressed)
    // {
    //     fill(0);
    // }
    // else
    // {
    //     fill(255);
    // }
    // ellipse(mouseX, mouseY, 80, 80);
}
