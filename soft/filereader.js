// read nurbs from .txt file

    var readenFile = "nurbsfile goes here";

function extractFile(file, onLoadCallback)
{
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}

function fileDataToControlPoints(str)
{
    var cPoints = new Array(); // 2D array
    var fRows; //file Rows
    var fCols; //file Cols
    
    var lineTemp = str.split("\n");
    fRows = lineTemp.length;
    pointStrings = str.split(";");
    
    if( pointStrings[pointStrings.length - 1].length == 0 )
        pointStrings.pop();
    
    fCols = pointStrings.length / fRows;
    //console.log("Points = "+fRows+","+fCols);
   
    for(var ii = 0; ii<fRows; ii++)
    {
            cPoints[ii] = new Array();
            for(var jj = 0; jj<fCols; jj++)
            {
                cPoints[ii][jj] = new Point();
            }
    }
    // -------------------------------------------------------------------------
    for(var i = 0; i < pointStrings.length; i++)
    {  
        pointStringsCoords = pointStrings[i].split(" ");
        var inputXYZ = new Array();
        var itoken = 0;
        // dla każdego substringa współrzędnej
        for(var j = 0; j < pointStringsCoords.length; j++)
        {
            var temp = parseFloat(pointStringsCoords[j]);
            if( (temp < 0) || (temp == 0) || (temp > 0) )
            {
                inputXYZ[itoken] = temp;
                itoken = itoken + 1;
            }
        }
        if(inputXYZ.length > 0/*== 3*/)
        {          
            cPoints[(i-(i%fCols))/fCols][i%fCols].setXYZ(inputXYZ[0], inputXYZ[1], inputXYZ[2]);
            //console.log("PS "+i+" cPoint ["+(i-(i%fCols))/fCols+"]["+i%fCols+"] = "+cPoints[(i-(i%fCols))/fCols][i%fCols].x+","+cPoints[(i-(i%fCols))/fCols][i%fCols].y+","+cPoints[(i-(i%fCols))/fCols][i%fCols].z);
        }
    }
    return cPoints;
}