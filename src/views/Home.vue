<template>
    <div class="Home">
        <br><br><br>
        <my-navigation active-index="0"></my-navigation>
    </div>
</template>

<script>
    import Navigation from "../components/navigation";

    export default {
        name: 'Home',
        components: {
            "my-navigation": Navigation
        }
    }
</script>
