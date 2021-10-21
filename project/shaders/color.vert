#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;

uniform float cam_pos_x;
uniform float cam_pos_y;
uniform float cam_pos_z;


void main() {
	//vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);
	vec4 vertex = vec4(aVertexPosition, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	normal = vec4(aVertexNormal, 1.0);

	//vec4 offset = vec4(cam_pos_x, cam_pos_y, cam_pos_z, 0.0);

	//coords = gl_Position - offset;
	coords = gl_Position;

	vTextureCoord = aTextureCoord;
}