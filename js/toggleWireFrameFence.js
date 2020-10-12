	
	document.addEventListener( 'keydown', function( event ) {

		// f Pressed: Toggle wireframe
		if ( event.keyCode === 70 ) {
			fence1.material.wireframe =! fence1.material.wireframe;
			fence1.material.needsUpdate = true;

		}

	} , false );

initFence();

function initFence() {

//				var materialColor = 0x0040C0;
//
//				var material = new THREE.ShaderMaterial( {
//					uniforms: THREE.UniformsUtils.merge( [
//						THREE.ShaderLib[ 'phong' ].uniforms,
//						{
//							heightmap: { value: null }
//						}
//					] ),
//					//vertexShader: document.getElementById( 'waterVertexShader' ).textContent,
//					fragmentShader: THREE.ShaderChunk[ 'meshphong_frag' ]
//
//				} );
//
//				material.lights = true;
//
//				// Material attributes from MeshPhongMaterial
//				material.color = new THREE.Color( materialColor );
//				material.specular = new THREE.Color( 0x111111 );
//				material.shininess = 50;
//
//				// Sets the uniforms with the material values
//				material.uniforms.diffuse.value = material.color;
//				material.uniforms.specular.value = material.specular;
//				material.uniforms.shininess.value = Math.max( material.shininess, 1e-4 );
//				material.uniforms.opacity.value = material.opacity;
//
//				waterUniforms = material.uniforms;

			}
