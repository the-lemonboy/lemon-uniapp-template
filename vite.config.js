import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
 
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 30019,
		 proxy: {
		      '/dev': {
		        target:'http://106.14.80.181:30019',
		        changeOrigin: true,
		        rewrite: (path) => path.replace(/^\/dev/, ''),
		      },
		    },
	}
})