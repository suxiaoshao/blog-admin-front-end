<template>
    <div id="bilibili_save" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="4"></my-navigation>
            </el-header>
            <el-main>
                <el-row v-loading="loading">
                    <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">

                        <!-- 原视频 -->
                        <div style="text-align: center;">
                            <el-tooltip :content="main_av.desc" placement="top" effect="light">
                                <a :href="'https://www.bilibili.com/video/av'+main_av.aid" target="_blank">
                                    <el-button>原视频 :{{main_av.title}}</el-button>
                                </a>
                            </el-tooltip>
                            <el-button style="margin-left: 10px" type="success" icon="el-icon-check" circle
                                       @click="post_success"></el-button>
                        </div>
                        <br><br>

                        <!-- 代查看视频 -->
                        <el-row :gutter="10">
                            <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:12}" :lg="{span:8}"
                                    v-for="(item,index) in recommended" :key="index">
                                <el-card :body-style="{ padding: '0px' }">

                                    <!-- 头部 -->
                                    <div style="padding: 14px;">
                                        标题:
                                        <el-link :href="'https://www.bilibili.com/video/av'+item.video.aid"
                                                 target="_blank"
                                                 class="button" type="primary" :underline="false">{{item.video.title}}
                                        </el-link>
                                        作者:
                                        <el-link :href="'https://space.bilibili.com/'+item.owner.mid" target="_blank"
                                                 class="button" type="primary" :underline="false">{{item.owner.name}}
                                        </el-link>
                                    </div>

                                    <!-- 图片 -->
                                    <el-tooltip effect="light" placement="bottom-start">

                                        <!-- 弹窗 -->
                                        <div slot="content">
                                            <div v-for="p in Math.ceil(item.video.desc.length/20)" :key="p">
                                                {{item.video.desc.slice((p-1)*20,p*20)}}
                                            </div>
                                        </div>

                                        <img alt :src="item.video.pic|chang_url" style="width: 100%"/>
                                    </el-tooltip>

                                    <!-- 功能区 -->
                                    <div style="padding: 14px;">
                                        <span style="float:left;" v-show="!item.save">未收藏</span>
                                        <span style="float:left;" v-show="item.save">已收藏</span>
                                        <span>{{index+1}}/{{recommended.length}}</span>

                                        <!-- 收藏按钮 -->
                                        <el-button type="danger" icon="el-icon-star-off" circle style="float:right;"
                                                   :disabled="item.save" @click="post_save(index)"
                                        ></el-button>
                                    </div>
                                </el-card>
                                <br>
                            </el-col>
                        </el-row>

                        <!-- 更新按钮 -->
                        <div style="text-align: center;">
                            <el-button type="success" icon="el-icon-check" circle @click="post_success"></el-button>
                        </div>
                        <br><br>
                    </el-col>
                </el-row>
                <record-show></record-show>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";
    import record_shows from "../components/record_shows";

    export default {
        name: "bilibili_save",
        components: {
            "my-navigation": navigation,
            "record-show": record_shows
        },
        data() {
            return {
                main_av: {
                    aid: '',
                    title: "空",
                    cid: '',
                    pic: '',
                    desc: ''
                },
                recommended: [],
                loading: false
            }
        },
        methods: {
            get_video() {
                this.loading = true;
                this.main_av = {};
                this.axios.get("http://localhost:8082/api/bilibili/video").then(response => {
                    if (response.data.success) {
                        this.main_av = response.data.data;
                        this.loading = false;
                        this.get_list()
                    } else {
                        this.loading = false;
                        this.$notify({
                            title: "警告",
                            message: "发生错误，请刷新试试",
                            duration: 0,
                            type: "warning"
                        });
                    }
                }).catch(error => {
                    this.loading = false;
                    this.$notify({
                        title: "警告",
                        message: "发生错误，请刷新试试",
                        duration: 0,
                        type: "warning"
                    });
                    console.log(error)
                })
            },
            get_list() {
                this.loading = true;
                this.recommended = [];
                this.axios.get("http://localhost:8082/api/bilibili/recommend/" + String(this.main_av.aid)).then(response => {
                    if (response.data.success) {
                        this.recommended = response.data.data;
                        this.loading = false;
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    } else {
                        this.loading = false;
                        this.$notify({
                            title: "警告",
                            message: "发生错误，请刷新试试",
                            duration: 0,
                            type: "warning"
                        });
                    }
                }).catch(error => {
                    this.loading = false;
                    this.$notify({
                        title: "警告",
                        message: "发生错误，请刷新试试",
                        duration: 0,
                        type: "warning"
                    });
                    console.log(error)
                })
            },
            post_save(index) {
                this.recommended[index].save = true;
                this.axios.post("http://localhost:8082/api/bilibili/save", this.recommended[index]).then(response => {
                    if (response.data.success) {
                        this.$notify({
                            title: "成功",
                            message: "收藏成功",
                            duration: 0,
                            type: "success"
                        });
                    } else {
                        this.recommended[index].save = false;
                        this.$notify({
                            title: "错误",
                            message: "刷新试试",
                            duration: 0,
                            type: "error"
                        });
                    }
                }).catch(error => {
                    this.recommended[index].save = false;
                    this.$notify({
                        title: "错误",
                        message: "刷新试试",
                        duration: 0,
                        type: "error"
                    });
                    console.log(error)
                })
            },
            post_success() {
                this.loading = true;
                let aid = this.main_av.aid;
                this.main_av = {};
                this.recommended = [];
                this.axios.post("http://localhost:8082/api/bilibili/success", {aid: aid}).then(response => {
                    if (response.data.success) {
                        this.get_video();
                        this.loading = false;
                        this.$notify({
                            title: "成功",
                            message: "更新成功",
                            duration: 0,
                            type: "success"
                        });
                    } else {
                        this.loading = false;
                        this.$notify({
                            title: "错误",
                            message: "刷新试试",
                            duration: 0,
                            type: "error"
                        });
                    }
                }).catch(error => {
                    this.$notify({
                        title: "错误",
                        message: "刷新试试",
                        duration: 0,
                        type: "error"
                    });
                    console.log(error)
                })
            }
        },
        created() {
            this.get_video()
        },
        filters: {
            chang_url(value) {
                let list = value.split("/");
                return "http://localhost:8082/img/bilibili/" + list[list.length - 1]
            }
        }
    }
</script>

<style scoped>

</style>