
var accessid = '',
accesskey = '',
host = '',
policyBase64 = '',
signature = '',
callbackbody = '',
filename = '',
key = '',
expire = 0,
g_object_name = '',
g_object_name_type = '',
now = Date.parse(new Date()) / 1000,
timestamp = now;

function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
        var serverUrl = 'http://weixin.mlxing.com/oss/sign';
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};

function get_signature()
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3)
    {
        var body = send_request()
        var obj = eval ("(" + body + ")");
        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessid']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback']
        key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len) {
　　var len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    var  pos = filename.lastIndexOf('.')
    var suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{

        var suffix = get_suffix(filename)
        var date = new Date();

        var str = date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate()+'-';
        g_object_name = key +str+'newimg'+random_string(10) + suffix;


}

function set_upload_param(up, filename, ret)
{
    if (ret == false)
    {
        ret = get_signature()

    }

    g_object_name = key;
    if (filename != '') {
       var suffix = get_suffix(filename)
        calculate_object_name(filename)
    }

    var new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();


    return g_object_name;
}


import plupload from './lib/plupload.dev.js';

export default function(option,that,fn){
    var name;
    var size='10mb';
    var params={
        browse_button:'',
        max_file_size:size,//最大文件
        multi_selection:true,
        url : 'http://oss.aliyuncs.com',
        filters: {
            mime_types : [ //只允许上传图片和zip,rar文件
                { title : "Image files", extensions : "jpg,gif,png,bmp" },
            ],
            max_file_size : size, //最大只能上传10mb的文件
            prevent_duplicates : true //不允许选取重复文件
        },
        resize: {
            //width: 100,
            //height: 100,
            crop: false,
            quality: 90,//只对jpg有用
            preserve_headers: false
        },
        init:{
            PostInit:function(upload){

            },
            FilesAdded: function(up, files) {

                fn.call(that,files,up);

            },

            UploadProgress:function(uploader,file){//上传进度

            },
            BeforeUpload: function(uploader, file) {


               name =  set_upload_param(uploader, file.name, false);


            },
            FileUploaded:function(uploader,file,responseObject){//上传完成

                fn.call(that,'http://mlx.oss.mlxing.com/'+name,uploader);
            },
            Error:function(uploader,errObject){

                switch(errObject.code){
                    case -200:alert('网络错误');break;
                    case -400:alert('超过插件处理范围');break;
                    case -600:alert('文件过大,最大为'+size);break;
                    case -601:alert('非法的文件格式，图片格式支持jpg,gif,png,bmp');break;
                    case -700:alert('图片格式错误');break;
                    case -702:alert('超过软件处理的范围');break;
                    default:alert('错误代号'+errObject.code);
                }


            },
        }
    }
    var obj = $.extend({},params,option);
    var upload = new  plupload.Uploader(obj);
    upload.init();
  return  upload

}

///*********************************************************
///具体用法 components/card/send_moment_card.vue

// callback:function(filename){//回调

//     if(typeof filename == 'object'){
//         this.addImging(filename);
//     }else{
//         console.log('上传成功',filename);
//     }
// },
// addImging:function(files){//显示图片
//     //获取input输入的图片
//     var self = this;
//     var moxie = window.moxie;

//     for(var i=0;i<files.length;i++){
//         ;(function(file){
//             var preloader = new moxie.image.Image();
//             preloader.onload = function () {
//                 preloader.downsize(100, 100);//先压缩一下要预览的图片,宽300，高300
//                 var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80):preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
//                 self.pic.push(imgsrc);//显示的图片
//                 preloader.destroy();
//                 preloader = null;

//             };
//             preloader.load(file.getSource());
//         }(files[i]));
//     }
// },


// setTimeout(function(){//注册实例
//                 console.log($('#moment_fk_add')[0]);
//                 self.uploadObject =$upload({
//                     browse_button:$('#moment_fk_add')[0],
//                 },self,self.callback);
//             },0)
