import {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import * as THREE from 'three'
import {COLOR_PALLETE} from "../constants/ColorPalet";

interface Props {
    vs: string,
    fs: string,
}

const hexToRgb = (color: string) => {
    // #が先頭についてたら除去
    const replacedColor = color.replace(/#/g, '')

    return [
        parseInt(replacedColor.substr(0, 2), 16),
        parseInt(replacedColor.substr(2, 2), 16),
        parseInt(replacedColor.substr(4, 2), 16)
    ]
}

const ThreeRender = ({vs, fs}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const INITIAL_TIME = 338.0; // MAGIC NUMBER
    const color1 = [...hexToRgb(COLOR_PALLETE.vividpurple)]
    const color2 = [...hexToRgb(COLOR_PALLETE.skyblue)]
    const color3 = [...hexToRgb(COLOR_PALLETE.pinkred)]


    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });

        const width = window.innerWidth
        const height = window.innerHeight

        renderer.setPixelRatio(2);
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height);


        const uniforms = {
            uTime: {type: 'f', value: INITIAL_TIME},
            uResolution: {type: 'v2', value: new THREE.Vector2(width, height)},
            uColor1: {
                type: 'v3',
                value: new THREE.Vector3(color1[0], color1[1], color1[2])
            },
            uColor2: {
                type: 'v3',
                value: new THREE.Vector3(color2[0], color2[1], color2[2])
            },
            uColor3: {
                type: 'v3',
                value: new THREE.Vector3(color3[0], color3[1], color3[2])
            },
        }

        const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
        const material = new THREE.RawShaderMaterial({
            vertexShader: vs,
            fragmentShader: fs,
            uniforms
        })
        const mesh = new THREE.Mesh(geometry, material)

        camera.position.z = 4;

        camera.lookAt(mesh.position);

        scene.add(mesh);

        const t0 = performance.now();


        const render = (t1: number) => {
            const dur = 10000;           // [ms]
            const dt = t1 - t0;         // [ms]
            const t = (dt % dur) / dur;// [ms/ms] 0〜1の、のこぎり波
            if (t1) {
                uniforms.uTime.value = INITIAL_TIME + t1 * 0.001
            }
            renderer.render(scene, camera)
            requestAnimationFrame(render)
        }

        requestAnimationFrame(render)


    }, [canvasRef])
    return (
        <>
            <canvas ref={canvasRef}/>
        </>
    )
}

export default ThreeRender;