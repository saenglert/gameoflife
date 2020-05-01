const path = require("path");
const mode = process.env.NODE_ENV || "development";

module.exports = {
    mode,

    entry: path.join(__dirname, "src", "index.ts"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "scripts.js"
    },

    devtool: "source-map",

    devServer: {
        contentBase: path.join(__dirname, "public"),
        open: true
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
        
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
};