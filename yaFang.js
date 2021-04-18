// 防抖
var debounce = function (fn,n) {
				var a;
				return function (){
					clearTimeout(a)
					a = setTimeout(()=>{
						fn.apply(this,arguments)//箭头函数arguments与this一样在定义时进行绑定，这里指向返回的函数
					},n)
				}
			}
			
			
// 节流			
var throttle = function(fn,n){
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
					this.num = 0,
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
			
			
			
			
			
			
			
加载大量数据时使用 参数依次为 
		data	要渲染的所有数据
		show	要显示的数据的容器 是个数组 这里的数据将会被渲染到页面 
		_stepLength  每次更新的数据长度
		_showPageNum 页面上要渲染多少页元素
		如果自己创造了一个滚动元素 后三个参数一样 都为那个滚动元素 不然就传 'html','父元素css选择器' ,'body'
		_scrollElement 滚动的元素 填写css	选择器 比如 '.test'		
		_fatherElement 渲染元素的父元素 若是自己创造的滚动元素position最好不为static,若是直接添加到body中的 最好不再有offsetparent 不然会影响加载新数据时机的判断
		listener		添加滚动事件的元素	
function bigData(data,show,_stepLength,_showPageNum,_scrollElement,_fatherElement,listener){
				
				var dataArr = data,		//传过来的所有数据
					showData = show;		//页面要展示的数据
					
					
				
				
				var page = 0,			//展示的第几页数据
					stepLength = _stepLength,		//每页的数据长度
					showPageNum = _showPageNum;		//页面要展示几页数据
				document.body.style.paddingTop = '0px'
				var scrollElement = document.querySelector(_scrollElement),		//滚动的元素 如果设为div 则跟fatherElement一样 否则为html元素 因为body可以监听滚动事件 却没有滚动方法 
					fatherElement = document.querySelector(_fatherElement);		//包裹展示元素的父元素 
					
				//向后面追加数据
				function down (){
					if (page > dataArr.length/stepLength-1){
						return
					}
					
					// 初始化 
					if (page === 0) {
						var currentData = dataArr.slice(0,stepLength*showPageNum)
						page = showPageNum
						showData.push(...currentData)
						changeChild()
						scrollElement.scrollTop = 0
						console.log(currentData,page);
						return
					}
					
					//截取要显示的数据
					var currentData = dataArr.slice(page*stepLength,Math.min( page*stepLength + stepLength,dataArr.length))
					page++
					//显示数据的数组中删除前面不需要显示的数据
					if (page > showPageNum) {
						showData.splice(0,currentData.length)
						scrollElement.scrollTop -= currentData.length * fatherElement.children[0].offsetHeight	
						// fatherElement.style.paddingTop = parseInt(fatherElement.style.paddingTop) + fatherElement.children[0].offsetHeight*currentData.length + 'px'
					}
					
					//显示数据的数组中添加后面显示的数据
					showData.push(...currentData)
					
					changeChild()	//vue中直接将showData写在data中会自己更新，不需要这一步
					
					
					// if (page === 3) {
					// 	document.body.style.paddingBottom = fatherElement.children[0].offsetHeight * dataArr.length + 'px'
					// }
					// document.body.style.paddingBottom = parseInt(document.body.style.paddingBottom) - fatherElement.children[0].offsetHeight*currentData.length + 'px'
					
					console.log(currentData,showData,document.body.style.paddingTop,page)
				}
				
				
				//向前面追加数据
				function up (){
					if(page <= showPageNum){
						return
					}
					var currentData = dataArr.slice((page-showPageNum-1)*stepLength,(page-showPageNum)*stepLength)	//截取数据
					showData.splice(showData.length-currentData.length,currentData.length)	//移除不需要的数据
					showData.unshift(...currentData)	//推入要展示的数据
					page--
					changeChild()
					// document.body.style.paddingBottom = parseInt(document.body.style.paddingBottom) + fatherElement.children[0].offsetHeight*currentData.length + 'px'
					scrollElement.scrollTop += currentData.length * fatherElement.children[0].offsetHeight
					// fatherElement.style.paddingTop = parseInt(fatherElement.style.paddingTop) - fatherElement.children[0].offsetHeight*currentData.length + 'px'
					console.log(currentData,showData,fatherElement.style.paddingTop);
				}
				
				//先执行一次向里面添加数据，不然没有滚动事件，永远不会触发
				down()
				
				// 更新元素到视图 
				function changeChild (){
					var str = '';
					showData.map(function (item,index) {
						str+=`<div>${item}</div>`
					})
					fatherElement.innerHTML = str
				}
				
				
				var debounceDown = debounce(down,200)
				var debounceUp = debounce(up,200)
				
				//根据滚动长度判断向后还是向前追加数据
				function judge () {
					if(scrollElement.scrollTop < fatherElement.children[1].offsetTop){
						console.log('do')
						debounceUp()
						
					}else if(scrollElement.scrollTop > fatherElement.children[fatherElement.children.length - 3].offsetTop) {
						debounceDown()
						
					}
					console.log(1,scrollElement.scrollTop,fatherElement.children[1].offsetTop,fatherElement.children[fatherElement.children.length - 3].offsetTop)
				}
				
				//监听事件 
				document.querySelector(listener).onscroll = throttle(judge,200)
			}