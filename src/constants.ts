
import { RiskCategory, RiskItem, RiskTheme, ActionLever } from '@/types';

export const COLORS = {
    foret: '#1A2F2F',
    kaki: '#9DB280',
    vertAcide: '#C3FD97',
    amande: '#B2DFB6',
    coquilleOeuf: '#E1E4D1',
    terracotta: '#BC5B2E',
    quartz: '#E18392',
    ocre: '#D09639',
};

export const ACTION_LEVERS_CATALOG: ActionLever[] = [
    {
        id: 'lev-1',
        theme: 'Environnemental',
        category: 'Modèle & gouvernance',
        name: 'Agir avec sobriété',
        details: "La sobriété est un ensemble de politiques, mesures et pratiques du quotidien permettant d'éviter des demandes d'énergie, de matériaux, de biens et de terre, tout en assurant le bien-être de tous les humains dans le respect des limites planétaires. (Source : 6ème rapport du GIEC, 2022)\n\nPar exemple, La Cravate Solidaire Bordeaux sensibilise en amont les entreprises et particuliers aux externalités négatives de la fast fashion pour réduire les volumes de vêtements reçus.",
        isCollective: false
    },
    {
        id: 'lev-2',
        theme: 'Environnemental',
        category: 'Modèle & gouvernance',
        name: 'Renoncer à une partie de son activité',
        details: "À quoi renoncer pour respecter les limites planétaires et assurer la pérennité de son activité ?\n\nPar exemple : renoncer à des offres, des matériaux, des modèles économiques, des partenaires, des financeurs, des usages, des achats, des campagnes de dons, etc.",
        isCollective: false
    },
    {
        id: 'lev-3',
        theme: 'Environnemental, Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Sensibiliser et former',
        details: "Former et sensibiliser les parties prenantes de l’association (dirigeants, salariés, bénévoles, bénéficiaires, partenaires, etc.) aux enjeux écologiques et humains est une étape clé vers la régénération.\n\nPar exemple, l’Association CeCler, qui accompagne chaque année plus de 5 000 personnes en situation de précarité, sensibilise ses bénéficiaires à des pratiques éco-responsables grâce à différents outils : livret d’accueil, présentation des points de collecte, ateliers ludiques pour les enfants, visites de centres de tri, participation aux charges d’électricité par les bénéficiaires lors d’une consommation excessive d’énergie ...",
        isCollective: false
    },
    {
        id: 'lev-4',
        theme: 'Environnemental, Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Cartographier sa chaîne de valeur',
        details: "Cartographier ses parties prenantes permet d’identifier à la fois les leviers et les freins à la réduction des impacts sur l’ensemble de la chaîne de valeur. Cette démarche est essentielle pour définir, par exemple, une politique d’achats responsables, de mobilité durable ou de sobriété.\n\nC’est aussi une étape clé pour repérer des opportunités de contribution et de régénération en cohérence avec l’activité de l’association.",
        isCollective: false
    },
    {
        id: 'lev-5',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Définir un plan de mobilité durable',
        details: "Le plan de mobilité regroupe des mesures visant à optimiser les déplacements et à réduire leur impact carbone pour les salariés, bénévoles, bénéficiaires et visiteurs d’une association (ex : covoiturage, Forfait Mobilité Durable, réduction des déplacements, accessibilité des lieux de rencontre, achat de vélos à disposition, bornes de recharge électrique…).\n\nPar exemple, La Cravate Solidaire Bordeaux a mis en place un système de covoiturage entre bénévoles et limite l’engagement des nouveaux bénévoles dont le temps de trajet serait trop long.",
        isCollective: false
    },
    {
        id: 'lev-6',
        theme: 'Environnemental',
        category: 'Innovation, énergie et technologie',
        name: 'Isoler les bâtiments',
        details: "L'isolation des bâtiments est un levier majeur de lutte contre le changement climatique. Elle permet d'agir à la fois sur son atténuation – réduction des émissions – et constitue une solution d'adaptation, offrant des conditions de vie moins pénibles comme en cas de forte chaleur.\n\nPar exemple, après son Bilan Carbone 2023, l’Association Pour l’Amitié (APA), association de colocations solidaires, a identifié les bâtiments prioritaires à rénover et s’est engagée à les financer en priorité.",
        isCollective: false
    },
    {
        id: 'lev-7',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Intégrer une comptabilité en triple capital',
        details: "La comptabilité en triple capital est une comptabilité multi-performance qui prend en compte à la fois les performances environnementales, sociales et financières de l’organisation.\n\nPar exemple, l’association RUPTUR est pionnière dans la comptabilité en triple capital. Elle accompagne notamment des structures de l'ESS dans la mise en place de démarches comptables en triple capital grâce à des outils pratiques, des formations et un accompagnement pour intégrer ces nouvelles pratiques comptables.",
        isCollective: false
    },
    {
        id: 'lev-8',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Mesurer ses impacts environnementaux',
        details: "La mesure de ses impacts environnementaux est une première étape pour définir sa stratégie d'atténuation et d'adaptation au changement climatique. Cela peut être réalisé à travers différentes méthodes et outils : \n - Le Bilan Carbone pour comptabiliser les émissions de gaz à effet de serre d’une organisation.\n - L’Analyse du Cycle de Vie (ACV) pour évaluer l’empreinte d’un produit ou d’un service.\n - Et d’autres encore : empreinte biodiversité, bilan matière, empreinte eau, etc.",
        isCollective: false
    },
    {
        id: 'lev-9',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Limiter les pollutions',
        details: "Limiter puis éviter les intrants nocifs dans l’environnement est un premier pas dans la préservation des milieux naturels et de la biodiversité. \n\nPar exemple, l’association Les Compagnons Bâtisseurs, qui accompagne des habitants en situation précaire dans la rénovation de leur habitat, a mis en place un système de lavage des pinceaux et outils permettant de réduire la consommation d’eau ainsi que la pollution générée par leur nettoyage.",
        isCollective: false
    },
    {
        id: 'lev-10',
        theme: 'Environnemental',
        category: 'Technologie',
        name: 'Prolonger la durée de vie',
        details: "L'ADEME* identifie plusieurs leviers pour allonger la durée de vie d'un produit et en limiter les impacts :\n - accroître sa durabilité : meilleure qualité, réparabilité, compatibilité, capacité à évoluer \n - informer et promouvoir une consommation responsable : réponse à un besoin réel, entretien des produits, limitation des effets de mode\n - optimiser les usages\n - favoriser le réemploi.\n\n *ADEME : Agence de la transition écologique",
        isCollective: false
    },
    {
        id: 'lev-11',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Garantir la santé & la sécurité',
        details: "La préservation de la santé et de la sécurité physique et mentale des salarié·es et des bénévoles passe par la mise en place d'actions :\n\n - préventives, par exemple : formation, mise à disposition d'équipements de protection, analyse des presqu'accidents, analyse de pratiques.\n - et correctives, par exemple : médecine du travail, ajustements des procédures.",
        isCollective: false
    },
    {
        id: 'lev-12',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Lutter contre les inégalités',
        details: "La lutte contre les inégalités sociales et environnementales passe par la modification de l'organisation, de la culture et des pratiques de l'association. Ceci pour inclure les populations marginalisées et discriminées, tout au long de la chaîne de valeur, et célébrer les diversités.\n\nPar exemple : recrutement, sensibilisation, formation, rémunération, transparence, communication, dispositifs d'alerte, création de produits et des services adaptés et inclusifs.",
        isCollective: false
    },
    {
        id: 'lev-13',
        theme: 'Environnemental',
        category: 'Modèle & gouvernance',
        name: 'Eco-concevoir ses missions / services',
        details: "L'éco-conception consiste à intégrer systématiquement les aspects environnementaux dès la conception et le développement de ses missions. Elle a pour objectif de réduire les impacts négatifs de la mission sur l’environnement et de favoriser l’intégration de la nature dans son offre.\n\nQuelques exemples : \n - Intégrer l’utilisation d’espaces verts dans ses missions, \n - Concevoir ses bâtiments comme des éco-lieux, \n - Créer des outils marketing respectant les principes du numérique responsable (site internet, campagne de don...).",
        isCollective: false
    },
    {
        id: 'lev-14',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Promouvoir des investissements durables',
        details: "Pour promouvoir des investissements durables, l'association peut agir à plusieurs niveaux, par exemple :\n - en privilégiant des acteurs de la finance durable (banques, investisseurs) pour le financement de vos propres projets.\n - en établissant collectivement une charte mécénat qui permet d’exclure certains mécènes, suivant les activités et les valeurs de l’ensemble de vos parties prenantes.\n - en privilégiant des fournisseurs qui proposent des produits et services plus durables.",
        isCollective: true
    },
    {
        id: 'lev-15',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Choisir ses partenaires',
        details: "Sensibiliser et accompagner les partenaires (fournisseurs, sous-traitants, donateurs) dans une démarche plus responsable et les sélectionner en fonction d'indicateurs sociaux et environnementaux.\n\nPar exemple, des labels comme « Don en confiance » ou la charte de déontologie du mécénat d’entreprise de l’Admical permettent aux associations d’identifier les fondations respectant des principes éthiques communs.",
        isCollective: true
    },
    {
        id: 'lev-16',
        theme: 'Économique',
        category: 'Modèle & gouvernance',
        name: "Favoriser l'économie de la fonctionnalité",
        details: "Privilégier l’usage à la propriété. L’économie de la fonctionnalité est un modèle économique dans lequel une organisation propose des biens à l’usage ou le service que ce produit permet plutôt que la vente directe du bien.\n\nPar exemple, le Bricole Social Club à Lyon est une association qui propose de la location d’outils. Ils proposent différentes formules en fonction du temps de location et des tarifs solidaires selon les bénéficiaires.",
        isCollective: false
    },
    {
        id: 'lev-17',
        theme: 'Environnemental, Social',
        category: 'Modèle & gouvernance',
        name: 'Élargir son objet social aux enjeux sociaux & environnementaux',
        details: "Élargir son objet social permettrait aux associations de maximiser leurs impacts en faveur d’une transition écologique et juste. \n\nCela permet d’inscrire officiellement sa vision dans ses statuts et de déployer des objectifs et des actions concrètes cohérents avec l’environnement et le social.",
        isCollective: false
    },
    {
        id: 'lev-18',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Améliorer le dialogue social',
        details: "L'amélioration du dialogue social passe par la mise en place d'un climat de confiance entre gouvernance, direction, salariés et bénévoles.\n\nPar exemple : \n - l'implication des salariés et bénévoles dans le projet associatif (ex : au sein du CA),\n - le suivi d'indicateurs du climat social, \n - la formation à des outils tels que la communication non violente (CNV).",
        isCollective: false
    },
    {
        id: 'lev-19',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Restaurer un écosystème à son origine',
        details: "Renaturer et restaurer, les écosystèmes, les ressources, les liens humains.\n\nPar exemple, renaturer c'est ramener un sol artificialisé à un état non artificiel, tendre vers l’état naturel originel, laisser la nature reprendre ses droits.\nRestaurer les écosystèmes, c’est réparer ou améliorer un écosystème pour qu’il fonctionne mieux, parfois avec l’aide humain, comme l'a fait la Communauté OpenLande via la renaturation de l'ile malbon à Nantes",
        isCollective: true
    },
    {
        id: 'lev-20',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Végétaliser les espaces bétonnés',
        details: "Végétaliser les espaces bétonnés signifie introduire des plantes dans des zones dominées par le béton, comme les trottoirs, les places, les toits ou les parkings.\n\nMême si les impacts positifs pour l’environnement restent limités en milieu urbain, l’augmentation de la végétation permet de réduire les îlots de chaleur, améliorer la qualité de l’air, favoriser le bien-être des habitants en offrant des espaces agréables, et contribue ainsi à diminuer le stress...",
        isCollective: false
    },
    {
        id: 'lev-21',
        theme: 'Social',
        category: 'Modèle & gouvernance',
        name: 'Coopérer au service des communs',
        details: "Il s’agit de la pratique de collaboration entre acteurs (citoyens, associations, collectivités, entreprises...) pour maintenir, enrichir ou développer des communs. Les “communs” peuvent être des ressources naturelles (forêts, eau...), des ressources culturelles (logiciels libres, connaissances) ou des infrastructures partagées (parcs...).\n\nExemples : contribuer à Wikipédia, gérer collectivement un jardin partagé, co-concevoir des logiciels libres.\nAutre exemple : Les Petites Cantines accompagnent d'autres cantines solidaires dans leur conception",
        isCollective: true
    },
    {
        id: 'lev-22',
        theme: 'Environnemental',
        category: 'Technologie',
        name: 'Imiter la nature grâce au biomimétisme',
        details: "Le Biomimétisme c’est s’inspirer des formes, fonctions ou mécanismes du vivant pour créer des innovations durables.\n\nPar exemple, le Low-tech Lab est une association française dédiée à la recherche et à la documentation open-source sur les innovations low-tech. Elle valorise des solutions simples, accessibles et durables, en s'inspirant notamment du vivant. Notamment, le projet BioMiMetiC explore les liens entre low-tech et biomimétisme en recensant des initiatives, événements et ressources sur ce thème.",
        isCollective: false
    },
    {
        id: 'lev-23',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'S’émerveiller du vivant par l’art',
        details: "S'émerveiller et s'inspirer du vivant pour en prendre soin. \n\nQuelques exemples : \n - Corail Artefact est un projet artistique, scientifique et industriel au service de la reconstruction des récifs. Les actions de sensibilisation du projet (expositions d’œuvres plastiques, conférences, ateliers...) font partie intégrante de leurs actions opérationnelles. \n - Depuis 2021, Minuit 12 est un collectif de création, recherche et activisme destiné aux artistes qui explorent les thèmes liés au climat et à la biodiversité.",
        isCollective: false
    },
    {
        id: 'lev-24',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Créer des emplois durables',
        details: "Selon le Plan de Transformation de l’Économie Française, 300 000 emplois nets pourraient être créés d’ici 2050 si la France atteignait ses objectifs climatiques (The Shift Project, 2022).\n\nCertaines associations orientent de plus en plus les personnes en insertion vers ces métiers de demain. Par exemple :\n - Unis-Cité propose des services civiques pour les jeunes autour de la transition écologique.\n - Les Missions Locales de Grenoble souhaitent davantage accompagner les jeunes dans des projets liés à l’écologie et les mettre en relation avec des réseaux d’acteurs engagés.",
        isCollective: false
    },
    {
        id: 'lev-25',
        theme: 'Économique',
        category: 'Technologie',
        name: 'Participer à la recherche & l\'innovation',
        details: "Participer à la recherche et à l’innovation peut jouer un rôle majeur dans la décarbonation d’un secteur d’activité, qu’il soit associatif ou privé.\n\nExemple : le CIAM (Centre National des Arts en Mouvement), acteur culturel d’intérêt général, s’est associé en partenariat avec Capgemini Engineering, leader mondial du conseil en recherche et développement, pour étudier, modéliser et prototyper une solution concrète et industrialisable visant à remplacer le fioul comme principale source de chauffage des structures éphémères itinérantes.",
        isCollective: true
    },
    {
        id: 'lev-26',
        theme: 'Environnemental, Économique',
        category: 'Technologie',
        name: 'Recourir aux énergies renouvelables',
        details: "En complément d'une démarche de sobriété et d’efficacité énergétique, produire sa propre énergie renouvelable peut permettre non seulement de réduire l’empreinte carbone de l’organisation (c’est le cas notamment de la pompe à chaleur), mais aussi de renforcer son autonomie énergétique.",
        isCollective: false
    },
    {
        id: 'lev-27',
        theme: 'Environnemental',
        category: 'Technologie',
        name: 'Recycler ou valoriser énergétiquement',
        details: "Recycler : Processus par lequel un matériau ou un produit en fin de vie est réintroduit dans un cycle de production afin de créer de nouveaux produits, réduisant ainsi l’usage de ressources naturelles.\n\nValoriser énergétiquement : Transformation d’un déchet ou d’un matériau en énergie utilisable (chaleur, électricité, biogaz), lorsque le recyclage n’est pas possible ou moins efficace.",
        isCollective: false
    },
    {
        id: 'lev-28',
        theme: 'Environnemental',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Pratiquer ou soutenir l’agro-écologie',
        details: "L’agroécologie est une approche agricole durable qui s’inspire des écosystèmes naturels pour concevoir des systèmes de production alimentaires résilients, diversifiés et respectueux de l’environnement, en favorisant la biodiversité, la santé des sols et la réduction des intrants chimiques.",
        isCollective: false
    },
    {
        id: 'lev-29',
        theme: 'Social, Économique',
        category: 'Modèle & gouvernance',
        name: 'Favoriser le partage de biens',
        details: "Similaire à l’économie de la fonctionnalité, où un bien est loué plutôt que vendu, l’économie du partage repose sur la mise en commun de biens ou de services par des individus ou des organisations. L’objectif est de mutualiser l’accès à des ressources sous-utilisées afin d’en optimiser l’usage et de réduire le gaspillage. Ce partage peut s’effectuer grâce à un lieu dédié ou à une plateforme numérique qui facilite la mise en relation entre les usagers.\n\nPar exemple, certaines AMAP (Associations pour le Maintien d’une Agriculture Paysanne) proposent également des services de prêt ou de location de matériel agricole entre producteurs locaux.",
        isCollective: true
    },
    {
        id: 'lev-30',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Mutualiser les services et les compétences',
        details: "La mutualisation des services et des compétences désigne un principe de partage et de coopération où plusieurs acteurs (entreprises, collectivités, associations…) mettent en commun leurs ressources, leurs savoir-faire ou leurs services pour réduire les coûts, gagner en efficacité et créer plus de valeur collective.",
        isCollective: true
    },
    {
        id: 'lev-31',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Recourir à des systèmes monétaires alternatifs',
        details: "Les systèmes monétaires alternatifs sont conçus pour compléter la monnaie officielle et favoriser les échanges économiques locaux et solidaires. Ex :\n - Monnaies complémentaires : monnaies créées pour soutenir des objectifs spécifiques (écologie, solidarité, économie locale). Exemple : WIR en Suisse, \n - Monnaies locales : monnaies utilisées dans une zone géographique limitée, pour soutenir l’économie locale. Exemple : Sol-Violette à Toulouse\n - Systèmes d’échange locaux (SEL) : réseaux d’échanges de biens et services entre membres, souvent basés sur un système de crédit ou d’unités d’échange. Exemple : 1 heure de bénévolat est équivalente à 1 heure de formation. Pour plus d'information, le Collectif des SEL est une association qui fédère de nombreux SEL pour faciliter le partage d'expérience.L'association Parkour 59 a mis en place le Flouz a Roubaix.",
        isCollective: true
    },
    {
        id: 'lev-32',
        theme: 'Économique',
        category: 'Modèle & gouvernance',
        name: 'Participer à l’économie du libre (l\'open)',
        details: "“L’open” ou l’économie du libre fait référence à un modèle économique et culturel où les créations, les logiciels, les connaissances ou les ressources sont libres d’accès, d’usage, de modification et de redistribution. Elle repose sur le principe de partage et de collaboration ouverte, contrairement aux modèles traditionnels fermés et propriétaires. \n\nExemples : Logiciels libres et open source (FOSS) (ex : Linux), connaissances et contenus ouverts (ex : Wikipedia), collaborations communautaires...",
        isCollective: true
    },
    {
        id: 'lev-33',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Utiliser des méthodes d’intelligence collective',
        details: "L’intelligence collective est la capacité d’un groupe à résoudre des problèmes, prendre des décisions ou créer de nouvelles idées grâce à la mise en commun des compétences, expériences et connaissances de ses membres. Elle repose sur la collaboration, l’échange d’idées et la co-construction.\n\nRetrouvez des ressource sen intelligence collective sur notre Notion : https://mouvement-tilt.notion.site/1ebd73de1d148080bbb4cb98c2916ca5?v=1ecd73de1d1480d8a635000cf803dd3e",
        isCollective: false
    },
    {
        id: 'lev-34',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Pratiquer l\'écologie industrielle territoriale',
        details: "Dans un écosystème naturel, les déchets d’une espèce servent de ressources à une autre. L’écologie industrielle et territoriale (EIT) applique la même logique à l’industrie : les déchets ou sous-produits d’une entreprise deviennent des matières premières pour une autre. Elle est un levier pour mobiliser les acteurs d’un même territoire en faveur de la transition écologique.",
        isCollective: true
    },
    {
        id: 'lev-35',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Proposer des biens d’occasion',
        details: "L’économie de l’occasion désigne un modèle économique basé sur la revente, l’achat ou l’échange de biens déjà utilisés plutôt que sur la production de biens neufs. Elle s’inscrit dans une logique économique, écologique et sociale.",
        isCollective: false
    },
    {
        id: 'lev-36',
        theme: 'Économique',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Répartir la valeur de manière équitable et codéterminée',
        details: "La répartition entre les coûts et les avantages est équitable et codéterminée sur l’ensemble de la chaîne de valeur, les contributeurs sont reconnus à leur juste valeur, y compris les auteurs des concepts, méthodes et outils utilisés (source : critère de l’ASFNOR SPEC \"Economie Régénérative\").\n\nPar exemple : revalorisation des salaires, mise en place de dispositifs d’intéressement et de participation, la juste rétribution des fournisseurs, le commerce équitable, etc.",
        isCollective: false
    },
    {
        id: 'lev-37',
        theme: 'Économique',
        category: 'Modèle & gouvernance',
        name: 'Hybrider son modèle économique',
        details: "Un modèle économique hybride désigne une association qui combine plusieurs modes de fonctionnement ou sources de revenus pour renforcer sa viabilité et son impact. L’hybridation du modèle permet également d’améliorer la robustesse de l’association en “résistant aux chocs”.\n\nExemples d’associations avec un modèle économique hybride : \n - each One, \n - Môm’artre, \n - Groupe Vitamine T",
        isCollective: false
    },
    {
        id: 'lev-38',
        theme: 'Environnemental, Économique',
        category: 'Technologie',
        name: 'Intégrer des coopératives d\'énergie renouvelable',
        details: "Une coopérative d’énergie renouvelable est une structure collective où des citoyens, des organisations ou des collectivités se regroupent pour produire, consommer ou gérer ensemble de l’énergie renouvelable (solaire, éolien, biomasse, hydraulique…)\n\nLe principe clé : chaque membre est à la fois acteur et bénéficiaire, et les décisions sont généralement prises de manière démocratique (un membre = une voix).",
        isCollective: true
    },
    {
        id: 'lev-39',
        theme: 'Économique',
        category: 'Modèle & gouvernance',
        name: 'Créer un Système d’Échange Local (SEL)',
        details: "Les systèmes d’échange locaux (SEL) sont des réseaux d’échanges de biens et services entre membres, souvent basés sur un système de crédit ou d’unités d’échange. Exemple : 1 heure de bénévolat est équivalente à 1 heure de formation.\n\nPar exemple, SELVOS (SEL de la Vallée de l’Oise et du Sausseron) est une association dont les membres échangent des services ou objets sans passer par l’argent. Ils utilisent une monnaie virtuelle (les “talents”) pour équilibrer les échanges : rendre un service → gagner des talents, que l’on peut ensuite “dépenser” en demandant des services ailleurs. \n\nPour plus d'information, le Collectif des SEL est une association qui fédère de nombreux SEL pour faciliter le partage d'expérience.",
        isCollective: true
    },
    {
        id: 'lev-40',
        theme: 'Environnemental',
        category: 'Modèle & gouvernance',
        name: 'Donner une voix à la Nature dans sa gouvernance',
        details: "Donner une voix à la Nature dans sa gouvernance est un concept émergent, issu de plusieurs courants apparus depuis les années 1970. Il vise à intégrer les intérêts du vivant — écosystèmes, espèces et cycles naturels — dans les processus de décision des organisations, afin de rendre leurs choix plus durables et respectueux de l’environnement.\n\nExemple : Le Mouvement Tilt a rejoint la dynamique \"Nature on Board\" ! En 2025, après modification de ses statuts, le Mouvement a accueilli un nouvel administrateur formé à la représentation Nature. Ce représentant a un siège réservé au CA et au bureau avec une voix prépondérante et la possibilité d’activer un véto.",
        isCollective: false
    },
    {
        id: 'lev-41',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Utiliser le design thinking pour concevoir ses missions',
        details: "Le design thinking est une méthode d’innovation centrée sur l’humain, née à Stanford dans les années 1980. Elle s’appuie sur l’empathie, la co-création et l’itération pour concevoir des solutions désirables, réalisables et viables. \n\nPar exemple, le cabinet HACT a aidé la Fondation Apprentis d’Auteuil à repenser le repérage des jeunes « invisibles ». Grâce à des ateliers, des entretiens et des sessions de co-création, les besoins réels ont été identifiés et plusieurs pistes d’action ont été testées puis ajustées : événements, médiation, mobilisation des pairs ou de prescripteurs informels.",
        isCollective: false
    },
    {
        id: 'lev-42',
        theme: 'Social',
        category: 'Modèle & gouvernance',
        name: 'Impliquer les parties prenantes externes',
        details: "L'implication des parties prenantes est primordiale pour assurer le développement d'une organisation de manière systémique. \n\nPar exemple, l’association Objectif Terre 77 est organisée en groupes de travail dont font partie des bénévoles (membres du CA ou non) et les salariés. Ces groupes sont ouverts à toute personne volontaire, il suffit de contacter l'association directement ! Ils permettent à chacun d'apporter des compétences sur un sujet défini ou de simplement participer à la discussion. Pour cadrer son fonctionnement, l'association s’appuie sur différents référentiels, tels que le guide de gouvernance ou le répertoire des modes de prise de décision, tous deux accessibles publiquement.",
        isCollective: false
    },
    {
        id: 'lev-43',
        theme: 'Social',
        category: 'Modèle & gouvernance',
        name: 'Décentraliser la prise de décision & favoriser l\'auto-gouvernance',
        details: "Dans un modèle sans hiérarchie (ou presque), les règles et principes sont essentiels pour permettre à chacun d'être accompagné dans la prise de décision. \n\nPar exemple, l'association Makesense a remplacé les circuits de validation et les organes de décision par la sollicitation d’avis (SDA). Ce système permet toute personne en poste depuis plus de six mois de prendre n'importe quelle décision à partir du moment où elle sollicite l’avis des salariés impactés par les conséquences de la décision mais aussi les personnes expertes ou qui ont plus d’expérience sur le sujet. De plus, une communauté de 26 bénévoles et entrepreneurs des 4 coins du monde sélectionnés parmi une cinquantaine de candidats peut également être sollicitée lorsque l'avis de la communauté est nécessaire. Une exception existe : pour les décisions qui peuvent mettre en danger l'association, c’est la Waterline qui tranche. Il s'agit un groupe composé de représentants des salariés et des bénévoles qui sont élus pour 2 ans grâce à une élection sans candidat.",
        isCollective: false
    },
    {
        id: 'lev-44',
        theme: 'Social',
        category: 'Modèle & gouvernance',
        name: 'Repenser son modèle de gouvernance',
        details: "Le modèle de gouvernance d’une organisation constitue le socle de son fonctionnement. La manière dont les pratiques managériales et opérationnelles sont mises en œuvre par les parties prenantes découle directement de ses valeurs fondamentales.\n\nQuelques modèles inspirants : coopérative, SCOP, organisation libérée, organisation opale, perm’association, holacratie, auto-gouvernance…",
        isCollective: false
    },
    {
        id: 'lev-45',
        theme: 'Social',
        category: 'Pratiques opérationnelles et managériales',
        name: 'Accompagner les salariés et bénévoles dans la recherche de leur IKIGAI',
        details: "Aider les salariés et bénévoles à définir leur raison d’être et leur proposer une mission alignée avec cette dernière peut favoriser l’engagement et la santé mentale de vos parties prenantes internes.\n\nRessource : IKIGAI",
        isCollective: false
    }
];

