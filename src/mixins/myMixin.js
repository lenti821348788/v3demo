export default {
    created() {
        this.hello()
    },
    methods: {
        hello() {
            console.log('hello, this from mixin', this.$globalName)
        } 
    }
}