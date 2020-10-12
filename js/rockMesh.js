        var rock_material = new THREE.MeshPhongMaterial({
            color: 0x565A5C
        });

        loader.load('models/rock_3.ply', function (rock_geometry) {

            rock_geometry.computeVertexNormals();
            rock_geometry.computeBoundingBox();


            var rockCenter = rock_geometry.boundingBox.getCenter();
            var rockSize = rock_geometry.boundingBox.getSize();
            var rockMinimum = rock_geometry.boundingBox.min;

            var rockSca = new THREE.Matrix4();
            var rockTra = new THREE.Matrix4();
            var rockCombined = new THREE.Matrix4();

            rockSca.makeScale(180 / rockSize.length(), 180/ rockSize.length(), 180 / rockSize.length());
            rockTra.makeTranslation(-rockCenter.x, -rockMinimum.y, -rockCenter.z);
            rockCombined.multiply(rockTra);
            rockCombined.multiply(rockSca);

            rock1 = new THREE.Mesh(rock_geometry, rock_material);
            rock1.applyMatrix(rockCombined);
            rock1.castShadow = true;
            //rock1.name = "loaded_mesh";
            scene.add(rock1);
            rock1.position.x += -180;
            rock1.position.z += -180;

            rock2 = new THREE.Mesh(rock_geometry, rock_material);
            rock2.applyMatrix(rockCombined);
            rock2.castShadow = true;
            //rock2.name = "loaded_mesh";
            scene.add(rock2);
            rock2.position.x += 240;
            rock2.position.z += 310;

            rock3 = new THREE.Mesh(rock_geometry, rock_material);
            rock3.applyMatrix(rockCombined);
            rock3.castShadow = true;
            //rock3.name = "loaded_mesh";
            scene.add(rock3);
            rock3.position.x += 220;
            rock3.position.z -= 220;
            rock3.rotation.y = Math.PI / 3;

            rock4 = new THREE.Mesh(rock_geometry, rock_material);
            rock4.applyMatrix(rockCombined);
            rock3.castShadow;
            scene.add(rock4)
            rock4.position.x -= 0;
            rock4.position.z += 220;
            rock4.rotation.y = Math.PI / 2;
        });
