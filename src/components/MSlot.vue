<template>
    <div class=''>
        <hr/>
        <p>这是一个插槽</p>
        <slot>插槽中的默认内容</slot>
        <div>
            <p>下面是footer的内容</p>
            <slot name="footer" :content="content" :arrLength="length">这是具名插槽footer的内容</slot>
        </div>
        <hr/>
    </div>
</template>

<script>

export default {
    components: {},
    inject:['length'],
    data() {
        return {
            content:'来自子组件的作用域的文字'
        };
    },
    computed: {},
    methods: {
        
    },
}
</script>