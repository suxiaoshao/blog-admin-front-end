<template>
    <div id="blog_list" class="router">
        <el-container>
            <el-header>
                <my-header active-index="6"></my-header>
            </el-header>
            <el-main>
                <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
                    <el-card v-loading="loading">
                        <el-table :data="article_list" style="width: 100%" border>

                            <el-table-column label="标题">
                                <template slot-scope="tableData">
                                    <el-link :underline="false" @click="goToRead(tableData.row.aid)">
                                        {{tableData.row.title}}
                                    </el-link>
                                </template>

                            </el-table-column>
                            <el-table-column prop="read_num" label="阅读数" width="80" align="center"></el-table-column>
                            <el-table-column prop="reply_num" label="评论数" width="80" align="center"></el-table-column>
                            <el-table-column prop="type" label="类型" align="center" width="80"></el-table-column>
                            <el-table-column prop="time_str" label="日期" align="center"></el-table-column>

                            <el-table-column label="操作" align="center" width="80">
                                <template slot-scope="tableData">
                                    <el-link :underline="false" type="primary" @click="goToEdit(tableData.row.aid)">编辑
                                    </el-link>
                                </template>
                            </el-table-column>

                        </el-table>
                        <el-pagination :hide-on-single-page="true" @current-change="page_change"
                                       :current-page.sync="page" :page-size="limit" layout="prev, pager, next, jumper"
                                       :total="num"></el-pagination>
                    </el-card>
                </el-col>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "blog_list",
        components: {
            "my-header": navigation
        },
        data() {
            return {
                article_list: [],
                num: 0,
                limit: 20,
                page: 1,
                loading: false
            }
        },
        mounted() {
            this.getNum()
        },
        methods: {
            getNum() {
                this.loading = true
                this.axios.get("http://localhost:8082/api/blog/num").then(response => {
                    if (response.data.success) {
                        this.num = response.data.num
                        this.loading = false
                        this.getList()
                    } else {
                        this.loading = false
                        this.$message({
                            message: "获取总文章数失败",
                            type: "error",
                            duration: 2000
                        })
                    }
                })
            },
            getList() {
                this.loading = true
                this.axios.get("http://localhost:8082/api/blog/list", {
                    params: {
                        limit: this.limit,
                        offset: (this.page - 1) * this.limit
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.article_list = response.data.data
                        this.loading = false
                    } else {
                        this.loading = false
                        this.$message({
                            message: "获取文章列表失败",
                            type: "error",
                            duration: 2000
                        })
                    }
                })
            },
            goToEdit(aid) {
                this.$router.push({name: "edit", query: {"aid": aid}})
            },
            page_change() {
                this.getNum()
            },
            goToRead(aid) {
                this.$router.push({name: "article", query: {aid: aid}})
            }
        }
    }
</script>

<style lang="scss">
    .el-card {
        background-color: rgba(255, 255, 255, 0.8);

        .el-table {
            background-color: rgba(255, 255, 255, 0.3) !important;

            tr {
                background-color: transparent !important;
            }

            th {
                background-color: transparent !important;
            }
        }

        .el-pagination {
            text-align: center;

            button {
                background-color: transparent;
            }

            .number {
                background-color: transparent;
            }

            input[type=number] {
                background-color: rgba(255, 255, 255, 0.5);
            }
        }
    }

    .el-link--primary {
        color: rgb(36, 116, 181) !important;
    }
</style>
