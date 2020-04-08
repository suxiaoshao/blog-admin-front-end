<template>
    <div id="record_show">
        <el-row>
            <div class="footer" style="background-color:rgba(255,255,255, 0.7)">
                <p id="footer-info">
                    ©
                    <span>2020-2020</span>
                    <span>
            <a class="record" href="http://beian.miit.gov.cn" target="_blank">• 闽ICP备20003624号</a>
          </span>
                </p>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "record_shows"
    }
</script>

<style scoped>
    #footer-info {
        color: #444;
        font-family: BlinkMacSystemFont, "Microsoft YaHei", "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        text-align: center;
        font-size: 11px;
        margin: 5px 0;
        line-height: 16px;
        padding: 0;
        word-break: break-word;
    }

    .footer {
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%, 0);
        width: fit-content;
        width: -moz-fit-content;
    }

    .record {
        text-align: center;
        font-size: 11px;
        line-height: 16px;
        word-break: break-word;
        background-color: transparent;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        transition: all 0.24s ease;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.7);
        font-family: Consolas, Menlo, Monaco, "lucida console", "Liberation Mono",
        "Courier New", "andale mono", monospaceX, monospace, sans-serif;
    }
</style>