export const RISK_CATALOG: RiskItem[] = [
    // Choc environnemental
    { id: 'env-1', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Hausse de la température moyenne globale", description: "" },
    { id: 'env-2', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Records et vagues de chaleur / chaleur humide", description: "" },
    { id: 'env-3', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Records et vagues de froid extrême", description: "" },
    { id: 'env-4', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Sécheresses fortes répétées ou épisodes de sécheresse extrême", description: "" },
    { id: 'env-5', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Pluies fortes répétées ou épisodes de pluie extrème", description: "" },
    { id: 'env-6', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Glissement de terrain", description: "" },
    { id: 'env-7', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Incendies", description: "" },
    { id: 'env-8', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Tempêtes ou ouragans", description: "" },
    { id: 'env-9', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Montée du niveau de la mer", description: "" },
    { id: 'env-10', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Agents pathogènes", description: "" },
    { id: 'env-11', category: RiskCategory.ENVIRONNEMENTAL, theme: RiskTheme.ENVIRONNEMENTAL, name: "Retrait-gonflement d'argile", description: "" },
    
    // Choc financement et approvisionnement
    { id: 'fin-1', category: RiskCategory.FINANCEMENT, theme: RiskTheme.FINANCEMENT, name: "Baisse des dons", description: "" },
    { id: 'fin-2', category: RiskCategory.FINANCEMENT, theme: RiskTheme.FINANCEMENT, name: "Hausse de l'énergie", description: "" },
    { id: 'fin-3', category: RiskCategory.FINANCEMENT, theme: RiskTheme.FINANCEMENT, name: "Restriction sur l'eau", description: "" },
    { id: 'fin-4', category: RiskCategory.FINANCEMENT, theme: RiskTheme.FINANCEMENT, name: "Transport mis à l'arrêt", description: "" },
    { id: 'fin-5', category: RiskCategory.FINANCEMENT, theme: RiskTheme.FINANCEMENT, name: "Dépendance à un partenaire (financeur, approvisionnement, etc.)", description: "" },
    
    // Choc réglementaire
    { id: 'reg-1', category: RiskCategory.REGLEMENTAIRE, theme: RiskTheme.REGLEMENTAIRE, name: "Modification de la fiscalité pour les dons privés (particuliers et entreprises)", description: "" },
    { id: 'reg-2', category: RiskCategory.REGLEMENTAIRE, theme: RiskTheme.REGLEMENTAIRE, name: "Arrêt des financements publics", description: "" },
    { id: 'reg-3', category: RiskCategory.REGLEMENTAIRE, theme: RiskTheme.REGLEMENTAIRE, name: "Nouveaux impots (TVA, impôt sur le revenu, taxe d'apprentissage)", description: "" },
    
    // Choc politique
    { id: 'pol-1', category: RiskCategory.POLITIQUE, theme: RiskTheme.POLITIQUE, name: "Elections de personnalités politiques populistes/climatosceptiques/transhumanistes", description: "" },
    { id: 'pol-2', category: RiskCategory.POLITIQUE, theme: RiskTheme.POLITIQUE, name: "Essoufflement des instances dirigeantes", description: "Difficulté à renouveler le CA/Bureau, usure des dirigeants, manque de diversité générationnelle.", odds: [3, 16] },
    
    // Choc RH
    { id: 'rh-1', category: RiskCategory.RH, theme: RiskTheme.RH, name: "Baisse du bénévolat", description: "" },
    { id: 'rh-2', category: RiskCategory.RH, theme: RiskTheme.RH, name: "Baisse des adhésions", description: "" },
    { id: 'rh-3', category: RiskCategory.RH, theme: RiskTheme.RH, name: "Désengagement des équipes internes", description: "" },
    { id: 'rh-4', category: RiskCategory.RH, theme: RiskTheme.RH, name: "Dégradations de la qualité de vie et des conditions de travail", description: "" },
    { id: 'rh-5', category: RiskCategory.RH, theme: RiskTheme.RH, name: "Déqualification par l'IA", description: "" },
    
    // Choc RP
    { id: 'rp-1', category: RiskCategory.RP, theme: RiskTheme.RP, name: "Gestion de crise interne avec impact sur l'image de l'organisation", description: "" },
    
    // Choc technologique
    { id: 'tech-1', category: RiskCategory.TECHNOLOGIQUE, theme: RiskTheme.TECHNOLOGIQUE, name: "Infrastructure et équipements hors d'usage ou endommagés", description: "" },
    { id: 'tech-2', category: RiskCategory.TECHNOLOGIQUE, theme: RiskTheme.TECHNOLOGIQUE, name: "Cyberattaque", description: "" },
    { id: 'tech-3', category: RiskCategory.TECHNOLOGIQUE, theme: RiskTheme.TECHNOLOGIQUE, name: "Panne informatique globale", description: "" },
    
    // Choc pour les bénéficiaires
    { id: 'ben-1', category: RiskCategory.BENEFICIAIRES, theme: RiskTheme.BENEFICIAIRES, name: "Explosion du nombre de bénéficiaires", description: "" },
    { id: 'ben-2', category: RiskCategory.BENEFICIAIRES, theme: RiskTheme.BENEFICIAIRES, name: "Augmentation des précarités de vos bénéficiaires", description: "" },
    { id: 'ben-3', category: RiskCategory.BENEFICIAIRES, theme: RiskTheme.BENEFICIAIRES, name: "Fracture numérique grandissante pour vos bénéficiaires", description: "" }
];
