let scene;
let camera;
let renderer;
let sky, sun;

let width = window.innerWidth;
let height = window.innerHeight;

function main() {
  const canvas = document.querySelector("#carmodel");
  //creating scene;
  const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x6195ed);
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.rotation.y = (45 / 180) * Math.PI;
//   camera.position.x = 6;
//   camera.position.y = 0;
  camera.position.z = 9;
  scene.add(camera);



  //Rendering Scene;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  renderer.setClearColor(0x00000, 0.0);

  const stargeometry =  new THREE.SphereGeometry(80,64,64);

//   const starmaterial = new THREE.MeshBasicMaterial({

//       map: THREE.ImageUtils.loadTexture('./textures/vector-cartoon-illustration-banner-urban-background-with-modern-big-city-buildings_1441-586.webp'),
//       side: THREE.BackSide
//   });

//   const starmesh = new THREE.Mesh(stargeometry,starmaterial);

//   scene.add(starmesh);
  //orbit controls;
  let controls = new THREE.OrbitControls(camera , renderer.domElement);
  controls.addEventListener('change');


  //gltf loader;
  let loader = new THREE.GLTFLoader();
  loader.load("scene.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.position.setX(1);
    car.position.setY(0);
    car.position.setZ(2);
    // carscale = car.scale.set(1, 1, 1);
    scene.add(gltf.scene);
    animate();
  });


 


  // set ambientlight;

  const ambientlight = new THREE.AmbientLight(0x404040, 100);

  scene.add(ambientlight);

  //directional light;
  const directionalLight = new THREE.DirectionalLight(0xfdfdfd, 100);
  directionalLight.position.set(0, 0, 0);
  directionalLight.castShadow = false;
  scene.add(directionalLight);

//   //Point Light;

//   const light = new THREE.PointLight(0xc4c4c4, 10);
//   light.position.set(0, 300, 500);
//   scene.add(light);

//   //Point Light2;

//   const light2 = new THREE.PointLight(0xc4c4c4, 10);
//   light2.position.set(500, 100, 0);
//   scene.add(light2);

//   //Point Light3;

//   const light3 = new THREE.PointLight(0xc4c4c4, 10);
//   light3.position.set(0, 100, -500);
//   scene.add(light3);
var rotSpeed = 0.01;
  function animate() {
    let x = camera.position.x;
    let z = camera.position.z;
    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  
}
main();
window.onload = main;
