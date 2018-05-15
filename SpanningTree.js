//The Spanning Tree Protocol (STP) is a network protocol that 
//builds a loop-free logical topology for Ethernet networks. 
//The basic function of STP is to prevent bridge loops 
//and the broadcast radiation that results from them.
function SpanningTreeNode(label)
{
    var node = {
        iAm:label,
        rootIs:label, 
        hopsToRoot:0, 
        sender:label,
        listOfLinkedNodes:[],
        nextStep:[3], //iAm, rootIs, hopsToRoot
        x: 0,
        y: 0,
        bestRoot:label
    };
    
    return node;
}

function deleteNodes()
{
    mapOfNodes = {};
}

function initializeNodes()
{
    for (var i = 0; i < numNodes; i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        var newNode = SpanningTreeNode(letter);

        switch(letter)
        {
            case 'A':
                newNode.x = xCenter - 150;
                newNode.y = yCenter - 200;
                break;
            
            case 'B':
                newNode.x = xCenter + 150;
                newNode.y = yCenter - 200;
                break;

            case 'C':
                newNode.x = xCenter - 150;
                newNode.y = yCenter + 200;
                break;

            case 'D':
                newNode.x = xCenter + 150;
                newNode.y = yCenter + 200;
                break;

            case 'E':
                newNode.x = xCenter - 250;
                newNode.y = yCenter + 0;
                break;

            case 'F':
                newNode.x = xCenter + 250;
                newNode.y = yCenter + 0;
                break;
        }

        mapOfNodes[letter] = newNode;
    }
}

function initializeConnection()
{
    var unusedNodes = [];
    
    //starting at 1 because we don't want 'A' inside the array. Not allowing A the chance the chance to connect to itself
    for (var i = 1; i < numNodes; i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        unusedNodes.push(letter);
    }

    var currentNode = 'A';
    
    //initialize connections to be able to have a path to the root
    for (var i = 0; i < numNodes - 1; i++)
    {
        //generate random number to index 'unusedNodes' between 0 and the length of the array
        var rand = Math.floor(Math.random() * unusedNodes.length);

        //push the change to the origin
        mapOfNodes[currentNode].listOfLinkedNodes.push(unusedNodes[rand]);
  
        //push the change to the endpoint
        mapOfNodes[unusedNodes[rand]].listOfLinkedNodes.push(currentNode);

        //have the next iteration of the loop start its connection from the random ending point
        currentNode = unusedNodes[rand];

        //remove the new origin connection from the array so it cannot have a loopback issue
        unusedNodes.splice(rand, 1);
    }

    //unusedNodes should now be empty

    currentNode = 'A';

    //add a random number of extra connections to the nodes for the algorthim to work with
    for (var i = 0; i < numNodes; i++)
    {
        var availableConnections = [];

        //push all available nodes to initialize a full list
        for (var j = 0; j < numNodes; j++)
        {
            var c = 'A';
            var letter = String.fromCharCode(c.charCodeAt(0) + j);
            availableConnections.push(letter);
        }

        //remove the trivial case of being connected to itself
        var index = availableConnections.indexOf(currentNode);
        availableConnections.splice(index, 1);

        var deleteCounter = numNodes - 1;
        //remove all the impossible connections :: numNodes - 1 becuase there is now one less possible connection after the trivial case
        for (var j = 0; j < deleteCounter; j++)
        {
            //alert(availableConnections.toString());
            var index = mapOfNodes[currentNode].listOfLinkedNodes.indexOf(availableConnections[j]);

            //if a node is already connected to the currentNode, then delete it as a possible connection
            if (index != -1)
            {
                availableConnections.splice(j, 1);
                j = j - 1;
                deleteCounter = deleteCounter - 1;
            }
        }

        //after only a list of possible connections exists, randomly pick a value between 0 and the # of possible connections to add to the current node
        //TRY AND WEIGHT THE VALUE TO BE LOWER RATHER THAN ANY VALID VALUE
        var rand = Math.floor(Math.random() * availableConnections.length);

        for (var j = 0; j < rand; j++)
        {
            var randIndex = Math.floor(Math.random() * availableConnections.length);
            var connectionValue = availableConnections[randIndex];

            mapOfNodes[currentNode].listOfLinkedNodes.push(connectionValue);

            mapOfNodes[connectionValue].listOfLinkedNodes.push(currentNode);

            //remove this possible connection from availableConnections
            availableConnections.splice(randIndex, 1);
        }

        //move onto the next node for the next iteration of the loop
        currentNode = String.fromCharCode(currentNode.charCodeAt(0) + 1);
    }
}

