	
	document.addEventListener( 'keydown', function( event ) {

		// a Pressed: Toggle wireframe
		if ( event.keyCode === 65 ) {

			// animal_mesh.material.wireframe = ! animal_mesh.material.wireframe;
			// animal_mesh.material.needsUpdate = true;
			mesh.material.wireframe = ! mesh.material.wireframe;
			mesh.material.needsUpdate = true;

			mesh1.material.wireframe = ! mesh1.material.wireframe;
			mesh1.material.needsUpdate = true;

			mesh2.material.wireframe = ! mesh2.material.wireframe;
			mesh2.material.needsUpdate = true;

			mesh5.material.wireframe = ! mesh5.material.wireframe;
			mesh5.material.needsUpdate = true;

			mesh6.material.wireframe = ! mesh6.material.wireframe;
			mesh6.material.needsUpdate = true;
            
            mesh7.material.wireframe = ! mesh7.material.wireframe;
			mesh7.material.needsUpdate = true;
		}

	} , false );

initAnimal();

function initAnimal() {

				var materialColor = 0x0040C0;

				var material = new THREE.ShaderMaterial( {
					uniforms: THREE.UniformsUtils.merge( [
						THREE.ShaderLib[ 'phong' ].uniforms,
						{
							heightmap: { value: null }
						}
					] ),
					//vertexShader: document.getElementById( 'waterVertexShader' ).textContent,
					fragmentShader: THREE.ShaderChunk[ 'meshphong_frag' ]

				} );

				material.lights = true;

				// Material attributes from MeshPhongMaterial
				material.color = new THREE.Color( materialColor );
				material.specular = new THREE.Color( 0x111111 );
				material.shininess = 50;

				// Sets the uniforms with the material values
				material.uniforms.diffuse.value = material.color;
				material.uniforms.specular.value = material.specular;
				material.uniforms.shininess.value = Math.max( material.shininess, 1e-4 );
				material.uniforms.opacity.value = material.opacity;

				waterUniforms = material.uniforms;

			}
