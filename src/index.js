import './styles/main.scss';
import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);

let width, height, halfX, halfY, canvas, ctx;
let renderer, camera, scene, geometry, material, texture, controls;
let lines = [];

let linesNumber = 4;

let verticies = 200;
let radius = 250;

let color = '#ff0429';
let simplex = new SimplexNoise();
let noise;
let time = 0;
let mouseX = 0,
    mouseY = 0,
    mfx = 0,
    mfy = 0;
let koef;

window.onload = onload;

function onload() {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', sizing);
    createCanvas();
    createPoints();
    sizing();
    initScene();

    animate();
}

function createCanvas() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
}

function initScene() {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color('rgb(0,0,0)'), .3)
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        .001,
        1000
    );
    camera.position.z = 5;
    document.body.appendChild(renderer.domElement);

    let group = new THREE.Group();
    scene.add(group);

    texture = new THREE.Texture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10)
    material = new THREE.MeshBasicMaterial({map: texture});
    geometry = new THREE.PlaneGeometry(10,10,10,10);

    for (let i = 0; i < 10; i++){
        let mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
    }

    controls = new OrbitControls(camera, renderer.domElement);

}

function createPoints() {
    for (let j = 0; j < linesNumber; j++) {
        lines[j] = [];
        for (let i = 0; i <= verticies; i++) {
            let point = {
                x: Math.cos(i / verticies * Math.PI * 2),
                y: Math.sin(i / verticies * Math.PI * 2),
                width: 4
            };
            point._x = point.x;
            point._y = point.y;
            lines[j].push(point);
        }
    }
}

function update() {
    mfx += .05 * (mouseX / halfX - mfx);
    mfy += .05 * (mouseY / halfY - mfy);

    lines.forEach(linepoints => {
        linepoints.forEach(point => {

        })
    })
    for (let i = 0; i < linesNumber; i++) {
        for (let j = 0; j <= verticies; j++) {
            noise = simplex.noise2D(lines[i][j]._x  + time * .003, lines[i][j]._y  + time * .003);

            lines[i][j].x = lines[i][j]._x * radius * (1 - i / 10) + noise * radius / 10;
            lines[i][j].y = lines[i][j]._y * radius * (1 - i / 10) + noise * radius / 10;
            lines[i][j].x += lines[i][j].x - mfx * radius * i / 10;
            lines[i][j].y += lines[i][j].y - mfy * radius * i / 10;

            koef = lines[i][j].x * mfx + lines[i][j].y * mfy;
            lines[i][j].width = 4 + 4 * koef / 200;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';

    lines.forEach(linepoints => {
        for (let i = 1; i < linepoints.length; i++) {
            ctx.beginPath();
            ctx.lineWidth = linepoints[i].width < 1 ? 1 : linepoints[i].width;
            ctx.moveTo(halfX + linepoints[i - 1].x, halfY + linepoints[i - 1].y);
            ctx.lineTo(halfX + linepoints[i].x, halfY + linepoints[i].y);
            ctx.stroke();
        }
    });
}



function sizing() {
    width = window.innerWidth;
    height = window.innerHeight;
    halfX = width / 2;
    halfY = height / 2;
    canvas.width = width;
    canvas.height = height;
}

function mouseMove(e) {
    mouseX = e.clientX - halfX;
    mouseY = e.clientY - halfY;
}

function animate() {
    render();
    update();
    window.requestAnimationFrame(animate);
    time++;
    texture.needsUpdate = true;
    renderer.render(scene, camera);
}