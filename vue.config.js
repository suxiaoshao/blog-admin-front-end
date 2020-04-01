module.exports = {
    assetsDir: 'static',
    indexPath: 'static/index.html',
    // 选项...
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.js')
            config.set('externals', {
                'vue': 'Vue',
                // 'element-ui': 'ElEMENT',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'element-ui': 'ElementUI',
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
            config.set('externals', {
                'vue': 'Vue',
                // 'element-ui': 'ElEMENT',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'element-ui': 'ElementUI',
            })
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}