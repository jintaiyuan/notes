## node中的路径
	* './'   表示执行node命令时所在目录 在a目录执行
			`node a.js `
			`cd b node b.js`
			分别指向 a 和 a/b 
	* require 中的'./' 指向执行require命令所在的文件 不会改变
	* '__dirname' 表示正在执行的js文件所在目录 不会改变 
	* '__filename' 表示正在执行文件的路径名+文件名

## node 中的path
	* path.resolve(a,b,.....) 把参数从右到左拼成一个路径 遇到/就停止 相当于命令行输入 `cd a cd b .....`
	* path.relative(a,b)  返回从 a 到 b 的相对路径 
	  `path.relative('/a/b/c','/a')` 返回../../
	* 
	  
## node 中使用当前路径
   `path.dirname(__filename)`
   `__dirname`
   `path.resolve(__dirname,'./')`   
   *path.resolve中使用./ 如果前面没有参数 ./ 指执行`node`命令的路径
						如果前面有参数 ./指前面参数的目录 
						
## path.join()与path.resolver()区别
   `path.join('/foo','/bar')` 返回 `/foo/bar`    
   `path.resolve('/foo','/bar')` 返回 `c:/bar`