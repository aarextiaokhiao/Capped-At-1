function loadVue() {
    const App = {
        data() {
            return {
                player,
                tmp,
                format,
                formatGain,
                MAIN,
                formatStaticPercent,
                formatStaticMain,
                RES_UPGS,
                buyResearchUpg,
                revertResearchUpg,
                formatMult,
                formatPercent,
                GLYPH_LEN,
            }
        },
        mounted() {
            setInterval(()=>{
                this.$forceUpdate()
            },1000/FPS)
        },
    }
    
    Vue.createApp(App)
    .mount('#app')
}