precision mediump float;
precision mediump int;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main(){

    vUv = uv;

    vec4 pos = vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * pos;
}