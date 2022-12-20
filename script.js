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
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.rotation.y = (45 / 180) * Math.PI;
//   camera.position.x = 6;
//   camera.position.y = 0;
  camera.position.z = 5;
  scene.add(camera);



  //Rendering Scene;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  renderer.setClearColor(0x00000, 0.0);

  // const stargeometry =  new THREE.SphereGeometry(80,64,64);

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
 let carloader =  loader.load("./car-model/scene.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.position.setX(0.005);
    car.position.setY(-0.30);
    // car.position.setZ(0.005);
    // carscale = car.scale.set(1, 15, 15);
    const carmaterial = new THREE.MeshBasicMaterial({
      color: '0xeba6f5',
      side: THREE.FrontSide,
     transparent: true,
      map: carloader // texture as a map for material
    });
    scene.add(gltf.scene);
    animate();
    // console.log(window.position.x);
    // console.log(window.position.y);
  });


 
 // star
 const mountaingeometry = new THREE.PlaneGeometry(10, 12); // width, height, no depth for plane
 var texture = new THREE.TextureLoader().load(
   "./textures/bg2.jpg"
 );
 
 const mountainmaterial = new THREE.MeshBasicMaterial({
   color: '0xeba6f5',
   side: THREE.BackSide,
  transparent: true,
   map: texture // texture as a map for material
 });
 const mountainmesh = new THREE.Mesh(mountaingeometry, mountainmaterial); // mesh takes just two parameters
//  scene.add(mountainmesh);
 scene.background = texture;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

//  const mountaingeometry = new THREE.SphereGeometry(80, 64, 64);
//  const mountainmaterial = new THREE.MeshBasicMaterial({
//    map: THREE.ImageUtils.loadTexture("./textures/mountain.png"),
//    side: THREE.BackSide,
//    transparent: true,
//  });

//  const mountainmesh = new THREE.Mesh(mountaingeometry, mountainmaterial);
//  scene.add(mountainmesh);

  // set ambientlight;

  const ambientlight = new THREE.AmbientLight(0x404040, 100);

  scene.add(ambientlight);

  //directional light;
  const directionalLight = new THREE.DirectionalLight(0xfdfdfd, 100);
  directionalLight.position.set(0, 0, 0);
  directionalLight.castShadow = false;
  scene.add(directionalLight);

//   //Point Light;

  const light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

//   //Point Light2;

  const light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);

//   //Point Light3;

  const light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);
var rotSpeed = 0.001;
// mountainmesh.rotation.x += 0.0005;

  function animate() {
    let x = camera.position.x;
    let z = camera.position.z;
    let y = camera.position.y;
    // camera.position.z = 0.20;
    // camera.position.x = 15;
    // camera.position.y = 0;
    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  
}
main();
window.onload = main;
