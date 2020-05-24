<template>
    <div id="edit" class="router">
        <el-container>
            <el-header>
                <my-header active-index="5"></my-header>
            </el-header>
            <el-main>

                <!-- 配置区 -->
                <el-row>
                    <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
                        <el-form :inline="true">
                            <!-- 标题选择 -->
                            <el-form-item>
                                <el-input placeholder="标题" v-model="title"></el-input>
                            </el-form-item>
                            <!-- 文章类型选择 -->
                            <el-form-item>
                                <el-select v-model="type" placeholder="文章类型">
                                    <el-option v-for="(item,index) in options" :key="index" :label="item"
                                               :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- 文章上传 -->
                            <el-form-item>
                                <el-button @click="post_content" :disabled="!post_allow">
                                    上传
                                    <i class="el-icon-upload el-icon--right"></i>
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 编辑区 -->
                <Mark v-model="content" v-loading="loading"></Mark>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "edit",
        data() {
            return {
                content: "",
                type: "",
                title: "",
                loading: false,
                options: ['学习', '代码', '其他', '工具']
            }
        },
        methods: {
            getArticle() {
                if (this.aid !== false) {
                    this.loading = true
                    this.axios.get("http://localhost:8082/api/blog/article", {
                        params: {
                            aid: this.aid
                        }
                    }).then(response => {
                        if (response.data.success) {
                            const data = response.data.data
                            this.content = data.content
                            this.title = data.title
                            this.type = data.type
                            this.loading = false
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
            post_content() {
                let data
                if (this.aid === false) {
                    data = {
                        content: this.content,
                        title: this.title,
                        type: this.type,
                        aid: -1
                    }
                } else {
                    data = {
                        content: this.content,
                        title: this.title,
                        type: this.type,
                        aid: Number(this.aid)
                    }
                }
                this.loading = true
                this.axios.post("http://localhost:8082/api/blog/upload", data).then(response => {
                    if (response.data.success) {
                        this.loading = false
                        this.$router.push({name: "article", query: {aid: response.data.aid}})
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
            "my-header": navigation,
            Mark: () => import("vue-meditor")
        },
        computed: {
            aid() {
                if (this.$route.query.aid !== undefined) {
                    return this.$route.query.aid
                } else {
                    return false
                }
            },
            post_allow() {
                return this.type !== -1 && this.content !== "" && this.title !== "";
            }
        },
        mounted() {
            this.getArticle()
        }
    }
</script>

<style lang="scss">
    .myMark, .markdown-content, .markdown {
        background-color: transparent !important;
    }

    .markdown-preview {
        background-color: rgba(255, 255, 255, 0.7) !important;

        div {
            background-color: transparent !important;
        }
    }
</style>
