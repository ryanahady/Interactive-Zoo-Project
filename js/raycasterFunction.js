//14. Raycaster Feature
var raycaster = new THREE.Raycaster();

var selectedObj = false;

function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientZ / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if ((intersects[0].object.name != "loaded_mesh") && (!selectedObj)) {
            console.log("Selected!");
            intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
            selectedObj = true;
        }
        if ((intersects[0].object.name == "loaded_mesh") && (selectedObj)) {
            pingu_mesh.material.color = new THREE.Color(1, 0.5, 1);
            var pos = intersects[0]("Placed!");
            pingu_mesh.position.x = pos.x;
            pingu_mesh.position.z = pos.z;
            selectedObj = false;
        }

    }

}

document.addEventListener('mousedown', onDocumentMouseDown, false);
