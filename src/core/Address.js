define(function(require, exports, module){

var Address = function(option){   
    var o = option || {};
    this.Province = this.getById(o.cmbProvince); 
    this.City = this.getById(o.cmbCity); 
    this.Area = this.getById(o.cmbArea); 
    this.init(o.defaultProvince,o.defaultCity,o.defaultArea,o.dataArr);  
}
Address.prototype = {
    getById : function(o){
        return document.getElementById(o)
    },
    cmbSelect : function (cmb, str) 
    { 
        for(var i=0; i<cmb.options.length; i++) 
        { 
            if(cmb.options[i].value == str) 
            { 
                //console.log(cmb.options[i].value);
                cmb.selectedIndex = i; 
                return 
            } 
        } 
    },
    cmbAddOption : function (cmb, str, obj) 
    { 
        var option = document.createElement("OPTION");
        cmb.options.add(option); 
        option.innerHTML = str; 
        option.value = str; 
        option.obj = obj; 
        
    },
    changeProvince : function (defaultCity,defaultArea) 
    {   /*console.log(this.City);*/
        var self = this;
        this.City.options.length = 0; 
        this.City.onchange = null; 
        if(this.Province.selectedIndex == -1)return; 
        var item = this.Province.options[this.Province.selectedIndex].obj; 
        //console.log(item.name);
        for(var i=0; i<item.cityList.length; i++) 
        { 
            this.cmbAddOption(this.City, item.cityList[i].name, item.cityList[i]); 
        } 
        //console.log(defaultCity);
        this.cmbSelect(this.City,defaultCity); 
        this.changeCity(defaultArea); 
        this.City.onchange = function(){
            self.changeCity(defaultArea);
        } 
    },
    changeCity : function(defaultArea) 
    { 
        this.Area.options.length = 0; 
        if(this.City.selectedIndex == -1)return; 
        var item = this.City.options[this.City.selectedIndex].obj; 
        //console.log(item.name);
        for(var i=0; i<item.areaList.length; i++) 
        { 
            this.cmbAddOption(this.Area, item.areaList[i], null); 
        } 
        this.cmbSelect(this.Area, defaultArea); 
    }, 
    init : function(Prov,city,area,arr){
        var self = this;
        for(var i=0; i<arr.length; i++) 
        { 
            this.cmbAddOption(this.Province, arr[i].name, arr[i]);   
        }    
        this.cmbSelect(this.Province,Prov); 
        this.changeProvince(city,area); 
        this.Province.onchange = function(){
            self.changeProvince(city,area);
        }
    }
}
module.exports = Address;

})
