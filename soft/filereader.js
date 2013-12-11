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
    var cPoints; // 2D array TODO: 1D
    var fnSize = 8; //fixed nurbs size; liczba punktów w pliku

    cPoints = new Array();
    for(var ii = 0; ii<fnSize; ii++)
    {
            cPoints[ii] = new Array();
            for(var jj = 0; jj<fnSize; jj++)
            {
                cPoints[ii][jj] = new Point();
            }
    }
    
    pointStrings = str.split(";");
    // dla każdego substringa punktu (jego współrzędzne)
    for(var i = 0; i < pointStrings.length; i++)
    {  
        pointStringsCoords = pointStrings[i].split(" ");
        var inputXYZ = new Array();
        var itoken = 0;
        // dla każdego substringa współrzędnej
        for(var j = 0; j < pointStringsCoords.length; j++)
        {
            var temp = parseFloat(pointStringsCoords[j]);
            // odfiltrowanie substringow nie bedacych liczbami
            if( (temp < 0) || (temp == 0) || (temp > 0) )
            {
                    inputXYZ[itoken] = temp;
                    itoken = itoken + 1;
            }
        }
        if(inputXYZ.length > 0/*== 3*/)
            cPoints[(i-(i%fnSize))/fnSize][i%fnSize].setXYZ(inputXYZ[0], inputXYZ[1], inputXYZ[2]);
    }
    return cPoints;
}