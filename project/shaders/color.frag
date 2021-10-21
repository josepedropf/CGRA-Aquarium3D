#ifdef GL_ES
precision highp float;
#endif

uniform float color_r;
uniform float color_g;
uniform float color_b;

void main() {

	gl_FragColor = vec4(color_r, color_g, color_b, 1);

}