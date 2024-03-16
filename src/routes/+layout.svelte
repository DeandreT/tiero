<script>
	//@ts-nocheck
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		TabGroup,
		TabAnchor,
		popup,
		storePopup,
		Modal,
		getModalStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import Icon from '@iconify/svelte';
	import astra from '$lib/assets/astra.svg';
	import { page } from '$app/stores';
	import SettingsModal from '$lib/components/modals/SettingsModal.svelte';
	import AuthModal from '$lib/components/modals/AuthModal.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	const modalStore = getModalStore();

	const modalRegistry = {
		settingsModal: { ref: SettingsModal },
		authModal: { ref: AuthModal }
	};

	const settingsPopup = {
		event: 'click',
		placement: 'bottom-end',
		target: 'settingsMenu'
	};

	const settingsModal = {
		type: 'component',
		component: 'settingsModal',
		title: 'Settings'
	};

	const authModal = {
		type: 'component',
		component: 'authModal',
		title: 'Sign In'
	};
</script>

<Modal components={modalRegistry} />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<img src={astra} alt="Tiero Logo" class="w-10 h-10" />
			</svelte:fragment>
			<TabGroup
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				rounded=""
				border=""
				class="bg-surface-100-800-token w-full"
			>
				<TabAnchor href="/new-tier-list" selected={$page.url.pathname === '/new-tier-list'}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center items-center">
							<Icon class="flex justify-center items-center" icon="fa:pencil" />
						</div>
					</svelte:fragment>
					<span class="tab-label">New List</span>
				</TabAnchor>
				<TabAnchor href="/tier-lists" selected={$page.url.pathname === '/tier-lists'}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center items-center">
							<Icon class="flex justify-center items-center" icon="fa:dot-circle-o" />
						</div>
					</svelte:fragment>
					<span class="tab-label">My Lists</span>
				</TabAnchor>
			</TabGroup>
			<svelte:fragment slot="trail">
				<button class="btn variant-filled-primary" use:popup={settingsPopup}>
					<Icon icon="mdi:cog" />
				</button>
				<div class="card p-4" data-popup="settingsMenu">
					<nav class="list-nav">
						<ul>
							<li>
								<button class="text-lg" on:click={() => modalStore.trigger(authModal)}>
									<Icon icon="mdi:account" />
								</button>
							</li>
							<li>
								<button class="text-lg" on:click={() => modalStore.trigger(settingsModal)}>
									<Icon icon="mdi:cog" />
								</button>
							</li>
						</ul>
					</nav>
				</div>
				<a
					class="btn-icon text-lg"
					href="https://github.com/deandret/tiero"
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon="mdi:github" />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