function applyPreAlgorithmScan()
{
    debugger;
    var currentNode = 'B';

    //skip A
    for (var i = 1; i < numNodes; i++)
    {
        var lowestLetter = -1; //letter value of a node
        if(mapOfNodes[currentNode].rootIs!='A')
        {
            for (var j = 0; j < mapOfNodes[currentNode].listOfLinkedNodes.length; j++)
            {
                if (lowestLetter == -1)
                {
                    lowestLetter = mapOfNodes[currentNode].listOfLinkedNodes[j].rootIs;
                }
                else if (mapOfNodes[currentNode].listOfLinkedNodes[j].rootIs < lowestLetter)
                {
                    lowestLetter = mapOfNodes[currentNode].listOfLinkedNodes[j].rootIs;
                }
            }

            
            var numHops;
            var bestChoice;

            for (var j = 0; j < mapOfNodes[currentNode].listOfLinkedNodes.length; j++)
            {
                if (j == 0)
                {
                    numHops = mapOfNodes[mapOfNodes[currentNode].listOfLinkedNodes[j]].hopsToRoot;
                    bestChoice = j;
                }
                else if (mapOfNodes[currentNode].listOfLinkedNodes[j].rootIs == lowestLetter)
                {
                    if (numHops > mapOfNodes[currentNode].listOfLinkedNodes[j].hopsToRoot)
                    {
                        numHops = mapOfNodes[currentNode].listOfLinkedNodes[j].hopsToRoot;
                        bestChoice = j;
                    }
                }
            }
            
            mapOfNodes[currentNode].nextStep[0] = mapOfNodes[mapOfNodes[currentNode].listOfLinkedNodes[bestChoice]].iAm;
            mapOfNodes[currentNode].nextStep[1] = mapOfNodes[mapOfNodes[currentNode].listOfLinkedNodes[bestChoice]].rootIs;
            mapOfNodes[currentNode].nextStep[2] = mapOfNodes[mapOfNodes[currentNode].listOfLinkedNodes[bestChoice]].hopsToRoot;
    }

        currentNode = String.fromCharCode(currentNode.charCodeAt(0) + 1);
    }

    for (var i = 1; i < numNodes; i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        mapOfNodes[letter].rootIs = mapOfNodes[letter].nextStep[1];
        mapOfNodes[letter].hopsToRoot = mapOfNodes[letter].nextStep[2] + 1; //include itself
    }
}

function removeExtraConections()
{
    var comparitor = 0;
    //finds the best avalable path
    for(var i = 1 ;i<numNodes;i++ )
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        for(var j=0;j<mapOfNodes[letter].listOfLinkedNodes.length;j++)
        {
            if(j==0)
            {
                mapOfNodes[letter].bestRoot =mapOfNodes[letter].listOfLinkedNodes[j];
                comparitor=mapOfNodes[mapOfNodes[letter].listOfLinkedNodes[j]].hopsToRoot;
            }
            else if(mapOfNodes[mapOfNodes[letter].listOfLinkedNodes[j]].hopsToRoot<comparitor)
            {
                mapOfNodes[letter].bestRoot =mapOfNodes[letter].listOfLinkedNodes[j];
                comparitor=mapOfNodes[mapOfNodes[letter].listOfLinkedNodes[j]].hopsToRoot;
            }
        }
    }
    //clears previous values
    
    for(var i =0; i<numNodes;i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        mapOfNodes[letter].listOfLinkedNodes=[];
    }
    //sets final connections 
    for(var i =1; i<numNodes;i++)
    {
        var c = 'A';
        var letter = String.fromCharCode(c.charCodeAt(0) + i);
        mapOfNodes[letter].listOfLinkedNodes.push(mapOfNodes[letter].bestRoot);
        mapOfNodes[mapOfNodes[letter].bestRoot].listOfLinkedNodes.push(letter);
    }
}
