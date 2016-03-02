安装：

npm install --save-dev gulp-md5-save

说明：本代码大部分都来源于 [gulp-md5-plus](https://github.com/wpfpizicai/gulp-md5-plus)，我只是进行了改写。

将制定目录里的文件进行md5编码
保存文件的 md5 值到 map 里，例如一个 aa.jpg 文件，{"aa.jpg" : "3b67254a6a"} 

使用方法

	var md5Save = require("gulp-md5-save");
	var data = {}; //一倍图:md5 的 map，用于存放数据
	var sourceTmp = ["../../view/img/**"];
        // 具体模块 img 里的图片 md5
    gulp.src(sourceTmp)
        .pipe(md5Save(10, data));

将最终的数据保存到 data 中。

#Example:

Images path:

	img
	├── pc
	│   ├── a.jpg
	│   ├── a@2x.jpg
	│   ├── b.jpg
	├── mobile
	│   ├── a.jpg
	│   ├── a@2x.jpg
	└── a.jpg

Code:

	var data = {}; 
	var sourceTmp = ["./img/**"];
    gulp.src(sourceTmp)
        .pipe(md5Save(10, data));

Result:

	console.log(data);
	->
	{
		'a.jpg':'3b67254a6a,b372f64f04,55e4269b5e',
		'a@2x.jpg':'7a541974a7,afd0e7c69a',
		'b.jpg':'629ccc774a'
	}

Images No change.

