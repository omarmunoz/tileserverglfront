module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader" // 1. Turns sass into css
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // 2. Inject styles into DOM
                    "css-loader", // 1. Turns css into commonjs
                ]
            }
        ]
    },
    devServer: {
        hot: true,
    },
}