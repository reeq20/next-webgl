import React, {useEffect, useRef, useState} from "react";
// import * as THREE from 'three'
import {COLOR_PALETTE} from "../../constants/ColorPalette";
import {hexToRgb} from "../../utils/hexToRgb";
import {Mesh, PerspectiveCamera, PlaneGeometry, RawShaderMaterial, Scene, Vector2, Vector3, WebGLRenderer} from "three";

interface Props {
    vertexShader: string,
    fragmentShader: string,
}


const ThreeRender: React.FC<Props> = ({vertexShader, fragmentShader}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const INITIAL_TIME = 338.0; // MAGIC NUMBER
    const color1 = [...hexToRgb(COLOR_PALETTE.vividpurple)]
    const color2 = [...hexToRgb(COLOR_PALETTE.skyblue)]
    const color3 = [...hexToRgb(COLOR_PALETTE.pinkred)]

    // const [scene, setScene] = useState<Scene>()
    // const [camera, setCamera] = useState<PerspectiveCamera>()
    // const [width, setWidth] = useState<number>(0)
    // const [height, setHeight] = useState<number>(0)


    useEffect(() => {
        if (!canvasRef.current) return
        // setWidth(window.innerWidth);
        // setHeight(window.innerHeight);
        // setScene(new Scene());
        // setCamera(new PerspectiveCamera(45, width / height));


        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new Scene();
        const camera = new PerspectiveCamera(45, width / height);

        const renderer = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });


        renderer.setPixelRatio(2);
        renderer.setSize(width, height);


        const uniforms = {
            uTime: {type: 'f', value: INITIAL_TIME},
            uResolution: {type: 'v2', value: new Vector2(width, height)},
            uColor1: {
                type: 'v3',
                value: new Vector3(color1[0], color1[1], color1[2])
            },
            uColor2: {
                type: 'v3',
                value: new Vector3(color2[0], color2[1], color2[2])
            },
            uColor3: {
                type: 'v3',
                value: new Vector3(color3[0], color3[1], color3[2])
            },
        }

        const geometry = new PlaneGeometry(width, height, 1, 1)
        const material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms
        })
        const mesh = new Mesh(geometry, material)

        if (!camera) return;

        camera.position.z = 4;

        camera.lookAt(mesh.position);

        scene.add(mesh);

        const render = (t1: number) => {
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