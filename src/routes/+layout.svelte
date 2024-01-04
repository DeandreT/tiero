<script>
	// @ts-nocheck

	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		popup,
		storePopup,
		Modal,
		getModalStore,
    initializeStores,
	} from '@skeletonlabs/skeleton';

	// @ts-ignore
	import MdiCog from 'virtual:icons/mdi/cog';
	import MdiGithub from 'virtual:icons/mdi/github';
	import MdiAccount from 'virtual:icons/mdi/account';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	// @ts-ignore
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	// @ts-ignore
	import css from 'highlight.js/lib/languages/css';
	// @ts-ignore
	import javascript from 'highlight.js/lib/languages/javascript';
	// @ts-ignore
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Import modals
	import SettingsModal from '../lib/modals/SettingsModal.svelte';

	// @ts-ignore
	const settingsPopup = {
		event: 'click',
		placement: 'bottom-end',
		target: 'settingsMenu'
	};

  initializeStores();

  const modalStore = getModalStore();

	const modalRegistry = {
		settingsModal: { ref: SettingsModal },
	};

	const settingsModal = {
		type: 'component',
		component: 'settingsModal',
		title: 'Settings',
	};
</script>
<Modal components={modalRegistry} />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Tiero</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn variant-filled-primary" use:popup={settingsPopup}>
					<MdiCog />
				</button>
				<div class="card p-4" data-popup="settingsMenu">
					<nav class="list-nav">
						<ul>
							<li>
								<a href="/account" class="text-lg">
									<MdiAccount />
								</a>
							</li>
							<li>
								<button class="text-lg" on:click={() => modalStore.trigger(settingsModal)}>
									<MdiCog />
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
					<MdiGithub />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
