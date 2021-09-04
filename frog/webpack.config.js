module.exports = {
    mode: "none",
    entry: "./lib/frog_jumper.js",
    output: {
        filename: "./bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js"]
    }
}