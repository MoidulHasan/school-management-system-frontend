module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue' : '/'
}

module.exports = {
	devServer: {
		proxy: 'http://localhost:8080/',
	}
}