<template>
    <div class="jpg router">
        <el-container>
            <el-header>
                <my-navigation active-index="1"></my-navigation>
            </el-header>

            <el-main>
                <el-row v-loading="loading">
                    <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">

                        <!-- 图片区 -->
                        <el-row :gutter="10">
                            <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:12}" :lg="{span:8}"
                                    v-for="(item,index) in real_list" :key="(index)">
                                <el-card :body-style="{ padding: '0px' }">
                                    <img alt="" :src="`http://localhost:8082/img/jpg/${item.src}`"
                                         style="width: 100%;display: block;"/>
                                    <div style="padding: 14px;">
                                        <el-link :href="item.url" :underline="false" target="_blank" type="primary"
                                                 v-if="item.url!==null"
                                        >{{item.tag}}
                                        </el-link>
                                    </div>
                                </el-card>
                                <br>
                            </el-col>
                        </el-row>

                        <!-- 分页栏 -->

                        <div style="text-align: center;">
                            <!-- 桌面端分页 -->
                            <div v-show="!_isMobile">
                                <br><br>
                                <el-pagination :hide-on-single-page="true" @current-change="page_change"
                                               :current-page.sync="page" :page-size="view_num"
                                               layout="prev, pager, next, jumper" :total="jpg_num"></el-pagination>
                            </div>
                            <div v-show="_isMobile">
                                <!--                        <br>-->
                                <el-pagination :hide-on-single-page="true" :pager-count="5" small
                                               @current-change="page_change" :current-page.sync="page"
                                               :page-size="view_num" layout="prev, pager, next, jumper"
                                               :total="jpg_num"></el-pagination>
                            </div>
                        </div>
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
        name: "jpg",
        components: {
            "my-navigation": navigation,
            "record-show": record_shows
        },
        data() {
            return {
                jpg_num: 0,//图片总数
                view_num: 20,//每页显示数量
                page: 1,//页码
                real_list: [],// 内容列表
                loading: false//是否loading
            }
        },
        methods: {
            //获得基础信息
            get_base() {
                this.loading = true;
                this.axios.get("http://localhost:8082/api/jpg/base").then(response => {
                    //成功返回
                    if (response.data.success) {
                        this.loading = false;
                        this.jpg_num = response.data.count;
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
            //获取图片列表
            get_list() {
                this.loading = true;
                this.real_list = [];// 图片列表清空
                this.axios.post("http://localhost:8082/api/jpg/list", {
                    offset: (this.page - 1) * this.view_num,
                    limit: this.view_num
                }).then(response => {
                    //成功返回
                    if (response.data.success) {
                        this.loading = false;
                        this.real_list = response.data.data;
                        this.jpg_num = response.data.count;
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
            //翻页
            page_change() {
                this.get_list();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        created() {
            this.get_base()
        },
        computed: {
            _isMobile() {
                return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
