Vue.config.debug = true;
Vue.use(VueTouch);

var Index = Vue.extend({
    data: function(){
        var imgs = ['images/test1.jpg','images/test2.jpg','images/test3.jpg','images/test4.jpg','images/test5.jpg','images/test6.jpg','images/test7.jpg','images/test8.jpg','images/test9.jpg','images/test10.jpg','images/test11.jpg','images/test12.jpg'];
        var cc = Math.round(Math.random() * imgs.length-1);
        return {
            Index: {
                bgimg: imgs[cc],
                siteInfo: {
                    sitename: '吃货-今天吃什么?'
                }
            }
        }
    },
    template: '<div class="mui-bar mui-bar-nav"><h1 class="mui-title">{{ Index.siteInfo.sitename }}</h1></div>'+
    '<div class="mui-content index-page" style="background-image: url({{ Index.bgimg }})">'+
    '<div class="button-box">'+
    '<button v-link="{ path: \'/list\' }" class="mui-btn go-button">马上选出吃什么！</button>'+
    '<span>选择困难症患者福音</span>'+
    '</div>'+
    '</div>'
})

var List = Vue.extend({
    data: function(){
        var lists = [];
        var listState = false;
        if(localStorage.lists){
            if(JSON.parse(localStorage.lists).length != 0){
                lists = JSON.parse(localStorage.lists);
                listState = true;
            }
        }
        return {
            siteInfo: {
                sitename: "去吃点什么？"
            },
            lists: lists,
            showDelModal: false,
            showAddModal: false,
            listState: listState,
            itemname: '',
            tmpid: ''
        }
    },
    methods: {
        goBack: function(){
            history.go(-1);
        },
        add: function(){
            this.showAddModal = false;
            var imgs = ['images/test1.jpg','images/test2.jpg','images/test3.jpg','images/test4.jpg','images/test5.jpg','images/test6.jpg','images/test7.jpg','images/test8.jpg','images/test9.jpg','images/test10.jpg','images/test11.jpg','images/test12.jpg'];
            var cc = Math.round(Math.random() * imgs.length-1);

            if(this.itemname != ''){
                this.lists.push({
                    'id': this.lists.length+1,
                    'title': this.itemname,
                    'img': imgs[cc],
                    'color':'rgba(173, 171, 163, 0.7)'
                });
                this.itemname = '';
                this.listState = true;
            }
        },
        openDelIt: function(id){
            this.tmpid = id;
            this.showAddModal = true;
            this.showDelModal = true;
        },
        Cancel: function(){
            this.showAddModal = false;
            this.showDelModal = false;
        },
        delIt: function(id){
            for(var i=0; i<this.lists.length; i++){
                if(this.lists[i].id == id){
                    this.lists.splice(i,1);
                }
            }
            if(this.lists.length == 0){
                this.listState =false;
            }
            this.showAddModal = false;
            this.showDelModal = false;
        },
        goAsi: function(){
            localStorage.lists = JSON.stringify(this.lists);
            router.go('/asi');
        }
    },
    template: '<div class="header mui-bar mui-bar-nav">' +
    '<a class="mui-icon mui-icon-left-nav mui-pull-left" v-touch:tap="goBack()"></a>' +
    '<button v-touch:tap="goAsi" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right">' +
    '<span class="mui-icon mui-icon-checkmarkempty"></span>' +
    '</button>' +
    '<h1 id="title" class="mui-title">{{ siteInfo.sitename }}</h1>' +
    '</div>' +

    '<div v-if="showAddModal" class="modal-mask" v-transition="modal">'+
    '<div class="modal-wrapper">'+
    '<div v-if="!showDelModal" class="modal-container">'+
    '<div class="modal-header">'+
    '添加'+
    '</div>'+
    '<div class="modal-body">'+
    '<input class="doned-input" v-model="itemname">'+
    '<button class="doned-btn" v-touch:tap="add"> Done </button>'+
    '</div>'+
    '</div>'+
    '<div v-if="showDelModal" class="modal-container">'+
    '<div class="modal-header">'+
    '要删除这个吗？'+
    '</div>'+
    '<div class="modal-body">'+
    '<button class="cancel-btn" v-touch:tap="Cancel"> Cancel </button>'+
    '<button class="doned-btn" v-touch:tap="delIt(tmpid)"> Del </button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+

    '<div class="mui-content">'+
    '<div class="eating-box">' +
    '<ul>' +
    '<li class="eating-card eating-null" v-if="!listState" v-touch:tap="showAddModal = true">' +
    '<div class="eating-card-title" ><span>添加你的选择</span></div>' +
    '</li>' +
    '<li v-touch:tap="openDelIt(item.id)" v-for="item in lists" class="eating-card" style="background-image: url({{item.img}});">' +
    '<div style="background-color: {{ item.color }}" class="eating-card-title"><span>{{ item.title }}</span></div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="add-box" v-touch:tap="showAddModal = true"><span>＋</span></div>' +
    '</div>'
})

var ASI = Vue.extend({
    data: function(){
        return {
            item: {
                'title': '三食堂',
                'img': 'images/test3.jpg',
                'color': 'rgba(173, 171, 163, 0.7)'
            },
            lists: {},
            siteInfo: {
                sitename: '吃点什么？'
            },
            loading: true
        }
    },
    methods: {
        goBack: function() {
            history.go(-1);
        },
        reAsi: function() {
            var lists = JSON.parse(localStorage.lists);
            var cc = Math.round(Math.random() * (lists.length-1));
            this.item = lists[cc];
        }
    },
    ready: function(){
        var _this = this;
        setTimeout(function(){
            if(JSON.parse(localStorage.lists).length != 0){
                _this.reAsi();
            }
            _this.loading = false;
        }, 1000)
    },
    template: '<header class="header mui-bar mui-bar-nav">'+
    '<a class="mui-icon mui-icon-left-nav mui-pull-left" v-touch:tap="goBack"></a>'+
    '<h1 id="title" class="mui-title">{{ siteInfo.sitename }}</h1>'+
    '</header>'+

    '<div class="mui-content asi-page">'+
    '<div v-if="loading" class="loading">'+
    '<div class="spinner">'+
    '<div class="double-bounce1"></div>'+
    '<div class="double-bounce2"></div>'+
    '</div>'+
    '<span>给我一点时间...</span>'+
    '</div>'+
    '<div v-if="!loading" class="asi-box">'+
    '<div class="asi-card" style="background-image: url({{ item.img }})">'+
    '<div class="asi-card-title" style="background-color:{{item.color}}"><span>{{item.title}}</span></div>'+
    '</div>'+
    '<div class="re-asi-btn" v-touch:tap="reAsi"><span>不对不对，再选一次！</span></div>'+
    '</div>'+
    '</div>'
})

//路由配置
var App = Vue.extend({})
var router = new VueRouter();
router.map({
    '/': {
        component: Index
    },
    '/list': {
        component: List
    },
    '/asi': {
        component: ASI
    }
})
router.start(App, '#app');
