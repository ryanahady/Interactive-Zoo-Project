
   var animal_geometry;
   var animal_material;

    mesh = new THREE.Mesh(animal_geometry, animal_material);
	mesh1 = new THREE.Mesh(animal_geometry, animal_material);
	mesh2 = new THREE.Mesh(animal_geometry, animal_material);
	mesh5 = new THREE.Mesh(animal_geometry, animal_material);
	mesh6 = new THREE.Mesh(animal_geometry, animal_material);

	mesh.position.y = 4;
	mesh1.position.y = 4;
	mesh2.position.y = 4;
	mesh5.position.y = 4;
	mesh6.position.y = 4;


	render();

		var guiControls = new function(){
			// this.rotationX = 0.01;
			this.rotationY = 0.01;
			// this.rotationZ = 0.01;
		}

		var datGUI = new dat.GUI();
		datGUI .add(guiControls, 'rotation', 0, 1);

		function render(){
			mesh.rotation.y += .01;    
			mesh1.rotation.y += .01;
			mesh2.rotation.y += .01;   
			mesh5.rotation.y += .01;   
			mesh6.rotation.y += .01;       
			// use gui controls below instead?
			// mesh.rotation.y += guiControls.rotationY;	
			// mesh1.rotation.y += guiControls.rotationY;

			requestAnimationFrame(render);
			renderer.render(scene,camera);
		}


