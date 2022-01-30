import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const group = new THREE.Group()
scene.add(group)

function createCube(x, y, z, color) {
  const geometry = new THREE.BoxGeometry(1, 1)
  const material = new THREE.MeshBasicMaterial({ color})
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  group.add(cube)
  cube.position.x = x
  cube.position.y = y
  cube.position.z = z

}

let units = [0]

function createGrid(units) {
  for(let i = 0; i < units.length; i++) {
    let z = units[i]
    for(let k = 0; k < units.length; k++) {
      let x = units[k]
      const randomColor = '#' + Math.floor(Math.random() * 16777216).toString(16)
      createCube(x, 0, z, randomColor)
      camera.position.z += 0.001
    }
  }
}

let incrementButton = document.getElementById('increment-button')
let decrementButton = document.getElementById('decrement-button')

function increment() {
  let lastUnit = units[units.length - 1]
  units.push(lastUnit + 1.2)
  console.log(units)
  createGrid(units)
}

function decrement() {
  let firstUnit = units[0]
  units.unshift(firstUnit - 1.2)
  console.log(units)
  createGrid(units)
}

incrementButton.addEventListener('click', increment)
decrementButton.addEventListener('click', decrement)



createCube(0, 0, 0, 0xa7a7a7)
// createCube(1.2, 0, 0, 0xffffff)
// createCube(2.4, 0, 0, 0xa7a7a7)
// createCube(3.6, 0, 0, 0xffffff)
// createCube(0, 0, 1.2, 0xa7a7a7)
// createCube(1.2, 0, 1.2, 0xffffff)
// createCube(2.4, 0, 1.2, 0xa7a7a7)
// createCube(3.6, 0, 1.2, 0xffffff)



camera.position.z = 15

group.rotation.x = Math.PI / 2
group.position.y += Math.PI / 2
 
function animate() {
  requestAnimationFrame(animate)
  // group.rotation.x += 0.003
  group.rotation.y += 0.003
  renderer.render(scene, camera)
}

animate()