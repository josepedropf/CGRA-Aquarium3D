#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;
uniform float interval_1;
uniform float interval_2;
uniform float interval_bool;
uniform float ratio;

uniform float color_r;
uniform float color_g;
uniform float color_b;
uniform sampler2D uSampler;

void main() {


	if (vTextureCoord[1] >= (1.0 - ratio)) gl_FragColor =  texture2D(uSampler, vTextureCoord);
	else gl_FragColor = vec4(color_r, color_g, color_b, 1);

}