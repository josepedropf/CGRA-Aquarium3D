attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {

	
	float s = aTextureCoord.s + timeFactor / 100.0;
	float t = aTextureCoord.t + timeFactor / 100.0;

	if(s > 1.0) s -= 1.0;

	if(t > 1.0) t -= 1.0;

	vTextureCoord = vec2(s, t);

	vec3 offset = vec3(0.0,0.0,0.0);

	offset=aVertexNormal * 0.1 * texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}

