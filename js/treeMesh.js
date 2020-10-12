        var tree_material = new THREE.MeshPhongMaterial({
            color: 0xffffaa
        });

        loader.load('models/tree1a_lod0.ply', function (tree_geometry) {

            tree_geometry.computeVertexNormals();
            tree_geometry.computeBoundingBox();


            var treeCenter = tree_geometry.boundingBox.getCenter();
            var treeSize = tree_geometry.boundingBox.getSize();
            var treeMinimum = tree_geometry.boundingBox.min;

            var treeSca = new THREE.Matrix4();
            var treeTra = new THREE.Matrix4();
            var treeCombined = new THREE.Matrix4();

            treeSca.makeScale(270 / treeSize.length(), 270 / treeSize.length(), 270 / treeSize.length());
            treeTra.makeTranslation(-treeCenter.x, -treeMinimum.y, -treeCenter.z);
            treeCombined.multiply(treeTra);
            treeCombined.multiply(treeSca);

            tree1 = new THREE.Mesh(tree_geometry, tree_material);
            tree1.applyMatrix(treeCombined);
            tree1.castShadow = true;
            //tree1.name = "loaded_mesh";
            scene.add(tree1);
            tree1.position.x -= 220;
            tree1.position.z += 220;

            tree2 = new THREE.Mesh(tree_geometry, tree_material);
            tree2.applyMatrix(treeCombined);
            tree2.castShadow = true;
            //tree2.name = "loaded_mesh";
            scene.add(tree2);
            tree2.position.x += 200;
            tree2.position.z -= 20;
            tree2.rotation.y = Math.PI / 1.5;

            tree3 = new THREE.Mesh(tree_geometry, tree_material);
            tree3.applyMatrix(treeCombined);
            tree3.castShadow = true;
            //tree3.name = "loaded_mesh";
            scene.add(tree3);
            tree3.position.x += 20;
            tree3.position.z -= 80;
            tree3.rotation.y = Math.PI / 2;

            tree4 = new THREE.Mesh(tree_geometry, tree_material);
            tree4.applyMatrix(treeCombined);
            tree4.castShadow = true;
            scene.add(tree4)
            tree4.position.x -= 25;
            tree4.position.z += 360;

            tree5 = new THREE.Mesh(tree_geometry, tree_material);
            tree5.applyMatrix(treeCombined);
            tree5.castShadow = true;
            scene.add(tree5)
            tree5.position.x += 25;
            tree5.position.z += 400;
            tree5.rotation.y = Math.PI / 2;

            tree6 = new THREE.Mesh(tree_geometry, tree_material);
            tree6.applyMatrix(treeCombined);
            tree6.castShadow = true;
            //tree6.name = "loaded_mesh";
            scene.add(tree6);
            tree6.position.x -= 120;
            tree6.position.z -= 200;
            tree6.rotation.y = Math.PI / 3;

            tree7 = new THREE.Mesh(tree_geometry, tree_material);
            tree7.applyMatrix(treeCombined);
            tree7.castShadow = true;
            //tree7.name = "loaded_mesh";
            scene.add(tree7);
            tree7.position.x -= 180;
            tree7.position.z -= 60;
        });
