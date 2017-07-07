define(function(require, exports, module) {
   
    var cookie = function(name, value, options) {
        if (typeof value != "undefined") {
            // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = "";
                options.expires = -1;
            }
            var expires = "";
            if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == "number") {
                    date = new Date();
                    date.setTime(date.getTime() + options.expires);
                } else {
                    date = options.expires;
                }
                expires = "; expires=" + date.toUTCString();
            }
            var path = options.path ? "; path=" + options.path : "";
            var domain = options.domain ? "; domain=" + options.domain : "";
            var secure = options.secure ? "; secure" : "";
            document.cookie = [ name, "=", encodeURIComponent(value), expires, path, domain, secure ].join("");
        } else {
            // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != "") {
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = trim(cookies[i]);


                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == name + "=") {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
    //删除cookie
    cookie.remove = function(key) {
        cookie(key, 0, {
            expires: -1
        });
    };
    function trim(res){
        return res.replace(/(^\s*)|(\s*$)/g, '');
    }
    module.exports = cookie;
});