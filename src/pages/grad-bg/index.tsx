import {NextPage} from "next";
import ThreeRender from "../../components/ThreeRender";
import vertex from "../../glsl/gradBg/vertex.glsl";
import fragment from "../../glsl/gradBg/fragment.glsl";

const GradBg: NextPage = () => {
    return (
        <>
            <ThreeRender vs={vertex} fs={fragment}/>
        </>
    )
}

export default GradBg