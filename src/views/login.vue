<template>
    <div id="login" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="7"></my-navigation>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" :md="{span:8,offset:8 }">
                        <el-card :body-style="{ padding: '0px' }" style="background-color:rgba(255,255,255,0.7)">
                            <br/>
                            <el-row>
                                <el-col :span="20" :offset="2">
                                    <el-input placeholder="请输入账号" v-model="user"></el-input>
                                    <br/>
                                    <br/>
                                </el-col>
                                <el-col :span="20" :offset="2">
                                    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                                    <br/>
                                    <br/>
                                </el-col>
                                <el-col :offset="2">
                                    <el-button type="primary" @click="onSubmit">登录</el-button>
                                    <br/>
                                    <br/>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import navigation from "../components/navigation";
    import {string_to_md5_3} from "../util/encryption";

    export default {
        name: "login",
        components: {
            "my-navigation": navigation
        },
        data(){
            return{
                user:'',
                password:''
            }
        },
        methods:{
            onSubmit() {
                let real_user = string_to_md5_3(this.user);
                let real_password = string_to_md5_3(this.password);
                this.axios
                    .post("http://localhost:8082/api/login", {
                        user: real_user,
                        password: real_password
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.$router.push({ name: "Home" });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
