<template>
	<view class="content" style="pointer-events:none">
		<canvas canvas-id="thumsCanvas" id="thumsCanvas" class="thumsCanvas"></canvas>
		<!-- <button class="button" type="default" @click="zan">点赞</button> -->
	</view>
</template>

<script>
	export default {
		props: {
			zan_click:{
				type: Number
			}
		},
		watch:{
		    zan_click : function(n ,o) {//箭头函数  不然会发生this改变
		        // console.log(n)
				this.zan()
				// this.thumbsUp()
		      }
		 },
		data() {
			return {
				thumbsUpContext: null,
				thumbsUpTimer: 0,
				thumbsUpQueue: {},
				thumbsUpWidth: 200,
				thumbsUpHeight: 200,
				// timer_interval: null
			}
		},
		onLoad() {
			
		},
		mounted() {
			// console.log(this,'this')
			this.thumbsUpContext = uni.createCanvasContext('thumsCanvas',this); //自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略，则不在任何自定义组件内查找
			// console.debug('canvas',this.thumbsUpContext)
			// this.thumbsUpContext.drawImage('/static/thumbsUpImage/10.png', 10, 10);
			// this.thumbsUpContext.draw();
			var that = this;
			
			// this.timer_interval = setInterval(() => {this.thumbsUp()}, 2000)
		}, 
		methods: {
			zan(){
			// clearInterval(this.timer_interval);
			// this.timer_interval = null;
			// consoe.debug(this.timer_interval)
				if(!this.thumbsUpContext) {
					this.thumbsUpContext = uni.createCanvasContext('thumsCanvas',this);
					var that = this;
				}
				let time = 0;
				this.thumbsUp()
				// let animate = setInterval(() => {
				// 	time++
				// 	this.thumbsUp()
				// 	if(time>=5){
				// 		clearInterval(animate);
				// 	}
				// },80);
			},
			
			//点赞动画 start
			async thumbsUp() {
				const image = "/static/thumbsUpImage/" + this.getRandomInt(1, 11) + ".png";
				// let img_info = await this.getImageInfo(image)
				// console.debug('thumbsup',img_info)
				const anmationData = {
					id: new Date().getTime(),
					timer: 0,
					opacity: 0.5,
					pathData: this.generatePathData(),
					image: image,
					factor: {
						speed: 0.015,
						t: 0
					}
				};
				if (Object.keys(this.thumbsUpQueue).length > 0) {
					this.thumbsUpQueue[anmationData.id] = anmationData;
				} else {
					this.thumbsUpQueue[anmationData.id] = anmationData;
					this.createThumbsAnimate();
				}
			},

			getRandom(min, max) {
				return Math.random() * (max - min) + min;
			},

			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			generatePathData() {
				let width = this.thumbsUpWidth,
					height = this.thumbsUpHeight;
				const p0 = {
					x: 0.65 * width,
					y: height
				};
				const p1 = {
					x: this.getRandom(0.22 * width, 0.33 * width),
					y: this.getRandom(0.5 * height, 0.75 * height)
				};
				const p2 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0.25 * height, 0.5 * height)
				};
				const p3 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0, 0.125 * height)
				};
				return [p0, p1, p2, p3];
			},

			updatePoint(data, factor) {
				const p0 = data[0];
				const p1 = data[1];
				const p2 = data[2];
				const p3 = data[3];
				const t = factor.t;
				const cx1 = 3 * (p1.x - p0.x);
				const bx1 = 3 * (p2.x - p1.x) - cx1;
				const ax1 = p3.x - p0.x - cx1 - bx1;
				const cy1 = 3 * (p1.y - p0.y);
				const by1 = 3 * (p2.y - p1.y) - cy1;
				const ay1 = p3.y - p0.y - cy1 - by1;
				const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x + 40;
				const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
				return {
					x,
					y
				};
			},

			createThumbsAnimate() {
				let width = this.thumbsUpWidth,
					height = this.thumbsUpHeight;
				var that = this;
				Object.keys(that.thumbsUpQueue).forEach(key => {
					const anmationData = that.thumbsUpQueue[+key];
					const {
						x,
						y
					} = this.updatePoint(
						anmationData.pathData,
						anmationData.factor
					);
					const speed = anmationData.factor.speed;
					anmationData.factor.t += speed;
					var curWidth = 40;
					curWidth = (height - y) / 1.5;
					curWidth = Math.min(40, curWidth);
					var curAlpha = anmationData.opacity;
					curAlpha = y / height;
					curAlpha = Math.min(1, curAlpha);
					that.thumbsUpContext.globalAlpha = curAlpha;
					that.thumbsUpContext.drawImage(anmationData.image, x - curWidth / 2 , y, curWidth, curWidth);//x - curWidth / 2
					if (anmationData.factor.t > 1) {
						delete that.thumbsUpQueue[anmationData.id];
					}
					if (y > height) {
						delete that.thumbsUpQueue[anmationData.id];
					}
				});
				that.thumbsUpContext.draw();
				if (Object.keys(that.thumbsUpQueue).length > 0) {
					that.thumbsUpTimer = setTimeout(() => {
						that.createThumbsAnimate();
					}, 20);
				} else {
					clearTimeout(that.thumbsUpTimer);
					that.thumbsUpContext.draw();
				}
			},
			//点赞动画 end
			
			// async getImageInfo(imgSrc) {
			//             return new Promise((resolve, errs) => {
			//                 uni.getImageInfo({
			//                     src: imgSrc,
			//                     success: function(image) {
			//                         resolve(image);
			//                     },
			//                     fail(err) {
			//                         errs(err);
			//                     }
			//                 });
			//             });
			//         }
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -200px;
		right: -15px;
	}

	.button{
		background-color: #4CD964 !important;
		color: white !important;
		width: 700rpx;
	}
	.thumsCanvas {
		width: 200px;
		height: 200px;
		z-index: 999;
		pointer-events:none;
	}
</style>

