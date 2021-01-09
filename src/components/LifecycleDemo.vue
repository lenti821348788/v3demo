<template>
	<div class="">show lifeCycle in Console</div>
</template>

<script>
import myMixin from '../mixins/myMixin.js';
export default {
	// 混入对象的钩子将在组件自身钩子之前调用
	mixins: [myMixin],
	data() {
		return {};
	},
	beforeCreate() {
		console.log('component lifecycle beforeCreate');
	},
	created() {
		console.log('component lifecycle created');
	},
	beforeMount() {
		console.log('component lifecycle beforeMount');
	},
	mounted() {
		console.log('component lifecycle mounted');
	},
	beforeUpdate() {
		console.log('component lifecycle beforeUpdate');
	},
	updated() {
		console.log('component lifecycle updated');
	},
	beforeUnmount() {
		console.log('component lifecycle beforeUnmount');
	},
	unmounted() {
		console.log('component lifecycle unmounted');
	},
};
</script>
