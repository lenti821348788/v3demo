<template>
	<!-- HTML中的属性应该使用全小写, 组件的属性可以使用大写 -->
	<div v-cl:ccc.a="123">
		{{ text }}
		<p>user: {{name}}</p>
	</div>
</template>

<script>
export default {
	name: 'GlobalText',
	data() {
		return {
			text: 'This is a global component',
		};
	},
	inject:['name']
};
</script>
