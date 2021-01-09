<template>
	<div class="">
		<p>props->username: {{ username }}</p>
		<p>reactive->name: {{ state.name }}</p>
		<p>toRefs->name: {{ name }}</p>
		<p @click="handleAddNum">
			<b>ref->num: {{ num }}</b>
		</p>
		<p>reactive->num: {{ state.rNum }}</p>
		<p>computed->cptName: {{ cptName }}</p>
		<p @click="otherCptName = '!'">
			<b>computed setter->otherCptName: {{ otherCptName }}</b>
		</p>
	</div>
</template>

<script>
import {
	/* 响应式基础API */
	// 返回对象的响应式副本
	reactive,
	// 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 property 也是只读的。
	readonly,
	// 检查对象是 reactive 还是 readonly创建的代理
	isProxy,
	// 检查对象是否是 reactive创建的响应式 proxy。
	isReactive,
	// 检查对象是否是由readonly创建的只读代理
	isReadonly,
	// 返回 reactive 或 readonly 代理的原始对象。这是一个转义口，可用于临时读取而不会引起代理访问/跟踪开销，也可用于写入而不会触发更改。不建议保留对原始对象的持久引用。请谨慎使用。
	toRaw,
	// 标记一个对象，使其永远不会转换为代理。返回对象本身
	markRaw,
	// 创建一个响应式代理，该代理跟踪其自身 property 的响应性，但不执行嵌套对象的深度响应式转换 (暴露原始值)。
	shallowReactive,
	// 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。
	shallowReadonly,
	/* ---------------------------------- */
	/* Refs */
	// 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property .value, setup中使用ref需要.value用值
	ref,
	// 如果参数为 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val
	unref,
	// 可以用来为源响应式对象上的 property 性创建一个 ref。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
	toRef,
	// 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref。
	toRefs,
	// 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并应返回一个带有 get 和 set 的对象。
	customRef,
	// 创建一个 ref，它跟踪自己的 .value 更改，但不会使其值成为响应式的。
	triggerRef,
	// 手动执行与 shallowRef关联的任何效果。
    shallowRef,
    // 使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。或者，它可以使用具有 get 和 set 函数的对象来创建可写的 ref 对象。
    computed,
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    watchEffect,
    // watch API 与选项式 API this.$watch (以及相应的 watch 选项) 完全等效, 手动注册依赖项
    watch,
    provide,
    inject,
    // 相当于得到app应用实例
    getCurrentInstance,
    // 各种生命周期钩子
	onMounted,
} from 'vue';

function useDebouncedRef(value, delay = 200) {
	let timeout;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					value = newValue;
					trigger();
				}, delay);
			},
		};
	});
}

export default {
	props: {
		username: String,
	},
	beforeCreate() {
		console.log('options beforeCreate');
	},
	created() {
		console.log('options created');
	},
	mounted() {
		console.log('options mounted');
	},
	// 执行setup时, 组件实例还没有创建, 只能访问以下property, props,attrs,slots,emit
	// 即 无法访问data, computed, methods三个组件选项
	// setup也可以返回一个渲染函数
	// setup中的生命周期,对比选项写法,使用on前缀: (没有beforeCreate, created) onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCapture,onRenderTracked,onRenderTriggered
	// setup会先与options生命周期执行
	setup(props, context) {
		console.log('props', props);
		// context拥有非响应式的属性和方法, attrs, slots, emits
		console.log('context', context);
		// 在setup中, ref声明的变量在使用的时候需要 .value使用其值
		// 在模板中会被自动展开,不需要加.value
		const numRef = ref(0);
		function handleAddNum() {
			numRef.value++;
		}
		// 在reactive对象类型的 ref,会被自动展开,使用值的时候不需要.value
		const state = reactive({
			name: 'reactive name',
			rNum: numRef,
		});

		// 在reactive Array,Map类型的时候不会自动展开, 需要用.value取值
		const arr = reactive([numRef]);
		console.log('reactive Array', arr[0].value);
		const map = reactive(new Map([['count', ref(0)]]));
		console.log('reactive Map', map.get('count').value);

		// 可以使用toRefs解构reactive对象, 保证属性的响应性
		const { name: nameRef } = toRefs(state);
		console.log('toRefs解构出的name', nameRef.value);

		// 通过readonly得到一个无法被修改的响应式数据,
		const copyState = readonly(state);
		// 报出警告,修改失败
		copyState.name = '新名字';
		console.log('readonly copyState', copyState);

		const shallow = shallowRef({
			greet: 'Hello, world',
		});
		const foo = shallowRef({});
		// 改变 ref 的值是响应式的
		foo.value = {};
		// 但是这个值不会被转换。
		isReactive(foo.value); // false

		// 第一次运行时记录一次 "Hello, world"
		watchEffect(() => {
			console.log(shallow.value.greet);
		});

		// 这不会触发作用，因为 ref 很浅层
		shallow.value.greet = 'Hello, universe';

		// 记录 "Hello, universe"
		triggerRef(shallow);

		// computed 函数返回的是一个不可写的ref对象
		const cptName = computed(() => nameRef.value + state.rNum);
		const otherCptName = computed({
			get() {
				return nameRef.value + state.rNum;
			},
			set(val) {
				nameRef.value += val;
			},
		});

		// 类似于Vue2的$watch
		const stop = watchEffect(
			(onInvalidate) => {
				// 注册失败的回调
				onInvalidate(() => {});
				console.log('watchEffect:post', nameRef.value);
			},
			{
				flush: 'post', // 默认是'pre' , 在组件更新前后调用, 里面的值都是更改后的值
				// 将在响应式 property 或 ref 作为依赖项被追踪时被调用。
				onTrack() {},
				// 将在依赖项变更导致副作用被触发时被调用。
				onTrigger(e) {
					// debugger;
				},
			},
		);

		// watch监听的可以是一个getter函数,或者一个ref,或者是个数组 与 watchEffect 比较，watch 允许我们：
		// 懒执行副作用；
		// 更具体地说明什么状态应该触发侦听器重新运行；
		// 访问侦听状态变化前后的值
		watch(
			() => state.rNum,
			(newVal, oldVal) => {
				console.log('newVal:', newVal, '  oldVal:', oldVal);
			},
		);

		onMounted(() => {
			console.log('onMounted 组件已经挂载');
		});

		return {
			...toRefs(props),
			state,
			num: numRef,
			...toRefs(state),
			handleAddNum,
			cptName,
			otherCptName,
		};
	},
};
</script>
