# Autodiag "Robust'Asso"

Recrées entièrement cette application en te basant sur les 10 fichiers de code fournis. 
Tu dois respecter scrupuleusement la logique, le design et les fonctionnalités définis dans ces sources.

Informations complémentaires : 

1. Pour l'architecture et le design system : 
- Stack : Utilise Vite + React + TypeScript.
- Design : Utilise Tailwind CSS exclusivement. Applique la police Poppins (depuis index.html).
- Fidélité : Respecte rigoureusement les types de types.ts et les variables de constants.ts (couleurs, libellés).
- Responsivité : L'application doit être Mobile-First et parfaitement fluide sur tous les écrans..

2. Pour les fonctionnalités spécifiques & les export PDF : 
- Système d'Export : Implémente l'export via la fonction native window.print().
- Ajoute des règles CSS @media print pour masquer la Sidebar et les boutons d'action lors de l'impression.
- Force l'impression des couleurs d'arrière-plan (print-color-adjust: exact) pour que la RiskMatrix conserve ses couleurs sur le papier.
- Assure-toi que le contenu s'adapte au format A4 sans être tronqué.

3. Pour l'expérience utilisateur : 
- Les transitions entre les onglets doivent être fluides.
- Assure la persistance des données saisies dans les formulaires durant la session.

Consigne : Ne simplifie pas le code source. Utilise les interfaces TypeScript fournies pour garantir la cohérence des données.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://autodiag-mouvement-tilt.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/63fafadc-ffc1-424b-8998-9c53178a6d53).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
