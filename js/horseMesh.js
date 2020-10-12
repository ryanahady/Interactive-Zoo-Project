        var loader = new THREE.PLYLoader();
        //12.1.2 Pingu

        var horse_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        horse_material.shininess = 100;

        //12.1 MESH LOADER
        var loader = new THREE.PLYLoader();

        //12.1.1 Horse
        loader.load('models/horse_simplified.ply', function (horse_geometry) {

            horse_geometry.computeVertexNormals();
            horse_geometry.computeBoundingBox();

            var horseCenter = horse_geometry.boundingBox.getCenter();
            var horseSize = horse_geometry.boundingBox.getSize();
            var horseMinimum = horse_geometry.boundingBox.min;


            var horseSca = new THREE.Matrix4();
            var horseTra = new THREE.Matrix4();
            var horseCombined = new THREE.Matrix4();

            horseTra.makeTranslation(-horseCenter.x, -horseMinimum.y, -horseCenter.z);
            horseSca.makeScale(130 / horseSize.length(), 130 / horseSize.length(), 130 / horseSize.length());

            horseCombined.multiply(horseSca);
            horseCombined.multiply(horseTra);

            mesh2 = new THREE.Mesh(horse_geometry, horse_material);
            mesh2.applyMatrix(horseCombined);
            mesh2.castShadow = true;
            scene.add(mesh2);
            mesh2.position.x += 120;
            mesh2.position.z -= 120;
            mesh2.rotation.y += Math.PI / 2;
            //    mesh.name = "loaded_rhino";
            mesh2.name = "loaded_horse";
        });



        //14. Raycaster Feature

        var raycaster = new THREE.Raycaster();

        var selectedHor = false;

        function onDocumentMouseDown(event) {

            var mouse = new THREE.Vector2;
            //         mouse.x = ( event.clientX / renderer.domElement.clientWidth );
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            //         mouse.z = -( event.clientZ / renderer.domElement.clientHeight );
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, false);

            if (intersects.length > 0) {
                if ((intersects[0].object.name == "loaded_horse") && (!selectedHor)) {
                    console.log("Selected!");
                    intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
                    selectedHor = true;
                }
                if ((intersects[0].object.name != "loaded_horse") && (selectedHor)) {
                    mesh2.material.color = new THREE.Color(1, 0.6, 1);
                    var pos = intersects[0].point;
                    console.log("Placed!");
                    mesh2.position.x = pos.x;
                    mesh2.position.z = pos.z;
                    selectedHor = false;
                }
            }
        }

        // when the mouse is clicked, call the given function
        document.addEventListener('mousedown', onDocumentMouseDown, false);
