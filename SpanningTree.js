//The Spanning Tree Protocol (STP) is a network protocol that 
//builds a loop-free logical topology for Ethernet networks. 
//The basic function of STP is to prevent bridge loops 
//and the broadcast radiation that results from them.
function SpanningTreeNode(label)
{
    var node = {
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
    debugger;
   for(var j=0;j<numNodes;j++)
   {
        var letter = String.fromCharCode(c.charCodeAt(0) + j);
        var rand = Math.floor(Math.random() * 10);
        var connection_num = 1;
        if(rand<4)
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
        debugger;
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
                
            }
        }
   }
}