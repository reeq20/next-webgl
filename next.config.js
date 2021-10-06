/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(vs|fs|glsl|vert|frag)$/,
            type: 'asset/source',
            exclude: /node_modules/
        })
        return config
    }
}
