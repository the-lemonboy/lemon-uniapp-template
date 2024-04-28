<!--钻孔剖面图-->
<template>
  <div class="Cityk-common-layout-center" style="height:560px">
	  <div id="map_hole" style="width: 100%;height: 100% ;"></div>
<!-- 	    <div style="position: absolute;top: 20px;left: 20px;"> <el-button type="primary"
	                 @click="showImg()">{{btName}}</el-button></div> -->
	  </div>
</template>

<script>
import request from '@/utils/request'
import View from 'ol/View'
import Map from 'ol/Map'
import { Feature } from 'ol'
import { Point, LineString, Polygon } from 'ol/geom'
import { Style, Icon, Fill, Stroke, Text, Circle as CircleStyle } from 'ol/style'
import { get as getProjection, fromLonLat, transform, getTransform } from 'ol/proj.js'
import { getTopLeft, getWidth, getCenter as olGetCenter, applyTransform } from 'ol/extent.js'
import { Tile, Vector as LayerVec, Vector as VectorLayer, Group as GroupL } from 'ol/layer'
import { Vector as SourceVec, Cluster, Vector as VectorSource, WMTS as WMTSSource } from 'ol/source'
import { Control, defaults as defaultControls } from 'ol/control.js'
import TileGridWMTS from 'ol/tilegrid/WMTS'
// import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
export default {
  components: { drillDialog, outcomeData, holeSurveyProfile },
  data() {
    return {
      isMapLoad: false, //地图是否加载
      profileName: '钻孔剖面图',
      dialogLoading: false,
      showHoleProfile: false,
      holeids: null,
      map: null,
      btName: '地质剖面',
      layers: null,
      center: [121.5, 31.19],
      centerSize: 11,
      maxZoom: 21,
      minZoom: 1,
      projection: 'EPSG:4326',
      listLoading: false,
      drillVisible: false,
      drawLineSelectHolesStatus: false,
      selectedHoleArray: [],
      drawLineSelectHoleList: [], //绘制连线数组
      selectedHoleLayerSource: null,
      selectedHoleLayer: null,
      drawLineFeature: null //绘制的线feature
    }
  },
  // computed: {
  //   menuId() {
  //     return this.$route.meta.modelId || ''
  //   },
  //   globalFilter() {
  //     return this.cityk.getGlobalFilter()
  //   }
  // },
  mounted() {
	this.initMap()
	this.getHoleList()
  },
  methods: {
    close() {
      this.showHoleProfile = false
      this.selectedHoleArray = {}
      this.selectedHoleArray.length = 0
      this.drawLineSelectHolesStatus = false
      this.selectedHoleLayerSource.clear()
      this.btName = '地质剖面'
      this.drawLineFeature = null
      this.drawLineSelectHoleList = []
    },
    init() {
      this.$refs.outcomeData.init()
      var mapData = this.getTDTData()
      this.layers = [this.createTDT(mapData)]
    },
    initMap() {
      let _self = this

      this.map = new Map({
        layers: this.layers,
        target: 'map_hole',
        view: new View({
          center: transform(this.center, 'EPSG:4326', this.projection),
          projection: this.projection,
          zoom: this.centerSize,
          maxZoom: this.maxZoom,
          minZoom: this.minZoom,
          constrainResolution: true, // 设置缩放级别为整数
          smoothResolutionConstraint: false // 关闭无级缩放地图
        }),
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        })
      })

      this.selectedHoleLayerSource = new VectorSource()
      this.selectedHoleLayer = new VectorLayer({ source: this.selectedHoleLayerSource, zIndex: 10 })
      this.map.addLayer(this.selectedHoleLayer)

      //地图点击事件
      this.map.on('click', event => {
        if (this.map.hasFeatureAtPixel(event.pixel)) {
          var testFeature = this.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            return feature
          })
          // click_project_feature = testFeature;

          var item = testFeature.get('entity')
          if (item) {
            if (this.drawLineSelectHolesStatus) {
              this.setMapProjectHoleMarkerSelect(testFeature, item.id)
            }
          }
        }
      })

      this.map.on('pointermove', e => {
        var pixel = this.map.getEventPixel(e.originalEvent)
        var hit = this.map.hasFeatureAtPixel(pixel)

        if (hit) {
          document.getElementById('map_hole').style.cursor = 'pointer'
        } else {
          document.getElementById('map_hole').style.cursor = ''
        }
      })
    },
    getTDTData() {
      return {
        ID: '24e158e0-fdae-4597-9e86-04d77b096f1b',
        Name: '影像',
        Layer: 'img',
        Kind: 'TDT',
        Url: 'http://t{0-7}.tianditu.gov.cn/img_w/wmts',
        HaveParameter: true,
        KeyName: 'tk',
        KeyVal: 'b494f71413b4eee49f7b166ca1a607b4',
        GroupLayer: '6079f8c6-6b6e-4f89-9ad3-2925a1d8e778',
        GroupLayerObj: {
          ID: '6079f8c6-6b6e-4f89-9ad3-2925a1d8e778',
          Name: '天地图道路',
          Layer: 'cia',
          Kind: 'TDT',
          Url: 'http://t{0-7}.tianditu.gov.cn/cia_w/wmts',
          HaveParameter: false,
          KeyName: 'tk',
          KeyVal: 'b494f71413b4eee49f7b166ca1a607b4',
          GroupLayer: '00000000-0000-0000-0000-000000000000',
          GroupLayerObj: null,
          ServiceType: null,
          IsDelete: false,
          Base64Str: null,
          IcoPath: null,
          IcoName: null,
          Description: null,
          Format: 'tiles'
        },
        ServiceType: null,
        IsDelete: false,
        Base64Str: null,
        IcoPath: 'Images/LayerIco/影像_24e158e0-fdae-4597-9e86-04d77b096f1b.png',
        IcoName: null,
        Description: null,
        Format: 'tiles'
      }
    },
    //创建天地图
    createTDT(item) {
      var groupLayers = [this.createWMTSLayer(item)]
      if (item.GroupLayerObj) {
        //创建叠加图层
        groupLayers.push(this.createWMTSLayer(item.GroupLayerObj))
      }

      var mapLayer = new GroupL({
        layers: groupLayers,
        noSwitcherDelete: true, // true表示不能通过控件删除
        name: '天地图',
        visible: true,
        isBaseLayer: true,
        opacity: 1
      })
      return mapLayer
    },
    //创建wsts图层
    createWMTSLayer(layer) {
      //因为天地图涉及到三维，所以要用墨卡托投影的地图
      let tdtprojection = getProjection('EPSG:900913')
      let tdtprojectionExtent = tdtprojection.getExtent()
      let tdtorigin = tdtprojectionExtent ? getTopLeft(tdtprojectionExtent) : [-180, 90]
      // let tdtfromLonLat = ol/projgetTransform('EPSG:4326', tdtprojection);
      let width = tdtprojectionExtent
        ? getWidth(tdtprojectionExtent)
        : getWidth(ol.extent.applyTransform([-180.0, -90.0, 180.0, 90.0], fromLonLat))
      let tdtresolutions = []
      let tdtmatrixIds = []
      for (let z = 1; z < 19; z++) {
        tdtresolutions[z] = width / (256 * Math.pow(2, z))
        tdtmatrixIds[z] = z
      }

      var keyStr = ''
      if (layer.KeyName && layer.KeyVal) {
        keyStr = '&' + layer.KeyName + '=' + layer.KeyVal
      }
      return new Tile({
        noSwitcherDelete: true, // true表示不能通过控件删除
        name: layer.Name,
        source: new WMTSSource({
          url: layer.Url, //影像图
          tileLoadFunction: function (imageTile, src) {
            imageTile.getImage().src = src + keyStr
          },
          layer: layer.Layer,
          matrixSet: 'w',
          format: layer.Format,
          projection: tdtprojection,
          tileGrid: new TileGridWMTS({
            origin: tdtorigin,
            resolutions: tdtresolutions,
            matrixIds: tdtmatrixIds
          }),
          style: 'default'
        })
        //19: 0.5971642834779395,
        //minResolution: 0.5971642834779395,
      })
    },
    // showImg() {
    //   if (!this.drawLineSelectHolesStatus) {
    //     this.drawLineSelectHolesStatus = true
    //     this.btName = '绘制'
    //   } else {
    //     if (this.selectedHoleArray.length >= 2) {
    //       var ids = ''
    //       for (var id in this.selectedHoleArray) {
    //         if (id != 'length') {
    //           ids += id + ','
    //         }
    //       }
    //       ids = ids.substring(0, ids.length - 1)
    //       this.showHoleProfile = true
    //       if (this.holeids != ids) {
    //         this.dialogLoading = true
    //       }
    //       this.holeids = ids
    //     } else {
    //       alert('至少选择两个钻孔！')
    //     }
    //   }

    //   // this.drillVisible = true;
    //   // this.$nextTick(()=>{
    //   //   this.$refs.drillDialog.init()
    //   // })
    // },
    //获取钻孔数据
    getHoleList() {
      let _query = {
        ...this.globalFilter,
        projectId: this.cityk.storageGet('projectId'),
        menuId: '334593359840562885' // TODO 这里必须给定模块Id，否则数据权限无法启用
      }
      request({
        url: `/api/project/HoleBase/getList`,
        method: 'post',
        data: _query
      }).then(res => {
        if (res.data) {
          this.loadHole(res.data.list)
        }
      })
    },
    //加载钻孔
    loadHole(list) {
      let vectorSource = new VectorSource({
        projection: this.projection
      })

      let _self = this
      list.forEach(entity => {
        if (entity.longitude && entity.latitude) {
          // 腾讯地图经纬度反着来 0维度 1经度
          let lonLat = [entity.longitude, entity.latitude]

          let fea = new Feature({
            id: entity.id,
            geometry: new Point(fromLonLat(lonLat, _self.projection))
          })
          fea.set('name', entity.holeNo)
          fea.set('entity', entity)
          vectorSource.addFeature(fea)
        }
      })

      // 创建图层
      let vectorLayer = new VectorLayer({
        show_progress: true,
        noSwitcherDelete: true, // true表示不能通过控件删除
        allwaysOnTop: true,
        displayInLayerSwitcher: true,
        openInLayerSwitcher: false,
        title: '监测点位',
        name: '监测点位',
        baseLayer: false,
        source: vectorSource,
        animationDuration: 700,
        style: function (feature, resolution) {
          return _self.getFeatureStyle(feature.get('name'), require('@/assets/images/hole.png'))
        }
      })

      let extent = vectorSource.getExtent()
      this.map.getView().fit(extent, {
        duration: 1000,
        maxZoom: 17
      })
      this.map.addLayer(vectorLayer)
    },
    //获取钻孔样式
    getFeatureStyle(name, imgPath) {
      var style = null
      var text = new Text({
        textAlign: 'left',
        textBaseline: 'middle',
        offsetX: 12,
        offsetY: 2,
        font: 'bold 13px Arial',
        text: name,
        fill: new Fill({
          color: '#00c'
        }),
        stroke: new Stroke({
          color: '#eef',
          width: 3
        })
      })
      style = new Style({
        image: new Icon({ src: imgPath }),
        //文本样式
        text: text
      })
      // }
      // this.styleCache[k] = style
      return style
    },
    //设置地图项目钻孔标注选中
    setMapProjectHoleMarkerSelect(feature, holeID) {
      var newFeature = feature.clone()
      newFeature.holeID = holeID
      if (this.selectedHoleArray[holeID]) {
        //已经被选中
        this.selectedHoleLayerSource.removeFeature(this.selectedHoleArray[holeID])
        for (var i = 0; i < this.drawLineSelectHoleList.length; i++) {
          if (this.drawLineSelectHoleList[i].holeID == holeID) {
            this.drawLineSelectHoleList.splice(i, 1)
            break
          }
        }
        delete this.selectedHoleArray[holeID]
        this.selectedHoleArray.length -= 1
      } else {
        //被选中
        newFeature.setStyle(this.getFeatureStyle('', require('@/assets/images/hole_selected.png')))
        this.selectedHoleArray[holeID] = newFeature
        this.drawLineSelectHoleList.push(newFeature)
        this.selectedHoleArray.length += 1
        this.selectedHoleLayerSource.addFeature(newFeature)
      }

      if (this.drawLineSelectHolesStatus) {
        this.drawSelectedHoleLine()
      }
    },
    //连线所选钻孔标注
    drawSelectedHoleLine() {
      if (this.selectedHoleArray.length >= 2) {
        if (this.drawLineFeature) {
          this.selectedHoleLayerSource.removeFeature(this.drawLineFeature)
        }
        var linePoints = new Array()
        for (var i = 0; i < this.drawLineSelectHoleList.length; i++) {
          linePoints.push(this.drawLineSelectHoleList[i].getGeometry().getCoordinates())
        }
        var lineFeatureGeometry = new LineString(linePoints)
        this.drawLineFeature = new Feature({
          geometry: lineFeatureGeometry
        })
        this.drawLineFeature.setStyle(
          new Style({
            stroke: new Stroke({
              width: 2,
              color: '#FF33FF'
            })
          })
        )
        this.selectedHoleLayerSource.addFeature(this.drawLineFeature)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>