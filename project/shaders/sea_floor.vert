attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform sampler2D uSamplersh;
uniform float max_height;
uniform float base_height;
uniform float nest_start;
uniform float nest_end;
uniform float bottom;

void main() {

	vTextureCoord = aTextureCoord;

	vec3 offset = vec3(0.0,0.0,0.0);

	offset = vec3(0.0, 1.0, 0.0) * (texture2D(uSampler2, vTextureCoord).b * (max_height - base_height));
	offset += vec3(0.0, base_height, 0.0);
	
	if(vTextureCoord.s >= nest_start && vTextureCoord.s <= nest_end && (1.0 - vTextureCoord.t) >= nest_start && (1.0 - vTextureCoord.t) <= nest_end){
		float s_coord = (vTextureCoord.s - nest_start) / (nest_end - nest_start);
		float t_coord = ((1.0 - vTextureCoord.t) - nest_start) / (nest_end - nest_start);
		vec2 nest_coord = vec2(s_coord, t_coord); 
		offset = vec3(0.0, 1.0, 0.0) * (texture2D(uSamplersh, nest_coord).b * (-bottom));
	}

	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
	vTextureCoord = aTextureCoord;

}

