var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, crypto = require('crypto');

// 找出
module.exports = function(size, md5Data) {
    size = size | 0;
    return through.obj(function (file, encoding, callback) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return callback();
        }

        if(!file.contents){
            return callback();
        }
        var filename = path.basename(file.path);
        var d = calcMd5(file, size);
        var relativepath = path.relative(file.base+"../" ,file.path);
        var pathList = relativepath.replace(new RegExp(filename) , "").split(path.sep);
        // var sub_namepath = pathList[pathList.length-2]+'/';
        var sub_namepath = '';

        if(md5Data) {
            var od = md5Data[sub_namepath+filename];
            if(od && od != '' && od != d) {
                d =  calcStrMd5(d+od, size);
            }
        }
        // if(d=='81f6f496a0') {
        //   console.log(relativepath+'  ;' + filename+'  re:' + md5Data['3_background.jpg']);
        // }
        md5Data[sub_namepath+filename] = d ; //
        this.push(file);
        callback();

    }, function (callback) {
        callback();
    });
};

function calcMd5(file, slice) {
  var md5 = crypto.createHash('md5');
  md5.update(file.contents, 'utf8');

  return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
function calcStrMd5(str, slice){
    var md5 = crypto.createHash('md5');
    md5.update(str, 'utf8');
    return slice >0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
