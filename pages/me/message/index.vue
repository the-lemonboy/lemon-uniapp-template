<template>
	
	<view class="ms-container">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="detail-container">
		<view class="nav-container" style="height: 44px;">
			<view class="nav-bar"
				style="position: fixed; z-index: 99; background-color: white; box-sizing: border-box; box-sizing: border-box; width: 100vw; height: 44px;">
				<uni-icons @click="goToBack()" type="left" size="30" style="line-height: 44px;"></uni-icons>
				<text class="title"
					style="font-size: 16px; position:absolute; left: 50%; top:50%; transform: translate(-50%,-50%);">消息中心</text>
			</view>
		</view>
		 <div class="Cityk-messageList-box"  ref="messageListBody">
		        <!-- <div v-if="list.length"> -->
		          <div v-for="(item,i) in list" :key="i" class="Cityk-messageList-item" 
		               :title="item.title">
		          <!--  <el-badge is-dot :hidden="item.isRead=='1'" type="warning">
		              <i class="icon-ym icon-ym-xitong Cityk-messageList-item-icon"></i>
		            </el-badge> -->
		            <div class="Cityk-messageList-txt">
		              <p class="title">{{item.title}}</p>
		              <p class="name">
		                <span>{{item.creatorUser}}</span>
		                <span class="time">{{item.lastModifyTime}}</span>
		              </p>
		            </div>
		          </div>
		        <!-- </div> -->
		      </div>
			</view>
	</view>
</template>

<script setup>
    import {reactive, ref,nextTick} from 'vue' 
	import {getMessageList} from '@/api/system/message.js'
	import {onLoad,onPullDownRefresh,onReachBottom} from '@dcloudio/uni-app'
	// const emits = defineEmits(['visible'])
	function goToBack(){
		uni.navigateBack({delta:1})
	}
	const dataList = ref([])
	const listQuery = reactive({
		currentPage: 1,
			pageSize: 20,
			sort: 'desc',
			keyword:'',
			type: ''
		})
	const list = ref([])
	const reachBottomFlag = ref(false)
	  async function getList() {
		  uni.showLoading({
		  	title: '加载中'
		  });
	     await getMessageList(listQuery).then(res => {
			let resList = []
			if(res.data.list.length>0){
				resList = res.data.list.map(item => {
				    const lastModifyTime = timestampToDate(item.lastModifyTime);
				    return {
				        ...item,
				        lastModifyTime: lastModifyTime
				    };
				});
			}
	        
			if(reachBottomFlag.value){
				listQuery.currentPage++
				list.value = [...list.value, ...resList]
			}else{
				list.value = resList
			}
			uni.hideLoading();
	      })
	    }
	// 时间戳转时间
	function timestampToDate(timestamp) {
	    // 创建一个新的 Date 对象，传入时间戳（毫秒）
	    const date = new Date(timestamp);
	    
	    // 使用 Date 对象的方法获取年、月和日
	    const year = date.getFullYear();
	    const month = ('0' + (date.getMonth() + 1)).slice(-2);
	    const day = ('0' + date.getDate()).slice(-2);
	    
	    // 构建最终的日期字符串
	    const dateString = `${year}-${month}-${day}`;
	    
	    return dateString;
	}
	onLoad(()=>{
		reachBottomFlag.value = false
		getList()
	})
	onReachBottom(()=>{
		reachBottomFlag.value = true
		getList()
	})
	onPullDownRefresh(async () => {
		try {
			reachBottomFlag.value = false
		    await getList();
		} catch (error) {
		    uni.showToast({
		    	title: '加载失败',
				icon:'error',
		    	duration: 2000
		    });
		}
		uni.stopPullDownRefresh();
	})
</script>
<style lang="scss" scoped>
.Cityk-messageList-item {
      position: relative;
      display: block;
      padding: 0 20px;
      background-color: #fff;
      border-bottom: 1px solid #f5f7f9;
      height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #f5f7f9;
      }

      .Cityk-messageList-item-icon {
        background-color: #1890ff;
        width: 36px;
        height: 36px;
        display: inline-block;
        font-size: 22px;
        color: #fff;
        line-height: 36px;
        border-radius: 50%;
        text-align: center;
      }
      .Cityk-messageList-txt {
        margin-left: 14px;
        overflow: hidden;
        flex: 1;
        padding-top: 1px;
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
        }
        .name {
          font-size: 12px;
          color: #999;
          .time {
            float: right;
          }
        }
      }
    }
</style>