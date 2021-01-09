<template>
	<button @click="$emit('m-click', num++)">组件按钮{{ modelValue }}</button>
	<p @click="handleClickText">{{ text }}</p>
</template>

<script>
export default {
	// 父组件中在对此组件使用v-model,则必须声明model-value变量
    // 语法糖: :model-value="value" @update:model-value="value = $event"
    // v-model修饰符, 默认的绑定到 modelModifiers对象中, 自定义的为 名字+Modifiers 中
	props: ['modelValue', 'text','modelModifiers','textModifiers'],
	// 当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
	emits: {
		'm-click': (num) => {
			// 指示器验证,不会终止$emit,只是在控制台中提示是否正确
			return num % 3 == 0;
        },
        'update:text':null
	},
	data() {
		return {
			num: 1,
		};
	},
	computed: {},
	methods: {
		handleClickText() {
            console.log('modelModifiers',this.modelModifiers)
            console.log('textModifiers',this.textModifiers)
			this.$emit('update:text', this.text + 'a');
		},
	},
};
</script>
