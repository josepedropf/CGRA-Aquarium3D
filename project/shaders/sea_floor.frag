#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform sampler2D uSamplernest;

uniform float nest_start;
uniform float nest_end;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	
	vec3 shade = texture2D(uSampler3, vTextureCoord).rgb;

	//color *= shade;

	color = vec4(color.r * shade.r, color.g * shade.g, color.b * shade.b, 1.0);


	if(vTextureCoord.s >= nest_start && vTextureCoord.s <= nest_end && (1.0 - vTextureCoord.t) >= nest_start && (1.0 - vTextureCoord.t) <= nest_end){
		float s_coord = (vTextureCoord.s - nest_start) / (nest_end - nest_start);
		float t_coord = ((1.0 - vTextureCoord.t) - nest_start) / (nest_end - nest_start);
		vec2 nest_coord = vec2(s_coord, t_coord); 
		color = texture2D(uSamplernest, nest_coord);
	}
	

	gl_FragColor = color;
}