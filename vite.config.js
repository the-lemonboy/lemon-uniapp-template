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
		        target:'http://112.64.139.162:30019',
		        changeOrigin: true,
		        rewrite: (path) => path.replace(/^\/dev/, ''),
		      },
		    },
	}
})