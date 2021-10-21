#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {


	vec4 color = texture2D(uSampler, vTextureCoord);

	vec2 distortion = texture2D(uSampler2, vTextureCoord).rg - vec2(0.5, 0.5);


	vec2 anim_coords = vTextureCoord + distortion + vec2(1.0 * sin(timeFactor / 100.0), 1.0 * sin(timeFactor / 100.0));

	vec4 dist_color = texture2D(uSampler, anim_coords);



	gl_FragColor = dist_color;

}