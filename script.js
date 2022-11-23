// --------- Variables

// ---- Greensock

const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 65;
const currentFrame = index => (
  `./frames/${index.toString().padStart(4, '0')}.jpeg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// ---- Canvas
const canvasViewport = document.querySelector('canvas.webgl')

const img = new Image()
img.src = currentFrame(1);
canvas.width=2560;
canvas.height=1921;
// canvas: canvasViewport;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

// ---- ThreeJS

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 3
// scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// --------- Main Code

// ---- GreenSock

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

// ---- Three JS

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    // camera.aspect = sizes.width / sizes.height
    // camera.updateProjectionMatrix()

    // Update renderer
    // renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})