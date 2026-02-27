// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://asteroidimpact.dev',
	// No base path needed when using a custom domain with GitHub Pages
	integrations: [
		starlight({
			title: 'Asteroid Impact',
			description: 'An open-source video game platform for studying attention, reward, and cognitive control in mediated environments.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/asteroidimpact/ai_crystal_diss' },
			],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'What is Asteroid Impact?', slug: 'docs/overview' },
						{ label: 'Gameplay Elements', slug: 'docs/gameplay' },
					],
				},
				{
					label: 'For Researchers',
					items: [
						{ label: 'Setting Up a Study', slug: 'docs/research' },
						{ label: 'Round Configuration Reference', slug: 'docs/configuration' },
						{ label: 'Data Logging', slug: 'docs/data-logging' },
					],
				},
				{
					label: 'Publications & Citation',
					items: [
						{ label: 'Publications', slug: 'docs/publications' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
