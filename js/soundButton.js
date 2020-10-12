function playMusic(){
  var zoolisten = new THREE.AudioListener();
  camera.add(zoolisten);

var zooSound = new THREE.Audio( zoolisten );

var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/night2.ogg', function( buffer ) {
  zooSound.setBuffer( buffer );
	zooSound.setLoop( false );
	zooSound.setVolume( 0.5 );
	zooSound.play();
});
}
