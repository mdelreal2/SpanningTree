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
        listOfLinkedNodes:[]
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

        mapOfNodes[letter] = newNode;
        

        //alert(newNode.rootIs);
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
//
//
//
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

            alert("connectionValue: " + connectionValue);

            mapOfNodes[currentNode].listOfLinkedNodes.push(connectionValue);

            alert(mapOfNodes[currentNode].listOfLinkedNodes.toString());

            mapOfNodes[connectionValue].listOfLinkedNodes.push(currentNode);

            alert(mapOfNodes[connectionValue].listOfLinkedNodes.toString());

            //remove this possible connection from availableConnections
            availableConnections.splice(randIndex, 1);
        }

        //move onto the next node for the next iteration of the loop
        currentNode = String.fromCharCode(currentNode.charCodeAt(0) + 1);
    }

    //alert(JSON.stringify(mapOfNodes));

/*
    var done =false;
    var  currentNode=0;
    var unusedNodes=[];
    var counter =0;
    for(var i=1;i<numNodes;i++)
    {
        unusedNodes.push(i);
    }
    while(done ==false)
   {
       counter=counter+1;
        var letter = String.fromCharCode(c.charCodeAt(0) + currentNode);
        var rand = Math.floor(Math.random() * 10);
        var connection_num = 1;
        if(rand<3)
        {
            connection_num=2;
            if(rand<2)
            {
                connection_num=3;
                if(rand<1)
                    connection_num=4;
            }
        }
        //rand is now set to a random connection value 
        
        for(var i=0;i<connection_num;i++)
        {
            rand=  Math.floor(Math.random() * numNodes);
            var conenction = String.fromCharCode(c.charCodeAt(0) + rand);
            if(mapOfNodes[letter].listOfLinkedNodes.includes(conenction)||letter==conenction)
            {
                i = i-1;
            }
            else
            {
                mapOfNodes[letter].listOfLinkedNodes.push(conenction);
                mapOfNodes[conenction].listOfLinkedNodes.push(letter);
                currentNode=rand;
                for(var j =0;j<unusedNodes.length;j++)
                {
                    if(unusedNodes[j]==rand)
                    {
                        unusedNodes.splice(j,1);
                    }
                }
                //this will crate atree not a map figure out how to fix this
            }
        }
        if(counter == 6)
        {
            for(var i=0;i<unusedNodes.length();i++)
            {
                rand=  Math.floor(Math.random() * unusedNodes[i]-1);
                mapOfNodes[letter].listOfLinkedNodes.push(conenction);
                mapOfNodes[conenction].listOfLinkedNodes.push(letter);
            }
            done =true;
        }
        else if(unusedNodes.length==0)
        {
            done = true;
        }
        // enshure that all nodes are connected
   }
   */
}