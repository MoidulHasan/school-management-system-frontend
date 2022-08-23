<template>
	<div class="layout-footer">
		<img alt="Logo" :src="'layout/images/Kushdi Khan Bari kindergarten.svg'" height="20" class="mr-3" />
		&copy;

		<span class="font-medium ml-2">Kushdi Khan Bari kindergarten</span>

	</div>
</template>

<script>
export default {
	name: "AppFooter",
	methods: {
		footerImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		}
	},
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>