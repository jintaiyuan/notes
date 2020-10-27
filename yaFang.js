// 防抖
var debounce = function (n,fn) {
				var a;
				return function (){
					clearTimeout(a)
					a = setTimeout(()=>{
						fn.apply(this,arguments)//箭头函数arguments与this一样在定义时进行绑定，这里指向返回的函数
					},n)
				}
			}
			
			
// 节流			
var throttle = function(n,fn){
				let state = true,
				    timmer;
				 return function(){
					 if(!state){
						 clearTimeout(timmer)
						 timmer=setTimeout(()=>{
							 fn.apply(this,arguments)
						 },n,arguments)
						 return
					 }else {
						 clearTimeout(timmer)
						 state = false
						 setTimeout(()=>{state=true},n)
						 fn.apply(this,arguments)
					 }
				 }
			}
			
			
			
			
			
			
			
// 轮播图 		   let move = new weiper(document.querySelector(".inner"),'left',3000,2000)
				// ele 要运动的element 
				// dir 方向 'right'向右  别的任意字符串都为向左
				// dur 轮播间隔时间  单位毫秒
				// speed 速度 应小于dur  单位毫秒 与dur相同可作为移动横幅
				
				// play()为启动
				// stop()停止
				// left()向左移动		建议结合节流使用 延迟建议等于dur  比如
				// 					let a =throttle(move.left,3000) 执行3秒后下次执行才起作用
				// 					let b =debounce(move.play,5000) 无操作后五秒启动轮播
				// 					ele.onclick=function () {
				// 						move.stop()
				// 						a()
				// 						b()
				// 					}
				// right()向右移动
				// go(num)移动到第num张图
class swiper {
				constructor(ele, dir,dur, speed) {
					this.ele = ele;
					this.dir = dir
					this.dur = dur;
					this.speed = speed;
					this.num = this.dir=='right'? 0  : 1,
					this.playdir=this.dir=='right'? this.right : this.left
					this.length = this.ele.children.length
					this.width = this.ele.children[0].offsetWidth
					this.timmer = ''
					this.outNumArrL = [1]
					this.outNumArrR = []
					this.outNum = 1
					
					for (var i=this.length-1;i>0;i--){
						this.outNumArrL.unshift(i)
						this.outNumArrR.unshift(i)
					}
					
				}

				playInit() {
					this.playdir()
					this.play()
				}
				
				play (){
					this.timmer = setTimeout(() => {
						this.playdir()
						this.play()
					}, this.dur)
				}
				
				go(num){
					let arr =this.dir=='right'?this.outNumArrR:this.outNumArrL
					if(arr.indexOf(num)<0){
						alert('数值不正确')
						return
					}
					this.num = arr.indexOf(num)
					this.ele.style.transform = `translateX(-${this.num*this.width}px)`
				}
				
				stop(){
					clearTimeout(this.timmer)
				}
				
				left=()=>{
					this.num++
					if (this.num == this.length) {
						this.num = 1
						this.ele.style.transition = '0s'
						this.ele.style.transform = `translateX(0px)`
						setTimeout(this.left,30)
						this.num--
						return
					}
					this.ele.style.transition = `${this.speed/1000}s linear`
					this.ele.style.transform = `translateX(-${this.num*this.width}px)`
					this.outNum = this.outNumArrL[this.num]
					console.log(this.outNumArrL[this.num])
				}
				right=()=>{
					this.num--
					if (this.num == -1) {
						this.num = this.length-2
						this.ele.style.transition = '0s'
						this.ele.style.transform = `translateX(${-(this.length-1)*this.width}px)`
						setTimeout(this.right,30)
						this.num++
						return
					}
					this.ele.style.transition = `${this.speed/1000}s linear`
					this.ele.style.transform = `translateX(-${this.num*this.width}px)`
					this.outNum = this.outNumArrR[this.num]
					console.log(this.outNumArrR[this.num])
				}
			}