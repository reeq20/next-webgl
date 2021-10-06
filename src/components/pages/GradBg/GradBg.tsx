import React from "react";
import ThreeRender from "../../Three/ThreeRender";
import vertex from "../../../glsl/gradBg/vertex.glsl"
import fragment from "../../../glsl/gradBg/fragment.glsl"

const GradBg: React.FC = () => {
    return (
        <>
            <ThreeRender vertexShader={vertex} fragmentShader={fragment}/>
        </>
    )
}

export default GradBg;