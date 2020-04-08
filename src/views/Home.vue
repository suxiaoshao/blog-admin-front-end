<template>
    <div id="Home" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="0"></my-navigation>
            </el-header>
            <el-main>
            </el-main>
            <el-footer>
                <record-show></record-show>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Navigation from "../components/navigation";
    import record_shows from "../components/record_shows";

    export default {
        name: 'Home',
        components: {
            "my-navigation": Navigation,
            "record-show":record_shows
        }
    }
</script>
