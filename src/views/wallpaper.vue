<template>
    <div id="wallpaper" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="2"></my-navigation>
            </el-header>
            <el-main>
                <el-row v-loading="loading">
                    <el-col :xs="{span:22,offset:1}" :sm="{span:14,offset:5}" :md="{span:10,offset:7}">
                        <el-card class="box-card">
                            <div slot="header">
                                <el-link :href="url" :underline="false" target="_blank">图片链接</el-link>
                            </div>
                            <img class="image" :src="real_url" alt="  " style="width: 100%;display: block;"/>
                            <br/>
                            <el-button style="float: left" type="success" icon="el-icon-folder-checked"
                                       @click="post_wallpaper(true)">保留
                            </el-button>
                            <el-button style="float: right" type="danger" icon="el-icon-folder-delete"
                                       @click="post_wallpaper(false)">删除
                            </el-button>
                            <br/>
                            <br/>
                        </el-card>
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
        name: "wallpaper",
        components: {
            "my-navigation": navigation,
            "record-show": record_shows
        },
        data() {
            return {
                url: "",
                loading: false,
                real_url: ''
            }
        },
        methods: {
            get_base() {
                this.loading = true;
                this.url = '';
                this.real_url = '';
                this.axios.get("http://localhost:8082/api/wallpaper/base").then(response => {
                    if (response.data.success) {
                        this.url = response.data.data;
                        let url_list = this.url.split("/");
                        this.real_url =
                            "http://localhost:8082/img/wallpaper/" + url_list[url_list.length - 2] + "===" + url_list[url_list.length - 1];
                        this.loading = false
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
            post_wallpaper(ok) {
                this.loading = true;
                this.axios.post("http://localhost:8082/api/wallpaper/base", {
                    ok: ok,
                    url: this.url
                }).then(response => {
                    if (response.data.success) {
                        this.loading = false;
                        this.$notify({
                            title: "提示",
                            message: "操作成功",
                            type: "success"
                        });
                        this.get_base()
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
            }
        },
        created() {
            this.get_base()
        }
    }
</script>

<style scoped lang="scss">

</style>
