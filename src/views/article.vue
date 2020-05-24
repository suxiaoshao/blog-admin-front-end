<template>
    <div class="router" id="my-article">
        <el-container>
            <el-header>
                <my-header></my-header>
            </el-header>
            <el-main>
                <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
                    <el-card shadow="hover" v-loading="loading">
                        <div slot="header">
                            <div class="title">{{article_data.title}}
                            </div>
                            <div class="info">
                                <span><i
                                    class="el-icon-view el-icon--right"></i>{{" "+article_data.read_num+'次阅读'}}</span>
                                <span><i class="el-icon-time"></i>{{" "+article_data.time_str}}</span>
                                <span>
                                <svg class="icon"
                                     style="width: 1.087890625em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                                     viewBox="0 0 1114 1024" xmlns="http://www.w3.org/2000/svg"><path
                                    d="M740.04071 998.039745c-39.245839 0-71.176063-31.878035-71.176063-71.062476L668.864648 650.309042c0-39.217187 31.930223-71.122851 71.176063-71.122851L1016.656749 579.186192c39.184441 0 71.062476 31.904641 71.062476 71.122851l0 276.667204c0 39.184441-31.878035 71.062476-71.062476 71.062476L740.04071 998.038722zM774.630506 642.561591c-23.344684 0-42.337247 18.99154-42.337247 42.336224L732.293259 892.387473c0 23.344684 18.993586 42.337247 42.337247 42.337247l207.436446 0c23.344684 0 42.337247-18.993586 42.337247-42.337247L1024.4042 684.896792c0-23.344684-18.993586-42.336224-42.337247-42.336224L774.630506 642.560568zM740.04071 444.815855c-39.245839 0-71.176063-31.904641-71.176063-71.121827L668.864648 97.022731c0-39.184441 31.930223-71.062476 71.176063-71.062476L1016.656749 25.960255c39.184441 0 71.062476 31.878035 71.062476 71.062476l0 276.671297c0 39.217187-31.878035 71.121827-71.062476 71.121827L740.04071 444.815855zM774.630506 89.328491c-23.344684 0-42.337247 18.995633-42.337247 42.345434l0 207.369931c0 23.349801 18.993586 42.345434 42.337247 42.345434l207.436446 0c23.344684 0 42.337247-18.995633 42.337247-42.345434L1024.4042 131.673925c0-23.349801-18.993586-42.345434-42.337247-42.345434L774.630506 89.328491zM186.642858 998.039745c-39.184441 0-71.062476-31.878035-71.062476-71.062476L115.580382 650.309042c0-39.217187 31.878035-71.122851 71.062476-71.122851l276.616038 0c39.213094 0 71.114664 31.904641 71.114664 71.122851l0 276.667204c0 39.184441-31.901571 71.062476-71.114664 71.062476L186.642858 998.038722zM221.292006 642.561591c-23.349801 0-42.345434 18.99154-42.345434 42.336224L178.946572 892.387473c0 23.344684 18.995633 42.337247 42.345434 42.337247l207.430306 0c23.345708 0 42.337247-18.993586 42.337247-42.339294l-0.052189-207.488635c0-23.344684-18.995633-42.336224-42.345434-42.336224L221.292006 642.560568zM186.642858 444.815855c-39.184441 0-71.062476-31.904641-71.062476-71.121827L115.580382 97.022731c0-39.184441 31.878035-71.062476 71.062476-71.062476l276.616038 0c39.213094 0 71.114664 31.878035 71.114664 71.062476l0 276.671297c0 39.217187-31.901571 71.121827-71.114664 71.121827L186.642858 444.815855zM221.292006 89.328491c-23.349801 0-42.345434 18.995633-42.345434 42.345434l0 207.369931c0 23.349801 18.995633 42.345434 42.345434 42.345434l207.430306 0c23.345708 0 42.337247-18.99768 42.337247-42.34748l-0.052189-207.366861c0-23.349801-18.995633-42.345434-42.345434-42.345434L221.292006 89.329515zM-6.0e-06 47.371914"/>
                                </svg>{{" "+article_type[article_data.type]}}</span>
                            </div>
                        </div>
                        <my-show class="my-show" :initialValue="article_data.content" theme="dark"></my-show>
                    </el-card>
                </el-col>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {MarkdownPreview} from "vue-meditor"
    import navigation from "../components/navigation";

    export default {
        name: "my-article",
        data() {
            return {
                article_data: {
                    title: "",
                    read_num: 0,
                    time_str: "",
                    content: '',
                    type: -1
                },
                article_type: ['学习', '代码', '其他', '工具'],
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true
                this.axios.get("http://localhost:8082/api/blog/article", {params: {aid: this.aid}})
                    .then(response => {
                        if (response.data.success) {
                            this.loading = false
                            this.article_data = response.data.data
                        } else {
                            this.loading = false
                            this.$message({
                                message: "获取文章信息失败",
                                type: "error",
                                duration: 2000
                            })
                        }
                    })
            }
        },
        components: {
            "my-show": MarkdownPreview,
            "my-header": navigation
        },
        computed: {
            aid() {
                return this.$route.query.aid
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="scss">
    .el-card {
        background-color: rgba(255, 255, 255, 0.7);

        .title {
            text-align: center;
            font-size: 1.5rem;
            margin: 20px auto;
        }

        .info {
            text-align: center;

            span {
                margin-right: 10px;
                color: #606266;
            }
        }

        .my-show {
            background-color: transparent;

            .markdown-preview {
                background-color: rgba(255, 255, 255, 0.2)
            }
        }
    }
</style>
