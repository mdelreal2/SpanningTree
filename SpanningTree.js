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
                debugger;
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
}