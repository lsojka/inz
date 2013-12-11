/* Model class
----- NOT USED YET ------
 - custom geometry 
    - vertex positions -> array of vertices
    - then, polygons/"faces" of mesh - triangles
    - UV coordinates for texturing

*/
Model = function()
{
    Sim.Object.call(this);
}
Model.prototype = new Sim.Object();
Model.prototype.init = function()
{
    this.setObject3D();
}