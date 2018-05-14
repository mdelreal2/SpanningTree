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
        whoAmI:label,
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
    var n1 = mapOfNodes[['A','B','C','D','E','F'][mapOfNodes.size * Math.random() | 0]];
    do
    {
        var n1 = mapOfNodes[['A','B','C','D','E','F'][mapOfNodes.size * Math.random() | 0]];
    } while (n1 == n2);
}

