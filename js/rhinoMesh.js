        var rhino_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        rhino_material.shininess = 100;

        //12.1 MESH LOADER
        var loader = new THREE.PLYLoader();

        //12.1.1 Rhino
        loader.load('models/rhino_simplified.ply', function (rhino_geometry) {

            rhino_geometry.computeVertexNormals();
            rhino_geometry.computeBoundingBox();

            var rhinoCenter = rhino_geometry.boundingBox.getCenter();
            var rhinoSize = rhino_geometry.boundingBox.getSize();
            var rhinoMinimum = rhino_geometry.boundingBox.min;


            var rhinoSca = new THREE.Matrix4();
            var rhinoTra = new THREE.Matrix4();
            var rhinoCombined = new THREE.Matrix4();

            rhinoTra.makeTranslation(-rhinoCenter.x, -rhinoMinimum.y, -rhinoCenter.z);
            rhinoSca.makeScale(90 / rhinoSize.length(), 90 / rhinoSize.length(), 90 / rhinoSize.length());

            rhinoCombined.multiply(rhinoSca);
            rhinoCombined.multiply(rhinoTra);

            mesh1 = new THREE.Mesh(rhino_geometry, rhino_material);
            mesh1.applyMatrix(rhinoCombined);
            mesh1.castShadow = true;
            scene.add(mesh1);
            mesh1.position.x += 120;
            mesh1.position.z += 120;
            //    mesh.name = "loaded_rhino";
            mesh1.name = "loaded_rhino";
        });



        //14. Raycaster Feature

        var raycaster = new THREE.Raycaster();

        var selectedRhi = false;

        function onDocumentMouseDown(event) {

            var mouse = new THREE.Vector2;
            //         mouse.x = ( event.clientX / renderer.domElement.clientWidth );
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            //         mouse.z = -( event.clientZ / renderer.domElement.clientHeight );
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, false);

            if (intersects.length > 0) {
                if ((intersects[0].object.name == "loaded_rhino") && (!selectedRhi)) {
                    console.log("Selected!");
                    intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
                    selectedRhi = true;
                }
                if ((intersects[0].object.name != "loaded_rhino") && (selectedRhi)) {
                    mesh1.material.color = new THREE.Color(1, 0.6, 1);
                    var pos = intersects[0].point;
                    console.log("Placed!");
                    mesh1.position.x = pos.x;
                    mesh1.position.z = pos.z;
                    selectedRhi = false;
                }
            }
        }

        // when the mouse is clicked, call the given function
        document.addEventListener('mousedown', onDocumentMouseDown, false);
