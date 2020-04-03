<template>
    <div id="bilibili_show">
        <br><br><br>
        <el-row v-loading="loading">
            <el-col :xs="{span:24,offset:0}" :sm="{span:20,offset:2}" :md="{span:18,offset:3}">

                <!-- 展示区 -->
                <el-row :gutter="10">
                    <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:12}" :lg="{span:8}"
                            v-for="(item,index) in data_list" :key="index">
                        <el-card :body-style="{ padding: '0px' }">
                            <p>
                                <el-link :href="`https://www.bilibili.com/video/av${item.aid}`" target="_blank"
                                         type="primary" :underline="false">
                                    {{item.title}}
                                </el-link>
                            </p>
                            <img alt="图片" :src="item.pic|chang_url" style="width: 100%;display: block;"/>
                        </el-card>
                        <br>
                    </el-col>
                </el-row>

                <!-- 分页 -->
                <div style="text-align: center;">
                    <el-pagination
                            :hide-on-single-page="true"
                            :pager-count="5"
                            @current-change="page_change"
                            :current-page.sync="real_page"
                            :page-size="limit"
                            layout="prev, pager, next, jumper"
                            :total="num"
                    ></el-pagination>
                </div>
            </el-col>
        </el-row>
        <my_navigation active-index="3"></my_navigation>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "bilibili_show",
        components: {
            "my_navigation": navigation
        },
        computed: {
            page() {
                return Number(this.$route.params.page)
            }
        },
        data() {
            return {
                num: 0,
                loading: false,
                data_list: [{
                    aid: '',
                    cid: '',
                    title: '',
                    pic: ''
                }],
                limit: 20,
                real_page: Number(this.$route.params.page)
            }
        },
        methods: {
            get_num() {
                this.num = 0;
                this.loading = true;
                this.axios.get("http://192.168.0.103:8082/api/bilibili/num").then(response => {
                    if (response.data.success) {
                        this.loading = false;
                        this.num = response.data.count;
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
                this.data_list = [];
                this.loading = true;
                this.axios.post("http://192.168.0.103:8082/api/bilibili/show", {
                    offset: this.page * this.limit,
                    limit: this.limit
                }).then(response => {
                    if (response.data.success) {
                        this.loading = false;
                        this.data_list = response.data.data;
                        this.num = response.data.count;
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
            page_change(value) {
                this.$router.push({name: "bilibili_show", params: {page: value}})
            }
        },
        created() {
            this.get_num()
        },
        filters: {
            chang_url(value) {
                let list = value.split("/");
                return "http://192.168.0.103:8082/img/bilibili/" + list[list.length - 1]
            }
        },
        watch: {
            page() {
                this.get_list()
            }
        }
    }
</script>

<style scoped>

</style>