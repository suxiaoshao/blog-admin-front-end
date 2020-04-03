<template>
    <div class="Navigation" @mouseenter="enter" @mouseleave="leave">
        <!-- 电脑的导航栏 -->
        <el-menu
                v-if="!is_phone"
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="select"
                :style="style[style_index]"
        >
            <!-- 普通信息框 -->
            <el-menu-item
                    v-for="(item,index) in navigation_item"
                    :key="index"
                    :index="String(index)"
            >{{item.name}}
            </el-menu-item>
        </el-menu>

        <!-- 手机的导航栏 -->
        <el-menu
                v-if="is_phone"
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="select"
                :style="style[style_index]"
        >
            <!-- 普通信息框 -->
            <el-submenu :index="String(navigation_item.length+1)">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                </template>
                <el-menu-item
                        v-for="(item,index) in navigation_item"
                        :key="index"
                        :index="String(index)"
                >{{item.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "Navigation",
        data() {
            return {
                style: [
                    "background-color:rgba(255,255,255,0.9)", // 鼠标移入
                    "background-color:rgba(255,255,255,0.6)" // 鼠标移出
                ], // 导航栏样式
                style_index: 1, // 导航栏样式的数组下标
                navigation_item: [
                    {
                        name: "首页",
                        path: {name: "Home"}
                    },
                    {
                        name: "图片",
                        path: {name: "jpg"}
                    },
                    {
                        name: "壁纸",
                        path: {name: "wallpaper"}
                    },
                    {
                        name: "bilibili展示",
                        path: {name: "bilibili_show", params: {page: 1}}
                    },
                    {
                        name: "bilibili操作",
                        path: {name: "bilibili_save"}
                    }
                ], // 导航内容数组
                search_name: "" // 输入的搜索关键词
            };
        },
        props: {
            activeIndex: String //导航栏参数,用来隐藏和标记
        },
        methods: {
            // 点击菜单
            select(index) {
                let real_index = Number(index);
                if (this.navigation_item.length > real_index) {
                    this.$router.push(this.navigation_item[real_index].path);
                }
            },
            // 鼠标离开
            leave() {
                this.style_index = 1;
            },
            // 鼠标进来
            enter() {
                this.style_index = 0;
            }
        },
        computed: {
            // 判断是否是手机
            is_phone() {
                return document.documentElement.clientWidth <= 750;
            }
        }
    };
</script>
<style scoped>
    .Navigation {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
    }
</style>