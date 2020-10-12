        var loader = new THREE.PLYLoader();
        //12.1.2 Pingu

        var pingu_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        pingu_material.shininess = 100;

        loader.load('models/pingu_simplified.ply', function (pingu_geometry) {

            pingu_geometry.computeVertexNormals();
            pingu_geometry.computeBoundingBox();

            var pinguCenter = pingu_geometry.boundingBox.getCenter();
            var pinguSize = pingu_geometry.boundingBox.getSize();
            var pinguMinimum = pingu_geometry.boundingBox.min;

            var pinguSca = new THREE.Matrix4();
            var pinguTra = new THREE.Matrix4();
            var pinguCombined = new THREE.Matrix4();

            pinguTra.makeTranslation(-pinguCenter.x, -pinguMinimum.y, -pinguCenter.z);
            pinguSca.makeScale(40 / pinguSize.length(), 40 / pinguSize.length(), 40 / pinguSize.length());
            pinguCombined.multiply(pinguSca);
            pinguCombined.multiply(pinguTra);

            mesh = new THREE.Mesh(pingu_geometry, pingu_material);
            mesh.applyMatrix(pinguCombined);
            mesh.castShadow = true;
            scene.add(mesh);
            mesh.position.x -= 120;
            mesh.position.z += 120;
            mesh.rotation.y += 90;
            mesh.name = "loaded_mesh";

        });



        //14. Raycaster Feature

        var raycaster = new THREE.Raycaster();

        var selectedPen = false;

        function onDocumentMouseDown(event) {

            var mouse = new THREE.Vector2;
            //         mouse.x = ( event.clientX / renderer.domElement.clientWidth );
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            //         mouse.z = -( event.clientZ / renderer.domElement.clientHeight );
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, false);

            if (intersects.length > 0) {
                if ((intersects[0].object.name == "loaded_mesh") && (!selectedPen)) {

                    //                if  ((intersects[0].object.name == "loaded_mesh")||(intersects[0].object.name == "loaded_rhino") && (!selectedObj))  {
                    console.log("Selected!");
                    intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
                    selectedPen = true;
                }
                if ((intersects[0].object.name != "loaded_mesh") && (selectedPen)) {
                    //                if ((intersects[0].object.name != "loaded_mesh")||(intersects[0].object.name != "loaded_rhino")&&(selectedObj)) {
                    mesh.material.color = new THREE.Color(1, 0.6, 1);
                    var pos = intersects[0].point;
                    console.log("Placed!");
                    mesh.position.x = pos.x;
                    mesh.position.z = pos.z;
                    selectedPen = false;
                }
            }
        }

        // when the mouse is clicked, call the given function
        document.addEventListener('mousedown', onDocumentMouseDown, false);
