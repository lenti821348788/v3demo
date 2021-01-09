<template>
	<!-- <anchored-heading :level="2">这是通过render函数定义的全局组件</anchored-heading> -->
	<!-- <GlobalText /> -->
	<!-- <LifecycleDemo /> -->
	<!-- <Suspense>
		<AsyncLifecycleDemoComp />
	</Suspense> -->
	<com-api :username="name"/>
	<HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import GlobalText from './components/GlobalText.vue';
import HelloWorld from './components/HelloWorld.vue';

import LifecycleDemo from './components/LifecycleDemo.vue';
import { defineAsyncComponent } from 'vue';

import ComApi from './components/ComApi.vue';

// 异步组件
const AsyncLifecycleDemoComp = defineAsyncComponent(() => import('./components/LifecycleDemo.vue'));
export default {
	name: 'App',
	components: {
		HelloWorld,
		GlobalText,
		LifecycleDemo,
		AsyncLifecycleDemoComp,
		ComApi,
	},
	data() {
		return {
			name: 'Alian',
		};
	},
	// 如果要访问组件实例上的属性,需要使用provide的函数形式
	provide() {
		return {
			name: this.name,
		};
	},
};
</script>
