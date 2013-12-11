// WebGL & THREE.js projector

        var renderer = null;
	var scene = null;
	var camera = null;
	var mesh = null;
        // directional lights
        var dlights = new Array();
        
Viewer = function()
{
	Sim.App.call(this);
}
Viewer.prototype = new Sim.App();

Viewer.prototype.init = function(param)
{
    // "super"constructor ustawiający scenę
    Sim.App.prototype.init.call(this, param);
    this.createCameraControls();
    
    // "latarka" przy kamerze
    dlights[0] = new THREE.DirectionalLight( 0xffffff, 1 /*0.8*/ );
    dlights[0].position.set(-20, 0, 0);
    this.scene.add(dlights[0]);
    
    dlights[1] = new THREE.DirectionalLight( 0xffffff, 0.9 /*0.8*/ );
    dlights[1].position.set(20, 0, 0);
   // this.scene.add(dlights[1]);

    var amb = new THREE.AmbientLight( 0x808080, 1);
    this.scene.add(amb);
}
/*
Viewer.prototype.spheresFromSurfacePoints = function(sPoints) // surfacePoints
{
    for(var i = 0; i < sPoints.length; i++)
    {
        console.log("SurfacePoint "+i+" = x "+sPoints[i].x+", y "+sPoints[i].y+", z "+sPoints[i].z);
        var model = new Pocket();
        model.init(sPoints[i].x, sPoints[i].y, sPoints[i].z);
        this.addObject(model);
    }
}
*/
Viewer.prototype.trianglesToScreen = function(sPoints)
{
    var geometry = new THREE.Geometry();
 
    for(var i = 0; i < sPoints.length; i++)
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(sPoints[i].x, sPoints[i].y, sPoints[i].z)));
    
    var triangles = TrianglesFromSurfacePoints(sPoints, 20);
    
    // face = polygon = składa się z surfacePointów przypisanych do trójkąta
    for(var j = 0; j < (triangles.length); j++)
        geometry.faces.push(new THREE.Face3(triangles[j].verticesNumerals[0],triangles[j].verticesNumerals[1],triangles[j].verticesNumerals[2]));
    
    geometry.computeFaceNormals();
    var model = new Pocket();
    model.init(geometry, false);
    this.addObject(model);
}

// trackball
Viewer.prototype.createCameraControls = function()
{
    var controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
    var radius = Viewer.CAMERA_RADIUS;
    
    controls.rotateSpeed = Viewer.ROTATE_SPEED;
    controls.zoomSpeed = Viewer.ZOOM_SPEED;
    controls.panSpeed = Viewer.PAN_SPEED;
    controls.dynamicDampingFactor = Viewer.DAMPING_FACTORS;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    
    controls.minDistance = radius * Viewer.MIN_DISTANCE_FACTOR;
    controls.maxDistance = radius * Viewer.MAX_DISTANCE_FACTOR;
    
    this.controls = controls;
    

}
Viewer.prototype.update = function()
{
    this.controls.update();
    Sim.App.prototype.update.call(this);
    // przesuń latarkę do położenia kamery
    dlights[0].position = camera.position;
}

Viewer.CAMERA_START_Z = 30;
Viewer.CAMERA_RADIUS = 20;
Viewer.MIN_DISTANCE_FACTOR = 1.1;
Viewer.MAX_DISTANCE_FACTOR = 20;
Viewer.ROTATE_SPEED = 1.0;
Viewer.ZOOM_SPEED = 3;
Viewer.PAN_SPEED = 0.2;
Viewer.DAMPING_FACTORS = 0.3;

Pocket = function()
{
	Sim.Object.call(this);
}
Pocket.prototype = new Sim.Object();
Pocket.prototype.init = function(geometry, if_wireframe)
{
    var material = new THREE.MeshPhongMaterial();
    material.wireframe = if_wireframe;
    material.color = new THREE.Color("0x00ffff");
    
    var mesh = new THREE.Mesh( geometry, material ); 
    mesh.position = new THREE.Vector3(0,0,0); // !
    this.setObject3D(mesh);   
    
    dlights[0].target = this;
}

Pocket.prototype.update = function()
{
    //this.object3D.rotation.x += 0.0025;
    //this.object3D.rotation.y += 0.0025;   
}
