<template>
    <q-layout>
        <div slot="header" class="toolbar header-color">
            <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
                <i>menu</i>
            </button>

            <q-toolbar-title :padding="1">
                <span class="logo-text">{{appName}}</span>
            </q-toolbar-title>
            <button @click="logOut">
                    <span class="nav-item-text">{{userName}}</span>
                    <i>exit_to_app</i>
                </button>
        </div>
        <q-drawer ref="drawer">
            <div class="toolbar drawer-color">
                <q-toolbar-title>
                    Dashboard
                </q-toolbar-title>
            </div>
            <div class="list no-border platform-delimiter">
                <q-drawer-link icon="home" to="/">首页</q-drawer-link>
                <q-drawer-link icon="dns" to="/dns">DNS</q-drawer-link>
                <q-drawer-link icon="library_books" to="/git">GitRepo</q-drawer-link>
            </div>
        </q-drawer>

        <router-view class="layout-view"></router-view>
    </q-layout>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import config from '../config'
    export default {
        data() {
            return {
              appName: config.appName
            }
        },
        computed: {
            ...mapGetters(['userName'])
        },
        methods: {
            logOut: function () {
                this.$store.dispatch('setUserToken', '')
            }
        }
    }

</script>

<style>
    .logo-text {
        font-size: 25px;
    }

    .nav-item-text {
        font-size: 16px;
        vertical-align: middle;
    }

    .item.active,
    .item.router-link-active,
    .item:focus,
    .q-collapsible.router-link-active>.item {
        color: #20a0ff;
    }

    .router-link-active>.item-primary {
        color: #20a0ff;
    }

    .item.active,
    .item.router-link-active,
    .item:focus,
    .q-collapsible.router-link-active>.item {
        background: rgba(255, 255, 255, 0.5);
    }

    .drawer-content {
        background-color: #eef1f6;
    }

    .drawer-color {
        background-color: transparent;
        color: #97a8be;
    }

    .header-color {
        background-color: #324157;
    }

</style>
