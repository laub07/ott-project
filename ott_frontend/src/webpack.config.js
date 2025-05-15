const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util/"),
            "assert": require.resolve("assert/"),
            "url": require.resolve("url/")
        }
    },
    // 추가적인 Webpack 설정을 여기에 추가
};
