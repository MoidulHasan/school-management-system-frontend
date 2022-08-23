<template>
    <div v-if="sidebarMenu" :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="sidebarMenu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <!-- <router-view /> -->
            </div>
            <AppFooter />
        </div>


        <!-- <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" /> -->
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
    </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
// import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import { useUserStore } from './stores/user.store';
import { useRouter } from 'vue-router';
// import UserService from './service/UserService';


export default {
    emits: ['change-theme'],
    setup() {
        const UserData = useUserStore();
        const router = useRouter()


        return { UserData, router }
    },
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu: {
                admin: [
                    {
                        label: 'Home',
                        items: [{
                            label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
                        }]
                    },
                    {
                        label: 'Others', icon: 'pi pi-fw pi-sitemap',
                        items: [
                            {
                                label: 'Attendence', icon: 'pi pi-fw pi-book',
                                items: [
                                    { label: "Students Attendence", icon: '' },
                                    { label: "Teachers Attendence", icon: '' },
                                ]
                            },
                            {
                                label: 'Users', icon: 'pi pi-fw pi-users',
                                items: [
                                    { label: "Admin", icon: '' },
                                    { label: "Teachers", icon: '' },
                                    { label: "Accountant", icon: '' },
                                    { label: "Students", icon: '' }
                                ]
                            },
                            {
                                label: 'Academics', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: "Class", icon: '' },
                                    { label: "Subjects", icon: '' },
                                    { label: "Class Room", icon: '' },
                                    { label: "Class Routine", icon: '' }
                                ]
                            },
                            {
                                label: 'Reports', icon: 'pi pi-fw pi-file-pdf',
                                items: [
                                    { label: "Students", icon: '' },
                                    { label: "Teachers", icon: '' },
                                    { label: "Accountent", icon: '' },
                                    { label: "Student Attendance", icon: '' },
                                    { label: "Teacher Attendance", icon: '' }
                                ]
                            },
                            { label: 'Announcement', icon: 'pi pi-fw pi-bell' },
                            { label: 'Accounting', icon: 'pi pi-fw pi-credit-card' },
                            { label: 'Result', icon: 'pi pi-fw pi-database' }
                            // {
                            //     label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => {
                            //         console.log("logout function called")
                            //         UserService.logout();
                            //         this.UserData.removeUser();
                            //     }
                            // }
                        ]
                    },
                ],
                student: [
                    {
                        label: 'Home',
                        items: [{
                            label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
                        }]
                    },
                    {
                        label: 'Others', icon: 'pi pi-fw pi-sitemap',
                        items: [
                            {
                                label: 'Academics', icon: 'pi pi-fw pi-book',
                                items: [
                                    { label: "Class Routine", icon: '' },
                                    { label: "Exam Routine", icon: '' },
                                ]
                            },
                            {
                                label: 'Accounts', icon: 'pi pi-fw pi-book',
                                items: [
                                    { label: "Current Due", icon: '' },
                                    { label: "Previous History", icon: '' },
                                ]
                            },
                            { label: 'Results', icon: 'pi pi-fw pi-book' }
                            // {
                            //     label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => {
                            //         console.log("logout function called")
                            //         UserService.logout();
                            //         this.UserData.removeUser();
                            //     }
                            // }

                        ]
                    }
                ],
                accountant: [

                ]
            }

        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
                    if (this.mobileMenuActive === true) {
                        this.overlayMenuActive = true;
                    }

                    this.overlayMenuActive = !this.overlayMenuActive;
                    this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
        },
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }
            return true;
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
                'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        },
        sidebarMenu() {

            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                return null;
            }
            else {
                return this.menu[user.role];

            }
        }
    },

    beforeCreate() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            this.router.push('/login')
        }
    },

    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        // 'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    },
}
</script>

<style lang="scss">
@import './App.scss';
</style>
