export default class CoordinateTransformation{

    // 定义一个构造函数
    constructor(){
		//定义一些常量
		this.x_PI = 3.14159265358979324 * 3000.0 / 180.0;
		this.PI = 3.1415926535897932384626;
		this.a = 6378245.0;
		this.ee = 0.00669342162296594323;
      
    }
	
	/**
	 * WGS84转GCj02
	 * @param lng
	 * @param lat
	 * @returns {*[]}
	 */
	wgs84togcj02(lng, lat) {
	    if (this.out_of_china(lng, lat)) {
	        return [lng, lat]
	    }
	    else {
	        var dlat = this.transformlat(lng - 105.0, lat - 35.0);
	        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
	        var radlat = lat / 180.0 * this.PI;
	        var magic = Math.sin(radlat);
	        magic = 1 - this.ee * magic * magic;
	        var sqrtmagic = Math.sqrt(magic);
	        dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
	        dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
	        var mglat = lat + dlat;
	        var mglng = lng + dlng;
	        return [mglng, mglat]
	    }
	}
	
	/**
	 * GCJ02 转换为 WGS84
	 * @param lng
	 * @param lat
	 * @returns {*[]}
	 */
	gcj02towgs84(lng, lat) {
	    if (this.out_of_china(lng, lat)) {
	        return [lng, lat]
	    }
	    else {
	        var dlat = this.transformlat(lng - 105.0, lat - 35.0);
	        var dlng = this.transformlng(lng - 105.0, lat - 35.0);
	        var radlat = lat / 180.0 * this.PI;
	        var magic = Math.sin(radlat);
	        magic = 1 - this.ee * magic * magic;
	        var sqrtmagic = Math.sqrt(magic);
	        dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
	        dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
	        var mglat = lat + dlat;
	        var mglng = lng + dlng;
	        return [lng * 2 - mglng, lat * 2 - mglat]
	    }
	}
	
	transformlat(lng, lat) {
	    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
	    ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
	    ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
	    return ret
	}
	
	transformlng(lng, lat) {
	    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	    ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lng * this.PI) + 40.0 * Math.sin(lng / 3.0 * this.PI)) * 2.0 / 3.0;
	    ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
	    return ret
	}
	
	/**
	 * 判断是否在国内，不在国内则不做偏移
	 * @param lng
	 * @param lat
	 * @returns {boolean}
	 */
	out_of_china(lng, lat) {
	    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
	}
}