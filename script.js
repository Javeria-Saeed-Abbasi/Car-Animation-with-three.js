let scene;
let camera;
let renderer;
let sky, sun;

let width = window.innerWidth;
let height = window.innerHeight;


function main() {
    const canvas = document.querySelector('#carmodel');
    //creating scene;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x6195ed);
    const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
    camera.position.z = 9;
    scene.add(camera); 


    //Rendering Scene;
    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    renderer.setPixelRatio(window.devicePixelRatio);

       // set ambientlight;

       const ambientlight = new THREE.AmbientLight(0x404040,100);
    
       scene.add(ambientlight);
       
       //gltf loader;
        let loader = new THREE.GLTFLoader();
        loader.load('scene.gltf', function (gltf) {
            side: THREE.FrontSide
            scene.add(gltf.scene);
        });

    

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();
}
main();
window.onload = main;