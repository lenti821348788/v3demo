<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">{{ countText }}</button>
	<p v-once>
		<b>使用了v-once, 本身及子组件的插值内容不会更新</b>
		use v-once {{ count }}
		<b>{{ count }}</b>
	</p>
	<!-- v-show 不能用在v-else和template中 -->
	<p v-show="count % 2 === 0">count此时是偶数</p>

	<!-- v-if和v-for一起用的话, 区别于Vue2, v-if拥有更高的优先级 -->
	<!-- <global-text v-if="count % 2 === 0" /> -->
	<!-- $event原始的DOM事件 -->
	<button @click="handleAddArr($event), otherFunc()">add time</button>
	<ul>
		<!-- 不设置key的情况下,更新数组会对每一项进行更新 -->
		<!-- eslint-disable-next-line  -->
		<li v-for="i in arr">{{ i }}</li>
	</ul>

	<!-- $event也可用当做组件内传来的第一个自定义参数 -->
	<!-- ref应该避免在computed中使用,只在mounted后才生效 -->
	<MButton @m-click="count += $event" v-model.capitalize="count" v-model:text.capitalize="btnText" ref="m-btn" />
	<!-- 注意: v-is内部字符串需要用引号包裹 -->
	<div v-is="'MButton'" @m-click="count -= $event" v-model="count"></div>

	<!-- 当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用 -->
	<!-- 缩写是使用#,后面必须加上插槽的名字 -->
	<m-slot>
		<template v-slot:default>
			<b>父组件的内容</b>
		</template>
		<template #footer="slotProps">
			<b>父组件设置的footer内容,{{ slotProps.content }}</b>
		</template>
	</m-slot>
	<m-slot>
		<template #footer="{ arrLength }">
			<!-- arrLength 来源于 computed()包装, 需要使用value取出值 -->
			<b @click="handleConsole(arrLength)">显示数组的长度{{ arrLength.value }},内容来自子组件的inject,</b>
		</template>
	</m-slot>

	<!-- 传送门 -->
	<teleport to="body">
		<div>这个内容挂载到了body中</div>
	</teleport>
</template>

<script>
import GlobalText from './GlobalText.vue';
import MButton from './MButton.vue';
import MSlot from './MSlot.vue';
import { computed } from 'vue';
export default {
	components: { GlobalText, MButton, MSlot },
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	// 所有组件的data都应该是一个函数(包括根组件,区别于Vue2),保存在vm.$data中
	// 需要确保实例property在data函数返回的对象中, 只在首次创建时进行响应式处理
	data() {
		return {
			count: 0,
			arr: [],
			btnText: '段落名字',
		};
	},
	// computed具有缓存的效果, 相关依赖没有改变的话就不会重新计算
	// 如果不希望有缓存,需要用methods计算
	provide() {
		return {
			length: computed(() => this.arr.length),
		};
	},
	computed: {
		countText() {
			return 'count is:' + this.count;
		},
	},
	created() {
		// this.debouncedClick = debounce(this.click, 500)
	},
	unmounted() {
		// this.debouncedClick.cancel();
	},
	methods: {
		// 通过lodash实现防抖, 这种方式存在的问题, 如果是可复用组件中, 多个组件享有相同的防抖函数, 解决方案: 放在data中,或者created()中声明一个新方法
		// click:debounce(function( ) {
		// 	// 响应点击
		// }, 500)
		// 避免使用箭头函数, 否则this指向会出错
		cl() {
			console.log('count', this.count, this.$data.count);
		},
		handleAddArr(e) {
			e.preventDefault();
			this.arr.unshift(new Date().toLocaleTimeString());
			console.log('$event', e);
		},
		otherFunc() {
			// 强制组件更新,,  v-once的还是不会变化
			this.$forceUpdate();
			console.log('一个事件可以同时绑定多个回调, 需要写()');
		},
		handleConsole(...args) {
			console.dir(args);
		},
	},
};
</script>
