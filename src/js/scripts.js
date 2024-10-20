import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import nebula from "../img/nebula.jpg";
import stars from "../img/stars.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);

scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30, 10);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ffea00",
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-8, 0, -8);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-25, 30, -25);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff, 300);
scene.add(spotLight);
spotLight.position.set(5, 20, 5);
spotLight.castShadow = true;
spotLight.angle = 0.6;

const sLightHelper = new THREE.SpotLightHelper(spotLight, "yellow");
scene.add(sLightHelper);

//Two methods to create a fog effect
// Fog & FogExp2
//scene.fog = new THREE.Fog("black", 0, 150);
scene.fog = new THREE.FogExp2("white", 0.01);

//Setting the World background color
//renderer.setClearColor("grey");

//Two ways to load texture
// TextureLoader & CubeTextureLoader
const textureLoader = new THREE.TextureLoader();
const myTexture = textureLoader.load(stars);
myTexture.colorSpace = THREE.SRGBColorSpace;
myTexture.minFilter = THREE.NearestFilter;
//scene.background = myTexture;

const cubeTextureLoader = new THREE.CubeTextureLoader();
const myCubeTexture = cubeTextureLoader.load([
  nebula,
  nebula,
  stars,
  stars,
  stars,
  stars,
]);
scene.background = myCubeTexture;

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  //color: 0x00ff00,
  //map: myTexture,
});
const box2MultiMaterial = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
//box2.material.map = new THREE.TextureLoader().load(nebula);

const axes = new THREE.AxesHelper(6);
scene.add(axes);
axes.position.set(-15, 4, -15);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  angle: 0.6,
  penumbra: 0.4,
  intensity: 600,
};

gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.1);

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 600);

let step = 0;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 5 * Math.abs(Math.sin(step)) + 4;

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
