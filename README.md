                                                                                                                     Année 2024-2025 
Développement d'une application pour la gestion complète et l'amélioration du diagnostic assisté par IA d`un cabinet dentaire.
Ingénierie Informatique et Réseaux  
  
Réalisé par : Ammor Doha

Encadré par :Mme Zineb Bousbaa

 
  Dédicace 
 
Je tien à dédier ce modeste travail : 
A mes parents pour leurs grands sacrifices. 
A mes amis et ma famille pour leur amour et leur soutien 
indéfectibles. 
Aux professeurs de L’EMSI qui ont dépensé énormément d’effort pour m` enseigner et me fournir de l’aide utile, pour leur expertise et leur disponibilité tout au long de ma 
formation. 
Je tiens à exprimer ma gratitude envers DentalAArkoubi 
 pour m'avoir donné l'opportunité de réaliser mon stage de fin d'annee en développement web. Je suis reconnaissant pour l'expérience professionnelle que j'ai acquise au sein de ce Cbinet et pour la 
confiance qu'elle m'a accordée. 
A tous ceux qui ont assisté et participé de près ou de loin à 
l’élaboration de ce rapport. 
A tous ceux qui vont prendre son rapport entre leurs mains. 
 
Remerciements 

 
C’est une grande satisfaction que je voulez remercier tous les gens qui m` ont aidés, accompagnés et soutenus pour l’aboutissement du projet de fin d’études. 
 
Avant tout, j` adresse mon remerciement à tous les professeurs, intervenants et toutes les personnes qui par leurs paroles, leurs écrits, leurs conseils et leurs critiques ont guidé ma réflexions et ont accepté à me rencontrer et répondre à mes questions durant ma recherches. 
 
Je remercie Madame Zineb Bousbaa, pour son encadrement pédagogique consistant, le suivi régulier de l’avancement du projet, ses encouragements, ses instructions et ses conseils avantageux qu’il n’a cessé de me dicter tout au long du projet de fin d’annees. 
 
Je tiens tout particulièrement à remercier Mme Halima Salih, mon encadrante au sein du Cabinet  , pour sa disponibilité, son expertise et son accompagnement tout au long de ce stage. 
 

Je remercie aussi les membres du jury qui ont fait l’honneur d’accepter de juger mon travail. 
 
Bien sûr, je ne pourrer pas terminer sans remercier mes très chers parents, qui ont toujours été là pour moi, vous m`avez donné un magnifique modèle de labeur et de volonté. Je suis redevable d’une éducation dont je me suis fiers. 
 
Merci à tous. 


 
Résumé 
 
 
Ce rapport de projet de fin d'annes présente une étude détaillée sur la conception et le développement d'une application web innovante destinée aux cabinets dentaires. L'objectif principal de ce projet est de moderniser la gestion quotidienne des cliniques en proposant une solution numérique complète et intégrée. L'application vise à optimiser les processus administratifs et cliniques, allant de la gestion des patients et des rendez-vous à l'intégration de fonctionnalités d'intelligence artificielle (IA) pour l'assistance au diagnostic en cas d`urgence et pour le Docteur.
L'application front-end est développée avec React.js, offrant une expérience utilisateur fluide et réactive, avec des éléments de design modernes, des gradients, des animations fluides et une navigation intuitive. Elle propose une interface de sélection de rôle (Docteur ou Assistant) sans nécessiter d'authentification préalable, permettant un accès rapide et personnalisé aux fonctionnalités. Chaque rôle bénéficie d'un dashboard dédié affichant des statistiques en temps réel.
Le backend est architecturé autour d'Express.js, fournissant une API REST complète et performante. La persistance des données est assurée par une base de données MySQL, optimisée pour gérer les relations complexes entre les entités du cabinet dentaire.
Les fonctionnalités clés incluent la gestion complète des patients (CRUD avec recherche), un système de rendez-vous doté d'un calendrier interactif et de la gestion des statuts, la tenue de dossiers médicaux numériques avec l'historique des consultations, et la génération ainsi que le téléchargement d'ordonnances.
Ce projet aboutit à une application web complète qui non seulement améliore considérablement l'efficacité opérationnelle des cabinets dentaires, mais offre également une plateforme flexible et extensible pour de futures évolutions.




Mots clés : Application web, Cabinet dentaire, React.js, Express.js, MySQL, Gestion des patients, Gestion des rendez-vous, Dossier médical numérique, API REST, UI/UX, Responsive Design. 
 
Abstract 
 
This final year project report details the design and development of an innovative web application for comprehensive dental practice management. The primary objective of this project is to provide an integrated and modern digital solution, optimizing administrative and clinical processes through an intuitive interface and a robust backend.
The front-end application is developed with React.js, offering a fluid and responsive user experience, featuring modern design elements, gradients, smooth animations, and intuitive navigation. It includes a role selection interface (Doctor or Assistant) without requiring prior authentication, allowing quick and personalized access to functionalities. Each role benefits from a dedicated dashboard displaying real-time statistics.
The backend is architected around Express.js, providing a complete and high-performance REST API. Data persistence is ensured by a MySQL database, optimized to manage complex relationships between dental practice entities.
Key features include comprehensive patient management (CRUD with search), an appointment system with an interactive calendar and status management, digital medical records with consultation history, and the generation and download of prescriptions.
This project results in a comprehensive web application that not only significantly improves the operational efficiency of dental practices but also offers a flexible and extensible platform for future developments.







Keywords: Web Application, Dental Practice, React.js, Express.js, MySQL, Patient Management, Appointment Management, Digital Medical Record, REST API, UI/UX, Responsive Design.

Glossaire 
 
 
 
API REST	Application Programming Interface Representational State Transfer : Style d'architecture pour les systèmes hypermédia distribués, souvent utilisé pour la communication entre le frontend et le backend.
CRUD	Create, Read, Update, Delete : Les quatre opérations de base de la persistance des données.
Express.js	Framework web minimaliste et flexible pour Node.js, utilisé pour construire des APIs RESTful et des applications web.
HTTP	Hypertext Transfer Protocol : Protocole de communication utilisé pour le transfert de données sur le World Wide Web.
JSON	JavaScript Object Notation : Format léger d'échange de données, facile à lire et à écrire pour les humains et facile à analyser et générer pour les machines
JavaScript	Langage de programmation de haut niveau, interprété, utilisé principalement pour le développement web front-end et backend (via Node.js).
Lucide React	Bibliothèque d'icônes légères et personnalisables pour React, utilisée pour enrichir l'interface utilisateur.
Material UI	Bibliothèque de composants React qui implémente Google's Material Design, offrant un design moderne et intuitif (ou un framework CSS comme Tailwind pour le stylisme).
MySQL	Système de gestion de base de données relationnelle open-source, largement utilisé pour les applications web.
Node.js	Environnement d'exécution JavaScript côté serveur, permettant d'exécuter du code JavaScript en dehors d'un navigateur web.
ORM	Object-Relational Mapping : Technique de programmation qui permet de convertir des données entre des systèmes de types incompatibles en utilisant des langages de programmation orientés objet (ex: Sequelize pour Node.js et MySQL).
React.js	Bibliothèque JavaScript pour construire des interfaces utilisateur interactives.
Responsive Design	Approche de conception web qui permet aux sites web de s'adapter à différentes tailles d'écran (ordinateurs de bureau, tablettes, téléphonesmobiles).
UML	Software Development Kit : Ensemble d'outils de développement pour créer des applications pour une plateforme spécifique.
                 Liste des figures
 Figure 1.1 : Méthode scrum agile ………………………………………………………………………9
Figure 1.2 : Diagramme de Gantt simplifié de la planification du projet………………………….……14
Figure 1.3 : Diagramme de cas d'utilisation global de l'application web dentaire……………………...25
Figure 1.4 : Diagramme de cas d'utilisation détaillé pour le rôle "Docteur"………………..……..……30
Figure 1.5 : Diagramme de cas d'utilisation détaillé pour le rôle "Assistante"……………...………….31
Figure 1.6 : Diagramme de classe de l'application web dentaire……………………………………….32
Figure 1.7 : Schéma d'architecture technique globale de l'application…………………………….....…33
Figure 1.8 : Architecture interne du client web (React.js)…………………… ……………..…………34
Figure 2.1 : Capture d'écran : Tableau de bord du Docteur………………………………………….…35
Figure 2.2 : Capture d'écran : Liste des patients………………………………………………………..36
Figure 2.3 : Capture d'écran : Fiche patient détaillée…………………………………………………...37
Figure 2.4 : Capture d'écran : Calendrier des rendez-vous…………………………………………...…38
Figure 2.5 : Capture d'écran : Formulaire de prise de rendez-vous…………………………………..…39
Figure 2.6 : Capture d'écran : Écran de consultation avec option IA……………………….…………..40
Figure 2.7 : Capture d'écran : Interface de diagnostic IA…………………………………………….…41
Figure 3.1 : Capture d'écran : Génération d'ordonnance………………………………….…………….42
Figure 3.2 : Capture d'écran : Statistiques et rapports……………………………………………….….43
Figure 4.1 : Capture d'écran : Interface de sélection de rôle……...…………………………………….44
Figure 4.2 : Capture d'écran : Interface de Connexion Docteur……………………………….……….45
Figure 4.3 : Capture d'écran : Tableau de Bord Docteur……………………………………………….46
Figure 4.4 : Capture d'écran : Agenda Hebdomadaire…………………………………………………47
Figure 4.5 : Capture d'écran : Formulaire de Rendez-vous………………….…………………………48
Figure 4.6 : Capture d'écran : Liste des Patients……………………………………………….………49
Figure 4.7 : Capture d'écran : Filtrer les Patients………………………………………………………50
Figure 4.8 : Capture d'écran : Formulaire Patient……………………………………………...………51
Figure 4.9 : Capture d'écran : Dossiers Médicaux……………………………………..………………52
Figure 4.10 : Capture d'écran : Fiche Médicale Patient……………………………………  …………53
Figure 4.11 : Capture d'écran : Détail de Consultation Médicale………………………...……………54
Figure 4.12 : Capture d'écran : Création d'un Dossier Médical………………………………..………55
Figure 4.13 : Capture d'écran : Dossier Médical Patient après création………………….……………56
Figure 4.14 : Capture d'écran : Envoi de Rappels…………………………………………………...…57
Figure 4.15 : Capture d'écran : Interface de Gestion des Ordonnances…………………..……………58
Figure 4.16 : Capture d'écran : Détails de l'Ordonnance…………………………………………….…59
Figure 4.17 : Capture d'écran : Modifier l'Ordonnance…………………………………………...……60
Figure 4.18 : Capture d'écran : Ordonnance Médicale Téléchargée……………………...…………….62
Figure 4.19 : Capture d'écran : Interface Diagnostic Assisté par IA………………………...……….…63
Figure 4.20 : Capture d'écran : Résultats du Diagnostic IA - Gingivite Modérée………  ………….…64
Figure 4.21 : Capture d'écran : Résultats du Diagnostic IA - Carie Dentaire Profonde………..…….…65
Figure 4.21 : Capture d'écran : Plans de Traitement - Fiche Patient ………………….………..………66
Figure 4.21 : Capture d'écran : Plans de Traitement – gestion de plan………..…………………..……67
Figure 4.21 : Capture d'écran : Plans de Traitement – details Fiche Patient …………………...………68
Figure 4.22 : Capture d'écran : Dashboard Assistante Principal……………………….…………….…69
Figure 4.23 : Capture d'écran : Interface de Gestion des Patients……………………...….……………70
Figure 4.24 : Capture d'écran : Formulaire Nouveau Patient……………………………….…..………71
Figure 4.25 : Capture d'écran : Calendrier des Rendez-vous………………………………...…………72
Figure 4.26 : Capture d'écran : Formulaire Nouveau Rendez-vous……………………….……………73
Figure 4.27 : Capture d'écran : Interface Dossiers Médicaux……………………….…………………74
Figure 4.28 : Capture d'écran : Interface Rappels et Notifications…………….………………………75
Figure 4.29 : Capture d'écran : Modifier Rappel………………………………………………………76
Figure 4.30 : Capture d'écran : Interface Rappels et Notifications - État Mis à Jour…………………...77
Figure 4.31 : Capture d'écran : Interface Liste des Appels……………………………………………..78
Figure 4.32 : Capture d'écran : Interface Appel en Cours……………………………………….……...79
Figure 4.32 : Capture d'écran : Interface Statistique……...……………………………………….……80
Figure 4.33 : Capture d'écran : Interface Assistante avec chatbot en cas d`urgence …………….……..81
Figure 4.34 : Capture d'écran : Interface Assistante avec chatbot en cas d`urgence exemple…….……82





















Liste des tableaux 
 
Tableau 2. 1 : Description de cas d'utilisation de gestion par Docteur….…….................................. 23
Tableau 2. 2: Description de cas d'utilisation de gestion par Assistante ..…................................... 25 
Tableau 2. 3 : Description diagramme de classe cabinet dentaire.………......................................... 31 


 
Table des matières 
Dédicace ................................................................................................................................................................... I
Remerciements ...................................................................................................................................................... II
Résumé .................................................................................................................................................................. III
Abstract ................................................................................................................................................................ IV
Glossaire ................................................................................................................................................................ V
Liste des figures ................................................................................................................................................... VI
Liste des tableaux ................................................................................................................................................ IX
Introduction Générale ........................................................................................................................................... 1
Chapitre 1 : Contexte et Objectifs du Projet ...................................................................................................... 2
  1 Introduction ...................................................................................................................................................... 2
1.1 : Présentation du Cadre d'Accueil (Cabinet Dentaire) ................................................................................ 3
1.1.1 Organigramme et Acteurs du Cabinet Dentaire ....................................................................................... 3
1.1.2 Processus Opérationnels du Cabinet Dentaire .......................................................................................... 4
1.2 : Présentation du Contexte du Projet ............................................................................................................ 8
1.2.1 Vue d’ensemble du Projet ............................................................................................................................ 8
1.2.2 Étude de l’Existant ..................................................................................................................................... 10
1.2.3 Problématique ............................................................................................................................................. 10
1.2.4 Solution Proposée ....................................................................................................................................... 11
1.2.5 Enjeux du Projet ........................................................................................................................................ 13
1.2.6 Contraintes ................................................................................................................................................. 13
1.3 : Conduite du Projet ..................................................................................................................................... 14
1.3.1 Méthode Agile SCRUM ............................................................................................................................. 14
1.3.2 Répartition des Rôles dans SCRUM ......................................................................................................... 14
1.3.3 Réunions ...................................................................................................................................................... 15
1.3.4 Le Développement Piloté par les Tests ..................................................................................................... 16
1.3.5 Les Sprints ................................................................................................................................................... 17
1.3.6 Planification du Projet ............................................................................................................................... 18
Conclusion ............................................................................................................................................................ 19
Chapitre 2 : Analyse et Conception ................................................................................................................... 20
   2 Introduction ................................................................................................................................................... 20
2.1 : Spécifications des Besoins............................................................................................................................ 21
2.1.1 Besoins Fonctionnels ................................................................................................................................... 21
2.1.2 Besoins Non Fonctionnels .......................................................................................................................... 21
2.1.3 Acteurs du Système .................................................................................................................................... 22
2.1.4 Langage de Modélisation ........................................................................................................................... 22
2.2 : Diagramme de Cas d’Utilisation ................................................................................................................ 23
2.2.1 Diagramme de Cas d’Utilisation Global de l’Application Dentaire ...................................................... 23
2.2.2 Diagramme de Cas d’Utilisation pour le Rôle Docteur ........................................................................... 24
2.2.3 Diagramme de Cas d’Utilisation pour le Rôle Assistante ....................................................................... 24
2.3 : Description des Cas d’Utilisation ............................................................................................................... 25
2.4 : Diagramme de Séquence ............................................................................................................................. 27
2.4.1 Diagramme de Séquence pour la Gestion des Rendez-vous ................................................................... 27
2.4.2 Diagramme de Séquence pour le Diagnostic Assisté par IA ................................................................... 30
2.5 : Diagramme de Classe .................................................................................................................................. 32
2.5.1 Diagramme de Classe de l'Application Dentaire ..................................................................................... 32
Conclusion ............................................................................................................................................................ 32
Chapitre 3 : Etude Technique ............................................................................................................................ 33
  3 Introduction .................................................................................................................................................... 33
3.1 : Technologies de Développement ................................................................................................................ 34
3.1.1 Langages ..................................................................................................................................................... 34
3.1.2 Framework .................................................................................................................................................. 34
3.1.3 Web Services ............................................................................................................................................... 35
3.1.4 Système de Gestion de Base de Données ................................................................................................... 35
3.1.5 Outils de Développement ........................................................................................................................... 35
3.1.5.1 Environnement Matériel ......................................................................................................................... 35
3.1.5.2 Environnement Logiciel .......................................................................................................................... 36
3.2 : Architecture Technique .............................................................................................................................. 37
Conclusion ............................................................................................................................................................ 40
Chapitre 4 : Mise en Œuvre................................................................................................................................. 41
  4 Introduction .................................................................................................................................................... 41
4.1 : Interfaces Graphiques ................................................................................................................................ 42
             4.2 Conclusion ...................................................................................................................................................... 80
4.3 Conclusion Générale et Perspectives ........................................................................................................... 83
4.4 Webographie .................................................................................................................................................. 86
 
                          Introduction Générale 
 
Le secteur de la santé, et plus spécifiquement les cabinets dentaires, sont en constante évolution. La demande croissante de services de qualité, l'optimisation de l'expérience patient et la nécessité d'une gestion plus efficace des opérations quotidiennes poussent les professionnels à rechercher des solutions innovantes. Traditionnellement, de nombreux cabinets s'appuient sur des systèmes papier ou des logiciels bureautiques génériques, ce qui peut entraîner des inefficacités, des erreurs de saisie, des difficultés d'accès aux informations et un manque de visibilité sur la performance globale du cabinet. La gestion des dossiers patients, la planification des rendez-vous, le suivi des traitements et la communication avec les patients représentent un volume de tâches administratives conséquent qui, lorsqu'il n'est pas optimisé, peut détourner les praticiens de leur cœur de métier : la prestation de soins dentaires. 
Face à ces défis, la transformation digitale s'impose comme une nécessité. L'intégration de technologies web modernes offre des opportunités sans précédent pour moderniser et rationaliser ces processus. Une application web dédiée peut centraliser l'information, automatiser les tâches répétitives, améliorer la communication et offrir une flexibilité d'accès via n'importe quel navigateur, permettant ainsi aux cabinets dentaires d'améliorer leur productivité, la précision de leurs interventions et la satisfaction de leurs patients. 
       C'est dans ce contexte que s'inscrit le présent projet de fin d'annee, qui a pour objectif la conception et le développement d'une application web complète pour la gestion d'un cabinet dentaire.le Docteur et l'Assistant(e) administratif(ve). Elle vise à offrir une interface intuitive et performante, intégrant des fonctionnalités avancées de gestion et des tableaux de bord personnalisés, tout en étant construite avec les technologies modernes React.js pour le frontend, Express.js pour le backend, et MySQL pour la base de données. 
Ce rapport est structuré en plusieurs chapitres. Le premier chapitre présente le contexte général du projet, en définissant la problématique actuelle des cabinets dentaires et en exposant la vision et les objectifs de l'application. Le deuxième chapitre est dédié à la phase d'analyse et de conception, détaillant les spécifications des besoins fonctionnels et non fonctionnels, et modélisant l'architecture logicielle à l'aide de diagrammes UML. Le troisième chapitre explore l'étude technique, justifiant les choix de technologies de l'application web. Enfin, le quatrième chapitre décrit la mise en œuvre, les stratégies de test et les maquettes des interfaces graphiques de l'application, illustrant sa facilité d'utilisation et son design moderne. Ce rapport se conclura par un récapitulatif des réalisations et une discussion des perspectives d'évolution du projet. 
 
Chapitre 1 : Contexte et Objectifs du Projet 
    Introduction 
 
 
Ce chapitre a pour objectif de poser les bases du projet d'application web dentaire. Il débutera par une présentation du cadre général dans lequel s'inscrivent les besoins identifiés, en dépeignant un "cabinet dentaire cible" et ses acteurs. J` expose ensuite en détail le contexte du projet, en partant d'une étude de l'existant pour aboutir à une problématique claire, à laquelle la solution se propose de répondre. Enfin, je définis les enjeux et les contraintes qui ont guidé mon choix tout au long du développement, avant de présenter la méthodologie de conduite de projet adoptée.
 
	1.1  	Présentation du Cadre d'Accueil (Cabinet Dentaire)

L`"organisme d'accueil" implicite est un cabinet dentaire moderne, soucieux d'optimiser ses opérations et d'améliorer l'expérience de ses patients. 
  Un cabinet dentaire typique est une structure médicale composée de plusieurs acteurs clés :
Le Docteur / Dentiste : Les praticiens qui dispensent les soins, établissent les diagnostics, définissent les plans de traitement et gèrent les consultations. Ils sont au cœur de l'activité médicale.
L'Assistant Dentaire / Secrétaire Médicale : Le personnel de support qui gère l'accueil des patients, la prise de rendez-vous, les tâches administratives, la préparation du matériel et l'assistance du dentiste pendant les consultations.
Les Patients : Les individus qui consultent pour des soins dentaires, nécessitant un suivi rigoureux de leur historique médical et de leurs traitements.
Accueil et Enregistrement : Collecte des informations du patient, création de fiches.
Prise de Rendez-vous : Gestion du planning du/des praticien(s) et des fauteuils.
Consultation et Diagnostic : Examen clinique, établissement du diagnostic.
Planification des Traitements : Définition des étapes de soins.
Exécution des Soins : Réalisation des traitements dentaires.
Gestion Administrative et Financière : Facturation, paiements, suivi des dossiers

             1.2 Présentation du Contexte du Projet
 
                      1.2.1 Vue d'ensemble du projet 
Le projet consiste en la conception et le développement d'une application web complète pour la gestion des opérations d'un cabinet dentaire. L'objectif est de remplacer ou de compléter les systèmes existants, souvent manuels ou peu intégrés, par une solution numérique centralisée et accessible via un navigateur web. Cette application vise à devenir l'outil principal pour l'ensemble du personnel, du praticien à l'assistant(e),et Docteur afin de faciliter et d'optimiser leur travail quotidien.                     
Les modules clés de l'application incluent :
Interface de Sélection de Rôle : Permet à l'utilisateur de choisir entre le rôle de Docteur ou d'Assistant sans authentification préalable.
Dashboards Personnalisés : Des tableaux de bord spécifiques pour chaque rôle, affichant des statistiques et informations pertinentes en temps réel.
Gestion des Patients : Base de données centralisée pour toutes les informations des patients, avec fonctionnalités CRUD complètes et recherche.
Système de Rendez-vous : Calendrier interactif et automatisé pour la planification, avec gestion des statuts de rendez-vous.
Dossiers Médicaux Numériques : Historique complet des consultations et traitements.
Plans de Traitement : Outil pour définir et suivre les étapes de soins.
Génération d'Ordonnances : Création et téléchargement rapides de prescriptions.
Statistiques d'Activité : Tableaux de bord pour analyser les performances du cabinet.
L'application est conçue pour être intuitive, sécurisée et performante, en tirant parti des capacités des technologies web modernes (React.js, Express.js, MySQL) pour offrir une accessibilité et une réactivité accrues

                           1.2.2 Étude de l'existant 
	 
Dans de nombreux cabinets dentaires, l'existant se caractérise souvent par :
Dossiers papier : Des fiches patients physiques, rendant la recherche d'informations fastidieuse, sujette aux pertes et difficilement partageable.
Agendas papier ou logiciels génériques : La planification des rendez-vous est souvent manuelle ou utilise des outils non spécifiques au secteur médical, ce qui peut entraîner des chevauchements, des oublis de rappels et une visibilité limitée sur la disponibilité.
Communication fragmentée : Les rappels de rendez-vous sont souvent effectués manuellement (appels téléphoniques), et il n'y a pas de canal centralisé pour la communication patient-cabinet.
Gestion des ordonnances : La rédaction des ordonnances est manuelle, augmentant le risque d'erreurs et rendant l'archivage et le suivi complexes.
Absence de statistiques : Difficile de suivre l'activité du cabinet (nombre de patients, types de soins les plus fréquents, revenus) sans collecter et analyser les données manuellement.
Processus répétitifs : De nombreuses tâches administratives sont répétitives et ne sont pas automatisées, réduisant l'efficacité du personnel.
Cette situation, bien que fonctionnelle, limite la croissance, la performance et la qualité de service d'un cabinet dentaire moderne.

         1.2.3 Problématique
L'étude de l'existant met en lumière plusieurs problématiques majeures auxquelles les cabinets dentaires sont confrontés, et que l` application web vise à résoudre :
Inefficacité Opérationnelle et Perte de Temps :
La gestion manuelle des dossiers patients (papier) et des agendas entraîne des recherches laborieuses, des duplications de données et une consommation excessive de temps administratif.
Les tâches répétitives comme l'envoi de rappels de rendez-vous ou la rédaction d'ordonnances sont chronophages et sources de distraction.
Risque d'Erreurs et Manque de Précision :
Les saisies manuelles ou les transcriptions peuvent conduire à des erreurs dans les dossiers patients ou les ordonnances.
Le manque d'un historique complet et facilement accessible peut impacter la continuité des soins.
Accès Difficile à l'Information :
Les dossiers patients ne sont pas centralisés ni accessibles en temps réel, ce qui peut être problématique lors de situations d'urgence ou de consultations multi-praticiens.
Les données sur les traitements passés ou les antécédents médicaux sont difficiles à consolider pour une vue d'ensemble rapide.
Communication Patient-Cabinet Lacunaire :
Les rappels de rendez-vous manuels sont coûteux et moins efficaces que des notifications automatisées.
L'absence de canaux de communication modernes et instantanés avec les patients.
Visibilité et Analyse des Performances Limitées :
Sans données numérisées et structurées, il est difficile d'obtenir des statistiques fiables sur le nombre de patients, les types de traitements effectués, ou les revenus, empêchant une prise de décision éclairée pour la gestion du cabinet.
Obsolescence Technologique et Manque d'Évolutivité :
Les systèmes existants ne sont souvent pas adaptés aux technologies modernes et ne permettent pas une intégration facile de nouvelles fonctionnalités ou de services tiers.
Ces problématiques démontrent la nécessité impérieuse d'une solution numérique intégrée, accessible via le web et intelligente pour moderniser et optimiser la gestion des cabinets dentaires, permettant aux professionnels de se concentrer sur l'excellence des soins.
                             1.2.4 Solution proposée
La solution proposée est une application web moderne, développée avec React.js pour le frontend, Express.js pour le backend, et MySQL pour la persistance des données. Elle est conçue pour transformer la gestion d'un cabinet dentaire en une expérience fluide, efficace et basée sur les données. Cette application se positionne comme une plateforme complète qui centralise toutes les opérations critiques et introduit des innovations clés.
L'optimisation des processus métier via cette application web offrent de nombreux avantages :
Interface de Sélection de Rôle Simplifiée : Sans authentification complexe, les utilisateurs peuvent choisir leur rôle (Docteur ou Assistant) dès le démarrage, accédant ainsi à une interface personnalisée et pertinente pour leurs tâches.
Centralisation et Accessibilité des Données : L'application crée une base de données unique et sécurisée (MySQL) pour toutes les informations patients, dossiers médicaux, historiques de traitements et rendez-vous. Ces données sont accessibles en temps réel par les praticiens et assistant(e)s via n'importe quel navigateur web, améliorant la réactivité et la continuité des soins.
Dashboards Personnalisés : Chaque rôle bénéficie d'un tableau de bord dynamique affichant les statistiques clés et les informations pertinentes en temps réel, permettant une vision rapide de l'activité.
Optimisation de la Gestion des Rendez-vous : Un calendrier interactif permet de visualiser, créer, modifier et annuler des rendez-vous en quelques clics. La gestion des statuts (confirmé, annulé, terminé) aide au suivi.
Amélioration du Dossier Patient : Le dossier médical devient numérique, intégrant notes de consultation, ordonnances, antécédents, pour une consultation complète et rapide.
Génération et Partage Simplifiés d'Ordonnances : L'application permet de générer des ordonnances et de les télécharger au format PDF, réduisant les erreurs et facilitant l'archivage.
Gain de Productivité et Réduction des Tâches Administratives : L'automatisation de nombreuses tâches (rappels, génération de documents, recherche d'informations) libère du temps pour le personnel, lui permettant de se concentrer sur des activités à plus forte valeur ajoutée.
Sécurité et Conformité : Bien que la sélection de rôle soit sans authentification, le backend est conçu avec des mesures de sécurité robustes pour protéger les données sensibles des patients, en conformité avec les réglementations en vigueur (par exemple, le RGPD ou équivalent local) via une API REST sécurisée.
Interface Utilisateur Intuitive et Moderne : L'application est conçue avec une ergonomie soignée, un design moderne avec des gradients et animations fluides (React.js, CSS), et des icônes Lucide React, assurant une expérience utilisateur agréable et une prise en main rapide.
En somme, cette application web représente une avancée significative pour les cabinets dentaires, leur permettant d'embrasser pleinement la transformation digitale, d'améliorer leur efficacité opérationnelle et d'offrir des soins de meilleure qualité à leurs patients.

1.2.5 Enjeux du projet 

La mise en œuvre de cette application web pour cabinet dentaire présente plusieurs enjeux stratégiques et opérationnels majeurs :
Enjeux de Performance et d'Efficacité : L'objectif principal est d'améliorer la productivité du cabinet en réduisant le temps consacré aux tâches administratives et en optimisant les flux de travail cliniques. Une application rapide et réactive est essentielle pour éviter les frustrations et garantir l'adoption par les utilisateurs. Le choix de React.js pour le frontend et Express.js pour le backend est crucial pour ces performances.
Enjeux de Flexibilité d'Accès : Une application web offre l'avantage de l'accessibilité depuis n'importe quel navigateur, sur divers appareils (ordinateur, tablette), ce qui est un enjeu majeur pour la commodité du personnel.
Enjeux de Qualité des Soins et Sécurité Patient : En centralisant les dossiers médicaux et en facilitant l'accès à l'historique, l'application contribue à une meilleure continuité des soins et à la réduction des erreurs. La sécurité des données médicales sensibles dans la base de données MySQL et via l'API Express.js est un enjeu primordial, nécessitant des mesures de protection robustes et une conformité réglementaire stricte.
Enjeux d'Adoption Utilisateur et d'Ergonomie : Malgré des fonctionnalités avancées, l'application doit rester intuitive et facile à utiliser pour les dentistes et les assistantes, qui ne sont pas nécessairement des experts en technologie. L'ergonomie de l'interface, le design moderne et la navigation fluide (grâce à React.js et aux éléments de design choisis) sont cruciaux pour une adoption réussie.
Enjeux Stratégiques pour le Cabinet : Pour un cabinet dentaire, l'adoption d'une telle solution peut devenir un avantage concurrentiel, améliorant l'image du cabinet comme moderne et soucieux de l'innovation, et potentiellement attirant de nouveaux patients grâce à une meilleure qualité de service et une gestion plus fluide.
Enjeux de Maintenabilité et d'Évolutivité : Le système doit être conçu de manière modulaire (React components, Express routes, MySQL schema) pour faciliter les mises à jour, la correction des bugs et l'ajout futur de nouvelles fonctionnalités (par exemple, module de communication patient, intégration avec des systèmes de facturation externe).
La réussite de ce projet ne se mesurera pas seulement à la fonctionnalité technique, mais aussi à sa capacité à transformer positivement les opérations quotidiennes des cabinets dentaires et à élever la qualité des soins.
1.2.6 Contraintes 

Plusieurs contraintes ont été identifiées et prises en compte lors de la planification et du développement de cette application web :
Performances du navigateur : L'application doit être rapide et réactive, indépendamment du navigateur ou de l'appareil utilisé. L'optimisation du chargement des composants React.js et des requêtes API Express.js est cruciale.
Sécurité des Données :
Confidentialité : Les données des patients sont hautement sensibles. Toutes les informations stockées dans MySQL et transitant via l'API Express.js doivent être sécurisées.
Gestion des Accès : Bien qu'il n'y ait pas d'authentification complète pour la sélection de rôle, il est nécessaire de mettre en place des mécanismes d'autorisation simples au niveau du backend pour s'assurer que les requêtes API sont légitimes et que les rôles (Docteur/Assistant) n'accèdent qu'à leurs données et fonctions prévues.
Ergonomie et Expérience Utilisateur (UX) : L'interface doit être intuitive et facile à prendre en main. Le responsive design est une contrainte majeure pour assurer une expérience cohérente sur ordinateurs, tablettes et mobiles. L'intégration des éléments de design spécifiés (gradients, animations fluides, icônes Lucide React) doit améliorer cette UX sans compromettre la performance.
Intégration et Extensibilité : La conception doit permettre de futures intégrations avec d'autres systèmes (logiciels de facturation, laboratoires d'analyses externes) sans nécessiter de refonte majeure.
Maintenabilité du Code : Le code frontend (React.js) et backend (Express.js) doit être propre, bien documenté et modulaire pour faciliter la maintenance corrective et évolutive, ainsi que le travail en équipe.
Fiabilité de la Base de Données : MySQL doit être configuré pour assurer une haute disponibilité et l'intégrité des données, avec des sauvegardes régulières.
Ces contraintes ont été des facteurs déterminants dans les choix d'architecture, de technologies et de méthodologie de développement.
	1.3 Conduite du projet 
 
1.3.1 Méthode agile SCRUM 

Pour la conduite de ce projet de développement d'application mobile, réalisé de manière individuelle, j'ai choisi d'adopter une méthode agile inspirée de SCRUM, souvent appelée "Personal Scrum" ou "SCRUM simplifié" 1 . Cette approche, bien que ne nécessitant pas les rôles et réunions formels d'une équipe, est extrêmement bénéfique pour un développeur seul car elle permet de : 
Structurer le travail : Découper le projet en cycles courts (Sprints) avec des objectifs clairs.
Rester concentré : Prioriser les tâches et limiter le travail en cours pour éviter le surmenage et améliorer la productivité.
S'adapter et pivoter : Évaluer régulièrement l'avancement, intégrer de nouveaux apprentissages ou modifier les priorités en fonction des découvertes.
Maintenir la motivation : Visualiser les progrès accomplis et célébrer les livraisons à la fin de chaque Sprint.
Amélioration continue : Réfléchir sur mon propre processus de travail pour l'optimiser au fil du temps.
Cette approche itérative et incrémentale, tout en restant flexible, garantit une gestion efficace du projet individuel et une livraison progressive de valeur.


                                       
                                      Figure 1. 2 : Méthode scrum agile 
 
1.3.2 Répartition des rôles dans SCRUM 
 
Dans le cadre de ce projet individuel, j'ai endossé simultanément toutes les responsabilités clés définies par le framework SCRUM. Cela a nécessité une discipline personnelle forte et la capacité de changer de "casquette" en fonction des tâches à accomplir.
Product Owner : J'ai agi en tant que Product Owner de mon propre projet. Cela signifie que j'ai été responsable de :
Définir la vision de l'application et ses objectifs.
Identifier et collecter les besoins fonctionnels et non fonctionnels (en me basant sur les descriptions fournies et mes propres recherches).
Maintenir et prioriser le "Backlog Personnel" (la liste de toutes les fonctionnalités et améliorations à développer), en m'assurant que les tâches les plus importantes étaient traitées en premier.
Valider que les fonctionnalités développées correspondaient à la vision du produit.
Scrum Master : J'ai également assumé le rôle de Scrum Master. Mes responsabilités ont inclus :
M'assurer que je suivais les principes du Personal Scrum et que je respectais mon propre processus de développement.
Identifier et lever mes propres obstacles (problèmes techniques, manque de connaissances, blocages de conception).
Protéger mon temps de travail des distractions externes et maintenir une concentration optimale sur les objectifs du Sprint.
Équipe de Développement : J'étais l'unique membre de l'équipe de développement. À ce titre, j'étais directement responsable de :
La conception technique détaillée de chaque fonctionnalité frontend (React.js) et backend (Express.js).
L'écriture du code (JavaScript, SQL), l'intégration des bibliothèques (React, Axios, Sequelize, etc.).
L'implémentation des tests (unitaires, d'intégration, UI).
La résolution des problèmes techniques.
L'intégration continue de mes développements.
QA Tester (Assurance Qualité) : Enfin, j'ai également porté la casquette du QA Tester. Cela impliquait de :
Définir les cas de test pour chaque fonctionnalité.
Exécuter les tests manuels et automatisés pour vérifier le bon fonctionnement de l'application.
Identifier, documenter et suivre la correction des bugs.
M'assurer que le produit final respecte les critères de qualité et de performance définis.
Cette polyvalence a été un défi mais aussi une opportunité unique d'acquérir une vision complète du cycle de vie d'un projet logiciel
  
                                               Figure 1.3 : Rôles combinés du développeur solo dans SCRUM 
 
1.3.3 Réunions SCRUM :
Les cérémonies SCRUM ont été adaptées pour devenir des moments d'auto-réflexion et de planification personnelle, essentiels pour maintenir le cap et la productivité.
Planification du Sprint Personnel (au début de chaque Sprint) :
Je définis l'objectif principal du prochain Sprint (ex : "Implémenter la gestion des patients complète").
Je sélectionne les fonctionnalités prioritaires du "Backlog Personnel" que je m'engage à réaliser pendant le Sprint.
J'estime le temps nécessaire pour chaque tâche et je décompose les fonctionnalités complexes en tâches plus petites.
Auto-Point Quotidien (chaque matin) :
Une courte session de 5 à 10 minutes avec moi-même. Je réponds mentalement ou sur un carnet aux questions suivantes :
-	"Qu'ai-je accompli hier ?"
-	"Qu'est-ce que je prévois de faire aujourd'hui ?"
-	"Y a-t-il des obstacles qui me bloquent ou que je dois résoudre ?"
Cela m'aide à rester organisé, à identifier les problèmes tôt et à ajuster ma journée.
Revue de Sprint Personnelle (à la fin de chaque Sprint) :
-	Je prends le temps d'évaluer les fonctionnalités que j'ai déclarées "terminées" pendant le Sprint.
-	Je les teste moi-même pour m'assurer qu'elles fonctionnent comme prévu.
-	Je compare les réalisations avec l'objectif initial du Sprint pour mesurer mon avancement concret. Cela est un grand facteur de motivation.
Rétrospective de Sprint Personnelle (après la Revue de Sprint) :
Un moment d'auto-réflexion critique :
-	"Qu'est-ce qui s'est bien passé pendant ce Sprint ? (Mes réussites, les outils utiles)"
-	"Qu'est-ce qui pourrait être amélioré dans mon processus de travail ? (Mes blocages, les erreurs récurrentes)"
-	"Quelles actions concrètes puis-je mettre en place pour le prochain Sprint afin de m'améliorer?
Cette étape est cruciale pour l'apprentissage continu et l'optimisation de ma propre efficacité.
                 1.3.4 Le développement piloté par les tests (TDD)
 
Le Développement Piloté par les Tests (TDD - Test-Driven Development) a été adopté comme pratique de développement fondamentale pour garantir la robustesse et la qualité du code de l'application 2. Cette approche rigoureuse est d'autant plus importante dans un projet solo où l'on est à la fois développeur et testeur. Le TDD est un processus itératif qui implique :
Écrire un test échouant : D'abord, on écrit un test unitaire qui échoue, car la fonctionnalité qu'il est censé tester n'existe pas encore.
Écrire le code minimal pour faire passer le test : Ensuite, on écrit juste assez de code (la fonctionnalité) pour que le test passe.
Refactoriser le code : Enfin, on restructure et améliore le code sans modifier son comportement, en s'assurant que tous les tests continuent de passer.
Cette approche permet de :
Réduire les bugs : En testant chaque petite unité de code, les erreurs sont détectées très tôt dans le cycle de développement.
Améliorer la conception : Le fait d'écrire des tests avant le code encourage une conception plus modulaire, testable et réutilisable.
Faciliter la maintenance : Une suite de tests complète agit comme une régression continue, garantissant que de nouvelles modifications n'introduisent pas de bugs dans les fonctionnalités existantes.
Augmenter la confiance : En ayant une couverture de test élevée, j'ai une plus grande confiance dans la stabilité et la fiabilité du code, ce qui est crucial pour une application métier.

             
                             Figure 1.4 : Cycle de développement piloté par les tests (TDD)
 1.3.5 Les sprints
Le projet a été découpé en plusieurs Sprints, chacun ayant un objectif clair et une liste de fonctionnalités à livrer. Cette découpe a permis de gérer la complexité, de maintenir la motivation et de valider progressivement les réalisations. Voici une structure de Sprints typique pour ce projet :
Sprint 1 : Initialisation & Sélection de Rôle (2 semaines)
Objectif : Établir l'environnement de développement, la structure de base du projet (React.js, Express.js, MySQL) et implémenter l'interface de sélection de rôle.
Fonctionnalités : Initialisation des projets React et Express, configuration de la base de données MySQL, création de l'interface de sélection de rôle (Docteur/Assistant), mise en place de la navigation entre les rôles.
Sprint 2 : Gestion des Patients (CRUD) & API (2 semaines)
Objectif : Implémenter le backend pour la gestion des patients et l'interface frontend pour le CRUD des patients.
Fonctionnalités : API REST Express.js pour les patients (Create, Read, Update, Delete), modèle Sequelize/MySQL pour les patients, interface React.js pour lister, ajouter, modifier et supprimer les patients, recherche de patients.
Sprint 3 : Système de Rendez-vous (2 semaines)
Objectif : Développer le module de gestion des rendez-vous avec un calendrier interactif.
Fonctionnalités : API REST Express.js pour les rendez-vous, modèle Sequelize/MySQL pour les rendez-vous, composant React.js de calendrier interactif, création/modification/annulation de rendez-vous, gestion des statuts de rendez-vous.
Sprint 4 : Dossier Médical & Ordonnances (2 semaines)
Objectif : Mettre en place les dossiers médicaux numériques et la génération d'ordonnances.
Fonctionnalités : API REST Express.js pour consultations et ordonnances, modèles Sequelize/MySQL, interface React.js pour l'historique des consultations d'un patient, saisie de notes, génération et téléchargement d'ordonnances (PDF).
Sprint 5 : Dashboards & Statistiques (1 semaines)
Objectif : Créer les dashboards personnalisés pour chaque rôle avec des statistiques en temps réel.
Fonctionnalités : Composants React.js pour les dashboards Docteur et Assistant, requêtes API Express.js pour récupérer les données statistiques pertinentes (nombre de patients, RDV, revenus, etc.), intégration de librairies de graphiques simples.

Sprints additionnels : Optimisation, Sécurité & UX/UI (1 semaine)
Objectif : Affiner l'application, optimiser les performances, renforcer la sécurité, corriger les bugs finaux et améliorer l'UX/UI.
Fonctionnalités : Amélioration des styles (gradients, animations fluides), tests de performance frontend/backend, renforcement des mesures de sécurité de l'API, correction des bugs, documentation technique et d'utilisation, responsive design complet.
Chaque Sprint se conclut par une revue personnelle et une rétrospective pour s'assurer que le projet reste aligné sur les besoins et continue de s'améliorer.

             1.3.6 Planification du projet (Diagramme de Gantt simplifié pour un développeur solo)
La planification de ce projet a été structurée en phases et Sprints, reflétant un effort individuel. Voici la représentation textuelle de ce diagramme de Gantt simplifié, qui représente le flux de travail continu du développeur :
 
                                     Figure 1.5 : Diagramme de Gantt simplifié de la planification du projet
Légende pour les Sprints : Chaque sprint représente une période intense de développement et de tests, se terminant par une revue personnelle des fonctionnalités réalisées. Les chevauchements mineurs entre les phases représentent la continuité du travail et l'itération propre à une approche agile.

Conclusion 
Ce chapitre a permis de bien cerner le contexte dans lequel s’inscrivent les missions de ce stage, ainsi que les contraintes, enjeux et la planification pour chacune de ces missions. Je pourrais à présent mon pencher sur les travaux effectués pour la réalisation de chacune de ces missions.  
 
 
 

Chapitre 2 : Analyse et conception 
Introduction 
 
 
Le chapitre précédent a posé les fondations du projet en définissant son contexte et ses objectifs généraux. Ce chapitre 2 plonge au cœur de la phase d'analyse et de conception, une étape cruciale qui vise à traduire les besoins identifiés en une architecture logicielle claire et modulaire. J` allais détailler les spécifications des besoins fonctionnels et non fonctionnels, en distinguant les attentes de chaque acteur du système (Docteur et Assistante). Par la suite, j` utiliserons le langage UML (Unified Modeling Language) pour modéliser le système, à travers les diagrammes de cas d'utilisation, les diagrammes de séquence illustrant les interactions clés, et le diagramme de classes présentant la structure des données de la base de données MySQL. Cette phase de conception est essentielle pour garantir que l'application développée répondra précisément aux exigences des utilisateurs finaux et sera architecturée de manière robuste et évolutive.	 
 
2.1.1 Besoins fonctionnels 
 
Les besoins fonctionnels décrivent ce que le système doit faire. Ils sont définis pour chaque rôle d'utilisateur afin de couvrir l'ensemble des fonctionnalités attendues de l'application web dentaire.
Pour le rôle "Docteur" :
Sélection de Rôle :
Choisir le rôle "Docteur" depuis l'interface de sélection initiale sans authentification.
Tableau de Bord Personnalisé :
Accéder à un dashboard Docteur affichant les rendez-vous du jour, les nouvelles consultations et des statistiques clés (nombre de patients, revenus estimés).
Gestion des Patients :
Ajouter une nouvelle fiche patient (nom, prénom, date de naissance, sexe, numéro de téléphone, adresse, email, personne à contacter en cas d'urgence, profession).
Modifier une fiche patient existante.
Supprimer une fiche patient (avec confirmation et gestion de l'historique).
Consulter la liste des patients, avec des options de tri et de recherche rapide (par nom, prénom, date de naissance).
Consulter le dossier médical complet d'un patient (historique des visites, traitements passés, antécédents médicaux, allergies, médicaments actuels).
Ajouter/Modifier/Supprimer des antécédents médicaux et dentaires à la fiche patient.
Gestion des Rendez-vous :
Visualiser le calendrier des rendez-vous (vue jour, semaine, mois) avec indication des statuts (confirmé, annulé, terminé).
Créer un nouveau rendez-vous (choix du patient, date, heure, durée, motif de consultation, notes internes).
Modifier les détails d'un rendez-vous existant.
Annuler, reporter ou marquer un rendez-vous comme "terminé".
Gestion des Consultations et Traitements :
Démarrer une nouvelle consultation pour un patient.
Saisir des notes de consultation (texte libre).
Définir et suivre un plan de traitement personnalisé (avec étapes, dates prévues, dents concernées, coût estimé).
Générer des ordonnances médicales (pré-remplies ou personnalisées, avec médicaments, dosages, instructions).
Télécharger une ordonnance au format PDF.
Statistiques et Suivi :
Consulter des statistiques détaillées sur le nombre de patients, les types de traitements les plus fréquents, les revenus générés sur des périodes données (jour, semaine, mois, année).
Pour le rôle "Assistante (Admin)" :
Sélection de Rôle :
Choisir le rôle "Assistant" depuis l'interface de sélection initiale sans authentification.
Tableau de Bord Personnalisé :
Accéder à un dashboard Assistant affichant les rendez-vous du jour, les tâches administratives en attente et des résumés d'activité.
Accueil et Prise de Rendez-vous :
Accéder à une interface rapide pour noter les rendez-vous.
Créer/Modifier/Annuler un rendez-vous, avec choix du docteur et des horaires disponibles, et gestion des statuts.
Rechercher un patient existant ou créer un nouveau patient lors de la prise de RDV.
Accès aux Fiches Patients :
Consulter les fiches patients (lecture seule des informations de base).
Modifier partiellement les informations administratives (coordonnées, adresse).
Filtrer la liste des patients par nom ou date de dernière visite.
Gestion Administrative :
Télécharger des fiches patients ou des ordonnances au format PDF (avec accès limité aux détails médicaux).
Recherche rapide :
Effectuer une recherche rapide de patients ou de rendez-vous par nom, date ou autre critère pertinent.
 
2.1.2 Besoins non fonctionnels 
 
Les besoins non fonctionnels décrivent comment le système doit fonctionner, couvrant des aspects tels que la performance, la sécurité, l'utilisabilité et la maintenabilité.
Performance :L'application doit être rapide et réactive.
Le chargement des pages et des composants React.js doit être optimisé (< 2 secondes).
Le chargement des listes de patients (plusieurs centaines/milliers) doit être quasi instantané (< 2 secondes).
L'ouverture d'une fiche patient détaillée doit prendre moins de 1 seconde.
Les opérations CRUD sur les données (ajout/modification/suppression) via l'API Express.js doivent être effectuées en moins de 500 ms.
La base de données MySQL doit répondre rapidement aux requêtes complexes.
Sécurité :La sécurité des données médicales est primordiale.
Bien qu'il n'y ait pas d'authentification par identifiant/mot de passe, des mécanismes de validation et d'autorisation au niveau du backend (Express.js) doivent s'assurer que les actions sont cohérentes avec le rôle sélectionné.
Chiffrement des données sensibles au repos (base de données MySQL).
Fiabilité :L'application doit fonctionner de manière stable et sans erreurs inattendues.
Gestion robuste des erreurs et exceptions côté frontend (React.js) et backend (Express.js).
Mécanismes de journalisation pour le backend Express.js.
La base de données MySQL doit garantir l'intégrité des données via des contraintes de clé étrangère et des transactions.
Utilisabilité/Ergonomie :L'interface utilisateur doit être intuitive et facile à prendre en main.
Conception moderne avec des gradients, des animations fluides et des micro-interactions.
Système de couleurs professionnel (bleu pour docteur, teal pour assistant) pour différencier les rôles.
Navigation claire et logique (React Router) entre les écrans, avec des indicateurs visuels.
Minimalisation du nombre de clics pour les actions fréquentes.
Responsive design complet pour une expérience optimale sur ordinateurs de bureau, tablettes et mobiles.
Utilisation d'icônes Lucide React cohérentes.
Maintenabilité :Le code doit être facile à comprendre, modifier et étendre.
Architecture modulaire (composants React.js, routes Express.js, modèle MySQL).
Code bien commenté et respect des conventions de codage.
Tests unitaires et d'intégration couvrant les fonctionnalités critiques.
Évolutivité :L'architecture doit permettre l'ajout de nouvelles fonctionnalités et la gestion d'un volume croissant de données et d'utilisateurs.
API Express.js conçue pour être extensible.
Base de données MySQL capable de gérer une croissance significative des données et des requêtes.
Compatibilité Navigateur :L'application doit fonctionner sur les navigateurs web modernes.


 
2.1.3 Acteurs du système 
 
 
Dans le contexte de l` application web de gestion de cabinet dentaire, les acteurs principaux et leurs interactions sont définis comme suit :
Docteur (Praticien Dentaire) :
Description : Le rôle central de l'application. Le docteur est un professionnel de la santé habilité à diagnostiquer, traiter et suivre les patients.
Permissions : Accès complet aux fonctionnalités médicales et de gestion des patients, rendez-vous, consultations, plans de traitement, ordonnances et statistiques via son dashboard personnalisé.
Objectifs : Optimiser la gestion de son temps, faciliter le suivi patient, automatiser les tâches administratives, obtenir une vue d'ensemble rapide de l'activité.
Assistante (Administrative / Médicale) :
Description : Le rôle de support administratif et d'accueil du cabinet. L'assistante gère principalement l'organisation et la communication.
Permissions : Accès limité et ciblé. Peut gérer les rendez-vous (création, modification, annulation), consulter les informations de base des patients (lecture seule ou édition partielle des coordonnées), télécharger des documents (fiches, ordonnances sans modifier le contenu médical) via son dashboard personnalisé. N'a pas accès aux détails médicaux approfondis.
Objectifs : Fluidifier l'accueil et la planification, réduire les tâches administratives répétitives, améliorer la communication avec les patients.
Base de Données MySQL (Passive) :
Description : Acteur passif mais essentiel, représentant le système de gestion de base de données relationnelle MySQL qui stocke toutes les informations de l'application.
Rôle : Persiste et fournit les données structurées pour l'application via l'API Express.js.
Objectifs : Assurer l'intégrité, la cohérence et la disponibilité des données.
Cette définition claire des acteurs et de leurs rôles respectifs est fondamentale pour la modélisation des cas d'utilisation et la conception des interfaces utilisateur.


 
 
2.1.4 Langage de modélisation 
 
Pour la modélisation du système, j`avais opté pour le langage UML (Unified Modeling Language). UML est un langage graphique standardisé largement reconnu pour la spécification, la visualisation, la construction et la documentation des systèmes logiciels. Il offre une collection de diagrammes qui permettent de représenter différents aspects d'un système, depuis la vue fonctionnelle jusqu'à la vue structurelle et comportementale3.
L'utilisation d'UML dans ce projet présente plusieurs avantages :
Clarté et Compréhension : Les diagrammes UML fournissent une représentation visuelle claire des exigences et de l'architecture du système, facilitant la compréhension et la communication au sein de l'équipe de développement et avec les parties prenantes (les futurs utilisateurs du cabinet dentaire).
Analyse Approfondie : UML permet d'analyser en détail les interactions entre les acteurs et le système, ainsi que la structure interne des classes et des objets, aidant à identifier les lacunes et les complexités potentielles dès les premières étapes du projet.
Documentation Standardisée : Les modèles UML constituent une documentation standardisée et maintenable du système, essentielle pour la traçabilité des exigences et la compréhension future du code.
Indépendance Technologique : UML est agnostique vis-à-vis de la technologie d'implémentation, ce qui signifie que la conception peut être réalisée avant de fixer les choix technologiques spécifiques, ou peut être adaptée si les technologies évoluent.
Dans le cadre de ce rapport, je concentrerais sur les diagrammes UML les plus pertinents pour la phase d'analyse et de conception :
Diagrammes de cas d'utilisation : Pour définir les fonctionnalités du système du point de vue des acteurs.
Diagrammes de classes : Pour représenter la structure statique du système, ses classes, attributs, méthodes et relations (appliqué au schéma de base de données MySQL).







	2.2  	Diagramme de cas d’utilisation 
 
    2.2.1 Diagramme de cas d'utilisation détaillé pour le rôle "Docteur"

La figure 2.1 se concentre sur les fonctionnalités spécifiques accessibles par le Docteur. 
 
 
                                     Figure 2.1 : Diagramme de cas d'utilisation détaillé pour le rôle "Docteur" 

Fonctionnalité	Description

Tableau de bord	Le tableau de bord du docteur offre une vue d'ensemble de son activité. Il affiche des informations clés telles que le prochain rendez-vous, le nombre de rendez-vous restants, et les urgences en attente. Des indicateurs de performance comme le nombre de patients actifs, les rendez-vous du jour et les consultations par mois sont également présents. Cette interface permet un accès rapide aux principales actions : Nouveau Patient, Planifier RDV, Créer Dossier, Nouvelle Ordonnance, Diagnostic IA et Analyses.
Gestion des patients	Cette fonctionnalité permet au docteur de visualiser son calendrier de consultations. L'interface affiche le statut des rendez-vous (planifiés, confirmés, en cours ou terminés). Le docteur peut également ajouter un nouveau rendez-vous en sélectionnant un patient et en précisant la date, l'heure et le motif de la consultation.
Gestion des rendez-vous	Cette fonctionnalité permet au docteur de visualiser son calendrier de consultations. L'interface affiche le statut des rendez-vous (planifiés, confirmés, en cours ou terminés). Le docteur peut également ajouter un nouveau rendez-vous en sélectionnant un patient et en précisant la date, l'heure et le motif de la consultation.
Gestion des ordonnances	Le docteur a la possibilité de créer et de gérer les prescriptions médicales. Il peut modifier une ordonnance existante en ajustant le patient, la date, les médicaments, la posologie et la durée du traitement. Il peut également télécharger une ordonnance pour la délivrer.
Diagnostic assisté par IA	C'est une fonctionnalité avancée où le docteur peut utiliser l'intelligence artificielle pour l'assister dans son diagnostic. Il peut ajouter une image dentaire ou décrire des symptômes vocalement ou par écrit. L'IA fournit ensuite un diagnostic suggéré, un niveau de gravité et des recommandations de traitement.
Analyses et Statistiques	Le docteur peut visualiser des statistiques détaillées sur l'activité du cabinet.

   Tableau 2. 1 : Description de cas d'utilisation de gestion par Assistante
 Le diagramme et le tableau montre le docteur, en tant qu'acteur principal, gère l'ensemble des aspects cliniques et analytiques du cabinet. Il administre les fiches patients, planifie les rendez-vous via un calendrier, et crée des dossiers médicaux pour chaque consultation. Au cœur de son travail, il établit des diagnostics, avec ou sans l'aide d'une IA, et prescrit des ordonnances et des plans de traitement. Enfin, il peut consulter des analyses et des statistiques pour optimiser son activité.

     2.2.2 Diagramme de cas d'utilisation détaillé pour le rôle "Assistante"
 
 
La figure 2.2  illustre les fonctionnalités spécifiques et les limitations d'accès pour le rôle de l'Assistante. 

 

             Figure 2. 2 : Diagramme de cas d'utilisation détaillé pour le rôle "Assistante

Fonctionnalité	Description

Tableau de bord	Fournit un aperçu général de la journée. Il affiche des statistiques clés (nombre de patients actifs, rendez-vous du jour, consultations par mois) et permet d'accéder rapidement aux fonctions principales comme l'ajout d'un patient ou la création d'un dossier. Les informations affichées varient selon le rôle de l'utilisateur.
Gestion des patients	Permet à l'utilisateur de voir une liste de tous les patients. Il est possible d'ajouter un nouveau patient via un formulaire détaillé ou de modifier les informations d'un patient existant.
Gestion des rendez-vous	Donne une vue complète du calendrier des consultations. L'utilisateur peut planifier un nouveau rendez-vous en spécifiant le patient, la date, l'heure et le motif de la consultation. Il est également possible de confirmer, d'annuler ou de modifier un rendez-vous.
Gestion des dossiers médicaux	Permet de consulter l'historique des consultations d'un patient. Le docteur peut créer de nouveaux dossiers en y intégrant un diagnostic, un traitement, et des notes.
Gestion des appels et rappels	Permet à l'assistante de gérer les appels entrants et sortants. Elle peut également créer et programmer des rappels automatiques (par SMS ou appel) pour les patients.
Chatbot d'urgence (DentalAssist AI)	Un assistant virtuel pour l'assistante, conçu pour donner des conseils immédiats en cas d'urgence signalée par un patient. Le chatbot fournit un protocole d'urgence et des recommandations.
Analyses et Statistiques	Affiche des graphiques et des métriques de performance pour le cabinet. Cela inclut le nombre de patients, le taux de satisfaction, le temps moyen de consultation, et l'évolution mensuelle des revenus.

     Tableau 2. 1 : Description de cas d'utilisation de gestion par Assistante



En se basant sur le diagramme de cas d'utilisation et le tableau,L'assistante est chargée de la gestion administrative du cabinet. Elle gère les fiches patients, de leur création à la modification, et planifie les rendez-vous sur le calendrier. Pour la communication, elle utilise un chatbot d'urgence pour l'assistance immédiate et gère les appels et rappels automatiques. Bien qu'elle ne puisse pas modifier les données médicales, elle peut les consulter pour la bonne organisation des rendez-vous.


2.2.3 Description des cas d’utilisation
Pour compléter les diagrammes, une description textuelle détaillée de certains cas d'utilisation clés est nécessaire, précisant leur objectif, les acteurs impliqués, les préconditions, le déroulement et les postconditions.
Cas d'utilisation : Gérer un Patient (pour le Docteur)
Identifiant :Docteur
Nom : Gérer un Patient
Objectif : Permettre au Docteur d'administrer l'ensemble des informations relatives à un patient, de sa création à la consultation de son dossier médical complet.
Acteur principal : Docteur
Préconditions : Le Docteur a sélectionné son rôle et accède à l'application.
Déclencheur : Le Docteur sélectionne "Patients" dans le menu principal ou clique sur un patient existant.
Scénario Nominal :
Le Docteur accède à la page de gestion des patients.
Le système affiche la liste des patients avec des options de recherche et de tri.
Option A : Ajouter un nouveau patient
- Le Docteur clique sur le bouton "Ajouter un patient".
- Le système affiche un formulaire de saisie des informations patient.
- Le Docteur remplit les champs obligatoires et clique sur "Enregistrer".
- Le système envoie une requête POST à l'API Express.js pour créer le patient.
- L'API Express.js valide les données, les persiste dans la base de données MySQL et
   renvoie une     réponse de succès.
-	Le système frontend affiche un message de confirmation et redirige vers la fiche du nouveau patient ou la liste mise à jour.
Option B : Modifier un patient existant
-	Le Docteur sélectionne un patient dans la liste.
-	Le système affiche la fiche détaillée du patient.
-	Le Docteur clique sur "Modifier".
-	Le système affiche la fiche en mode édition.
-	Le Docteur modifie les informations souhaitées.
-	Le Docteur clique sur "Enregistrer les modifications".
-	Le système envoie une requête PUT à l'API Express.js pour modifier le patient.
-	L'API Express.js valide et met à jour la fiche patient dans MySQL.
-	Le système frontend affiche un message de confirmation.
Option C : Supprimer un patient
-	Le Docteur sélectionne un patient dans la liste ou sa fiche détaillée.
-	Le Docteur clique sur "Supprimer".
-	Le système affiche une boîte de dialogue de confirmation.
-	Le Docteur confirme la suppression.
-	Le système envoie une requête DELETE à l'API Express.js pour supprimer le patient et ses données associées (rendez-vous, consultations).
-	L'API Express.js supprime les données de MySQL et renvoie un succès.
-	Le système frontend affiche un message de succès.
            Option D : Consulter le dossier médical
-	Le Docteur sélectionne un patient dans la liste.
-	Le système affiche la fiche détaillée du patient, incluant les informations générales, l'historique des visites, les antécédents médicaux, les plans de traitement et les ordonnances.
Postconditions : La base de données MySQL est à jour. Le Docteur a accès aux informations souhaitées.
Scénarios Alternatifs / Exceptions :
-	Le Docteur annule l'ajout/modification/suppression à tout moment.
-	Champs obligatoires manquants lors de l'ajout/modification : Le système frontend affiche un message d'erreur et met en surbrillance les champs manquants.
-	Erreur de communication avec l'API Express.js ou MySQL : Le système affiche un message d'erreur et propose de réessayer.
Cas d'utilisation : Gérer un Rendez-vous (pour l'Assistante)
Identifiant : Assistante
Nom : Gérer un Rendez-vous
Objectif : Permettre à l'Assistante d'enregistrer, modifier ou annuler des rendez-vous via un calendrier interactif.
Acteur principal : Assistante
Préconditions : L'Assistante a sélectionné son rôle et accède à l'application.
Déclencheur : L'Assistante clique sur "Rendez-vous" dans le menu principal ou sur une plage horaire dans le calendrier.
Scénario Nominal :
-	L'Assistante accède à la page du calendrier des rendez-vous.
-	Le système affiche un calendrier interactif (vue jour/semaine/mois) avec les rendez-vous existants et leurs statuts.
Option A : Créer un nouveau rendez-vous
-	L'Assistante clique sur une plage horaire disponible dans le calendrier ou sur un bouton "Ajouter RDV".
-	Le système affiche un formulaire de création de rendez-vous.
-	L'Assistante recherche et sélectionne un patient existant ou crée un nouveau patient.
-	L'Assistante sélectionne la date, l'heure, la durée, le docteur et le motif.
-	L'Assistante clique sur "Enregistrer".
-	Le système envoie une requête POST à l'API Express.js.
-	L'API Express.js valide les données, enregistre le rendez-vous dans MySQL et renvoie un succès.
-	Le système frontend affiche un message de confirmation et met à jour le calendrier.
Option B : Modifier un rendez-vous existant
-	L'Assistante clique sur un rendez-vous existant dans le calendrier.
-	Le système affiche les détails du rendez-vous en mode édition.
-	L'Assistante modifie les informations (heure, date, motif, statut).
-	L'Assistante clique sur "Enregistrer les modifications".
-	Le système envoie une requête PUT à l'API Express.js.
-	L'API Express.js met à jour le rendez-vous dans MySQL.
-	Le système frontend affiche un message de confirmation.
Option C : Annuler un rendez-vous
-	L'Assistante clique sur un rendez-vous existant.
-	Le système affiche les détails du rendez-vous.
-	L'Assistante clique sur "Annuler le rendez-vous" et confirme dans une boîte de dialogue.
-	Le système envoie une requête PUT à l'API Express.js pour changer le statut du RDV à "Annulé".
-	L'API Express.js met à jour le statut dans MySQL.
-	Le système frontend affiche un message de succès et met à jour le calendrier.
Postconditions : La base de données MySQL des rendez-vous est à jour. Le calendrier reflète les modifications.
Scénarios Alternatifs / Exceptions :
-	L'Assistante annule la création/modification/annulation.
-	Conflit d'horaire lors de la création/modification : L'API Express.js renvoie une erreur, le système frontend affiche un message et suggère d'autres plages horaires.
-	Erreur de communication avec l'API Express.js ou MySQL : Le système affiche un message d'erreur.










	2.4  	Diagramme de classe 
 
2.4.1 Diagramme de classe 
 
 
La figure 2.7 UML fournit une vue statique de la structure du système, en montrant les classes, leurs attributs, leurs méthodes et les relations entre elles. Ici, il est appliqué pour représenter le schéma de la base de données MySQL. 



 
 
Figure 2. 7 : Diagramme de classe de l'application

Description du Diagramme de Classes


Nom de la Classe	Description

Docteur	Cette classe représente l'utilisateur "Docteur". Elle hérite des propriétés de la classe Utilisateur et possède ses propres fonctionnalités spécifiques liées à la médecine, telles que la création de diagnostics, d'ordonnances et de plans de traitement.
Assistante	Cette classe représente l'utilisateur "Assistante". Elle hérite de la classe Utilisateur et gère les fonctions administratives du cabinet comme la gestion des patients, des rendez-vous, des appels et des rappels.
Patient	Représente une personne qui consulte le cabinet. Cette classe stocke toutes les informations personnelles et de contact du patient.
RendezVous	Représente une consultation planifiée entre un patient et le docteur. La classe contient des informations comme la date, l'heure, le motif et le statut du rendez-vous.
Dossier	C'est la classe qui rassemble tout l'historique médical d'un patient. Un dossier est lié à une ou plusieurs Consultations.
Consultation	Cette classe enregistre les détails d'une visite spécifique. Elle est liée à un Diagnostic et un Traitement, et contient les notes de la consultation.
Diagnostic	Représente le diagnostic médical établi par le docteur pour une Consultation spécifique.
Appel	Cette classe enregistre les appels entrants et sortants pour le suivi administratif. Elle est gérée principalement par l'assistante.
Traitement	Représente les actions médicales ou le protocole de soins à suivre pour résoudre un problème dentaire.

Tableau 2. 1 : Description de diagramme de classe gestion cabinet dentaire

 
 
Conclusion  
Ce chapitre a permis de passer de la vision globale du projet à une conception architecturale et fonctionnelle détaillée de l'application web dentaire. J`avais d'abord spécifié de manière exhaustive les besoins fonctionnels pour chaque rôle d'utilisateur (Docteur, Assistante) ainsi que les exigences non fonctionnelles cruciales, notamment en termes de performance, sécurité, fiabilité et ergonomie, adaptées au contexte web. L'utilisation du langage UML a été fondamentale pour structurer cette analyse : les diagrammes de cas d'utilisation ont défini les fonctionnalités du système du point de vue des acteurs, tandis que les diagrammes de séquence ont illustré les interactions dynamiques pour les scénarios clés comme la sélection de rôle et la gestion des rendez-vous. Enfin, le diagramme de classes a permis de modéliser la structure statique des données et leurs relations au sein de la base de données MySQL, jetant les bases du modèle d'information de l'application. Cette phase de conception rigoureuse garantit une compréhension commune du système et fournit une feuille de route claire pour la prochaine étape cruciale : l'étude technique et la mise en œuvre. 
 
 
 
 
 
 
 










 
 
Chapitre 3 : Etude technique 
 
Introduction 
 
 
 
 Après avoir défini les besoins et conçu l'architecture fonctionnelle de l'application, ce chapitre se consacre à l'étude technique approfondie. Il est primordial de choisir les technologies et les outils les plus adaptés pour garantir la performance, la robustesse, la sécurité et la maintenabilité de l'application web dentaire. J`allais justifier ces choix technologiques, détailler l'architecture technique retenue pour le client web (React.js) et ses interactions avec le backend (Express.js), ainsi que la gestion de la base de données (MySQL).Je présenterais également l'environnement de développement qui a été utilisé. L'objectif est de s'assurer que les fondations techniques sont solides pour une implémentation réussie et une évolution future facilitée.


	3.1 Technologies de développement 

Le choix des technologies est un pilier fondamental pour la réussite du projet. J` avais opté pour un stack technologique moderne, performant et largement supporté par la communauté : le stack MERN (MongoDB, Express, React, Node) adapté avec MySQL pour la base de données, formant un stack PERN ou MERNC (MySQL, Express, React, Node, SQL).
 
 3.1.1 Langages 
        
— JavaScript                                                                                                            
 
JavaScript / TypeScript : Le langage de programmation principal.
Frontend (React.js) : Utilisé pour développer l'interface utilisateur interactive. Il offre une grande flexibilité et est très performant pour les applications monopages (SPA)4.
Backend (Node.js/Express.js) : Permet d'écrire le code serveur dans le même langage que le frontend, facilitant le partage de logique et la réutilisation des compétences. TypeScript pourrait être utilisé pour       améliorer la robustesse et la maintenabilité du code.
                                                                                                                                                                  
— HTML 
 
HTML (HyperText Markup Language) : Le langage de balisage fondamental pour structurer le contenu des pages web, généré par React.js5. 
                                                                                                                                                                      
— CSS
 
CSS (Cascading Style Sheets) : Utilisé pour styliser les éléments HTML et créer les designs modernes avec gradients et animations fluides. Un framework CSS comme Tailwind CSS ou une librairie de composants comme Material UI (ou des modules CSS) sera privilégié pour sa flexibilité et sa performance6.
                                                                                                                                                   

— SQL

SQL (Structured Query Language) : Le langage standard pour interagir avec la base de données relationnelle MySQL, utilisé indirectement via un ORM (Object-Relational Mapping)7.

3.1.2 Framework 
                                                                                                                                            
             — React.js (Frontend) 
 
Description : Une bibliothèque JavaScript de Meta pour construire des interfaces utilisateur. Elle permet de créer des composants d'interface réutilisables et gère efficacement les mises à jour du DOM virtuel, offrant une expérience utilisateur fluide et rapide.
Utilisation : Développement de tous les composants de l'interface graphique (sélection de rôle, dashboards, formulaires patients, calendrier, etc.).
Avantages : Composantisation, performance (DOM virtuel), riche écosystème, forte communauté8.
 
                                                                                                                                                          
            — Express.js (Backend)
 
Description : Un framework web minimaliste et flexible pour Node.js. Il fournit un ensemble robuste de fonctionnalités pour les applications web et mobiles, notamment la gestion des routes HTTP, des middlewares et des requêtes/réponses9.
Utilisation : Construction de l'API RESTful qui expose les endpoints pour la gestion des patients, rendez-vous, consultations, etc., et interagit avec la base de données MySQL.
Avantages : Simplicité, performance, flexibilité, grande communauté.
 
                                                                                                                                                              
— Axios (Frontend) 
 
Description : Une bibliothèque JavaScript basée sur les promesses, utilisée pour effectuer des requêtes HTTP (GET, POST, PUT, DELETE) depuis le frontend (React.js) vers l'API Express.js.
Avantages : API simple et intuitive, gestion automatique de la transformation JSON, support des requêtes annulables10.
	— React Router (Frontend)	 
 
Description : Une bibliothèque de routage standard pour React.js. Elle permet de gérer la navigation entre les différentes vues (pages) de l'application React sans rechargement complet de la page, offrant une expérience SPA (Single Page Application)11.
Utilisation : Gestion de la navigation entre l'interface de sélection de rôle, les dashboards, les listes de patients, les formulaires, etc.


                — Lucide React (Frontend)	 
 
Description : Une bibliothèque d'icônes open-source, moderne et légère, spécifiquement conçue pour React. Elle offre une grande collection d'icônes qui peuvent être personnalisées (taille, couleur, épaisseur du trait)12.
Utilisation : Intégration d'icônes cohérentes et esthétiques dans toute l'interface utilisateur.

3.1.3 Environnement logiciel
   --- Visual Studio                                                                                                           
Visual Studio Code (VS Code) : L'IDE de choix pour le développement JavaScript/TypeScript, offrant un éditeur de code puissant, un débogueur intégré, des extensions pour React, Node.js, et SQL13.


           __   IntelliJ
                                                                                                                                                         
IntelliJ IDEA également appelé « IntelliJ », « IDEA » ou « IDJ » est un environnement de développement destiné au développement de logiciels informatiques14.








      3.1.4 Web services (API REST complète)
L'application est entièrement basée sur une architecture client-serveur communiquant via une API RESTful développée avec Express.js.
Rôle :
Fournir tous les endpoints nécessaires pour la gestion des données (patients, rendez-vous, consultations, ordonnances).
Valider les données entrantes.
Interagir avec la base de données MySQL.
Gérer la logique métier côté serveur.
Générer les documents PDF (ordonnances).
Format d'échange : JSON (JavaScript Object Notation) pour toutes les requêtes et réponses.
Avantages : Standardisation, capacité à être sans état (facilitant l'évolutivité), flexibilité et découplage entre le frontend et le backend.
3.1.5 Système de gestion de base de données (MySQL)
Description : MySQL est un système de gestion de base de données relationnelle (SGBDR) open-source, réputé pour sa performance, sa fiabilité et sa facilité d'utilisation. Il est largement utilisé dans les applications web.
Utilisation : Stockage de toutes les données métier de l'application : informations patients, détails des rendez-vous, historiques des consultations, plans de traitement, ordonnances, etc.
Avantages :
Fiabilité et Intégrité des données : Supporte les transactions ACID et les contraintes de clés étrangères.
Performance : Optimisé pour des volumes de données importants et des requêtes complexes.
Scalabilité : Peut être configuré pour gérer une charge importante et s'adapter à la croissance du cabinet.
Relations optimisées : Permet de modéliser les relations complexes entre les entités (un patient a plusieurs rendez-vous, plusieurs consultations, etc.) de manière efficace.
Gestion : Sequelize sera utilisé comme ORM pour interagir avec MySQL, simplifiant les opérations de base de données.

	3.2  	Architecture technique 
 
 
       Le shema d'architecture technique de l'application web dentaire est une architecture client-serveur classique, basée sur la séparation claire entre le frontend (client web) et le backend (serveur API). 
                                                        
Figure 3. 1: Les couches de l’application 


3.2.1 Schéma d'architecture technique globale (React.js, Express.js, MySQL)
Le shema montre l'application est divisée en trois composants principaux : le client web, le serveur API et la base de données.


Client Web (Frontend - React.js) :
Développé avec React.js, HTML, CSS (Tailwind CSS).
S'exécute dans le navigateur de l'utilisateur.
Contient toute l'interface utilisateur et la logique de présentation.
Communique uniquement avec le serveur API via des requêtes HTTP (Axios).
Serveur API (Backend - Express.js) :
Développé avec Node.js et Express.js.
Hébergé sur un serveur web.
Expose les endpoints de l'API RESTful.
Gère la logique métier, la validation des données, et les autorisations.
Interagit avec la base de données MySQL via Sequelize ORM.
Base de Données (MySQL) :
Système de gestion de base de données relationnelle.
Stocke toutes les informations du cabinet dentaire.
Interagit directement avec le serveur API Express.js.
Schéma d'interaction :
L'utilisateur interagit avec l'Application React.js via son navigateur.
L'Application React.js envoie des requêtes HTTP (GET, POST, PUT, DELETE) à l'API Express.js pour récupérer ou manipuler des données.
L'API Express.js reçoit les requêtes, les traite, effectue la logique métier, et interagit avec la Base de Données MySQL (via Sequelize).
La Base de Données MySQL renvoie les données à l'API Express.js.
L'API Express.js formate la réponse (JSON) et la renvoie à l'Application React.js.
L'Application React.js met à jour son interface utilisateur en fonction des données reçues.
 
 
 
Figure 3. 2: Schéma d'architecture technique globale (React.js, Express.js, MySQL)
 
3.2.2 Architecture interne du client web (React.js)
Au sein du client web, l'architecture est basée sur l'approche par composants de React.js, combinée à une structure modulaire pour les pages et les fonctionnalités.
Composants Réutilisables (Components) :
Petits blocs de UI autonomes et réutilisables (ex: Button, Input, Card, Header, Footer).
Sont agnostiques à la logique métier spécifique et peuvent être utilisés dans différentes parties de l'application.
Intègrent les éléments de design (gradients, animations) et les icônes Lucide React.
Vues / Pages (Views / Pages) :
Composants React de plus haut niveau qui représentent une page entière de l'application (ex: RoleSelectionPage,DoctorDashboardPage,PatientListPage, AppointmentCalendarPage).
Orchestrent l'utilisation des composants réutilisables et gèrent l'état spécifique à la page.
Hooks Personnalisés (Custom Hooks) :
Pour encapsuler la logique réutilisable liée à l'état ou aux effets de bord (ex: usePatientsData pour la récupération des patients, useAppointments pour la gestion du calendrier).
Permettent de séparer la logique de l'interface utilisateur et d'améliorer la maintenabilité.
Contexte API / Gestion d'État (API Context / State Management) :
Utilisation du Context API de React (ou Redux/Zustand pour des applications plus complexes) pour gérer l'état global et les interactions avec l'API.
Permet de centraliser les appels API et de distribuer les données à travers l'arbre des composants sans "prop drilling".
Services (Services) :
Modules JavaScript dédiés à l'interaction avec l'API Express.js (ex: patientService.js, appointmentService.js).
Contiennent les fonctions pour faire les requêtes Axios et gérer les réponses/erreurs.
 
Figure 3.2 : Architecture interne du client web (React.js)
 
 
Conclusion : 

 Ce chapitre a été consacré à l'étude technique approfondie de l`application web dentaire. J`avais justifié le choix du stack technologique moderne (React.js, Express.js, MySQL), soulignant leur rôle dans l'assurance de la performance, la sécurité et la maintenabilité. L'importance de l'API RESTful complète et de la gestion de base de données MySQL (via Sequelize ORM) a été mise en évidence. Enfin, j`avais détaillé l'architecture technique globale client-serveur et l'architecture interne du client web basée sur les composants React.js, illustrant la séparation des préoccupations et la modularité du système. Cette étude technique fournit le cadre et les outils nécessaires pour la phase de mise en œuvre, garantissant que l'application sera construite sur des bases solides et modernes. 
 
Chapitre 4 : Mise en œuvre 
Introduction 
 
    Après les phases d'analyse des besoins et de conception architecturale, ce chapitre aborde la concrétisation du projet : la phase de mise en œuvre. Cette étape cruciale transforme les spécifications et les modèles UML en code fonctionnel. Je décrirais la structure du projet React.js et Express.js, les stratégies de test adoptées pour garantir la qualité et la fiabilité de l'application, et je présenterais des maquettes détaillées des interfaces graphiques principales. Ces maquettes, bien que représentées textuellement ici, vous donneront une idée précise du rendu visuel et de l'expérience utilisateur de l'application web dentaire.

	4.1  Interfaces graphiques 
4.1.1 Scénarios détaillés
Voici des scénarios de test plus détaillés pour les fonctionnalités clés de l'application :
	Scénario de test 1 : Sélection de Rôle et Accès au Dashboard Docteur
Objectif : Vérifier que la sélection du rôle "Docteur" mène au dashboard Docteur personnalisé.

Préconditions : L'application est lancée et l'utilisateur est sur l'interface de sélection de rôle.
Étapes :
	L'utilisateur clique sur le bouton "Docteur" sur la page de sélection de rôle.
	Le système React.js redirige vers le dashboard Docteur.
	Le système frontend envoie une requête API au backend pour récupérer les données du dashboard Docteur.
	Le backend Express.js interroge MySQL pour les statistiques pertinentes du docteur (ex: RDV du jour, nouveaux patients).
	Le système frontend affiche le dashboard Docteur avec les statistiques en temps réel (rendez-vous à venir, nombre de consultations, etc.).
Résultat attendu : L'utilisateur accède au dashboard Docteur, qui affiche des données pertinentes et à jour.


	Scénario de test 2 : Ajout et Consultation d'un Nouveau Patient (Rôle : Docteur)
Objectif : Vérifier que le Docteur peut ajouter un nouveau patient et consulter sa fiche.
Préconditions : Le Docteur est sur son dashboard.
Étapes :
	Le Docteur clique sur la navigation "Patients".
	Le système React.js affiche la liste des patients.
	Le Docteur clique sur le bouton "Ajouter un patient".
	Le système affiche le formulaire de création de patient.
	Le Docteur remplit les champs obligatoires (Nom, Prénom, Date de naissance, Téléphone).
	Le Docteur clique sur "Enregistrer".
	Le système frontend envoie une requête POST à l'API /api/patients.
	L'API Express.js valide les données, utilise Sequelize pour insérer le patient dans MySQL.
	Le système frontend affiche un message de succès et met à jour la liste des patients.
	Le Docteur clique sur le nouveau patient dans la liste pour consulter sa fiche détaillée.
Résultat attendu : Le patient est créé, persistant en base de données, et sa fiche est consultable dans l'interface React.js.
	Scénario de test 3 : Création d'un Rendez-vous (Rôle : Assistante)
Objectif : Vérifier que l'Assistante peut créer un rendez-vous via le calendrier interactif.
Préconditions : L'Assistante est sur son dashboard. Un patient et un docteur existent en base de données.
Étapes :
	L'Assistante clique sur la navigation "Rendez-vous".
	Le système React.js affiche le calendrier interactif.
	L'Assistante clique sur une plage horaire disponible dans le calendrier ou sur un bouton "Ajouter RDV".
	Le système affiche le formulaire de création de rendez-vous.
	L'Assistante sélectionne un patient, une date, une heure, un docteur et un motif.
	L'Assistante clique sur "Enregistrer".
	Le système frontend envoie une requête POST à l'API /api/appointments.
	L'API Express.js valide les données, utilise Sequelize pour insérer le rendez-vous dans MySQL.
Le système frontend affiche un message de succès et met à jour le calendrier.
Résultat attendu : Le rendez-vous est créé, visible dans le calendrier, et persistant en base de données.

4.1.1 Interface de sélection de rôle
Objectif : Permettre aux utilisateurs de choisir leur rôle (Docteur/Assistant) dès le démarrage de l'application sans authentification.
 
                                                           Figure 4.1 : Interface de sélection de rôle 
Description :
	Un écran d'accueil avec un fond élégant utilisant des gradients doux ;
	Le logo du cabinet dentaire est positionné au centre ;
	Deux grandes cartes interactives clairement étiquetées "Je suis un Docteur" et "Je suis une Assistante" ;
	Chaque carte a une couleur distinctive et visuels ;
	Des icônes pertinentes accompagnent chaque rôle ;
	Design responsive pour s'adapter aux écrans mobiles et de bureau.


4.1.2 Tableau de Bord Docteur
Objectif : Offrir au docteur une vue d'ensemble synthétique et actionable de son activité quotidienne, de son agenda et des indicateurs clés.
 
                       Figure 4.2 : Tableau de Bord Docteur 
Description :
	Message d'accueil personnalisé et résumé de la journée ;
	Affichage du prochain rendez-vous en évidence ;
	Widgets statistiques sur l'activité et comparaisons temporelles ;
	Barre d'actions rapides pour les fonctions principales ;
	Liste des patients du jour avec nature des actes ;
	Indicateurs de performance et satisfaction ;
	Timeline horaire des rendez-vous avec statut ;
	Interface organisée en cartes pour une visualisation claire.
4.1.3 Calendrier des Rendez-vous
Objectif : Visualiser, gérer et planifier les rendez-vous des patients sur une vue hebdomadaire intuitive.
 
                              Figure 4.3 :  Agenda Hebdomadaire 
Description :
	Interface centrale avec le calendrier mensuel/quotidien ;
	Bouton d'ajout de nouveau rendez-vous ("+ Nouveau RDV") ;
	Liste chronologique de tous les rendez-vous programmés ;
	Pour chaque RDV : heure, date, type de consultation et statut ;
	Système de cases à cocher pour suivre l'état (En cours, Terminé) ;
	Filtrage possible par statut des rendez-vous ;
	Vue d'ensemble complète de la charge de travail.
4.1.4 Formulaire de Création d'un Rendez-vous
Objectif : Saisir rapidement toutes les informations nécessaires à la planification d'un nouveau rendez-vous.
 
                  Figure 4.4 :  Formulaire de Rendez-vous 
Description :
	Formulaire modal ou plein écran surgissant lors de l'ajout d'un RDV ;
	Champs de recherche et de sélection du patient (avec création rapide si nouveau) ;
	Sélection de la date, de l'heure de début et de fin, et de la durée ;
	Liste déroulante pour choisir le type d'acte ou de consultation ;
	Zone de notes libres pour des observations spécifiques ;
	Boutons de confirmation "Créer" ou d'annulation.

4.1.5 Liste des Patients
Objectif : Centraliser la liste de tous les patients, offrir des outils de recherche et de filtrage, et permettre un accès rapide à chaque fiche.
 
                                    Figure 4.5 :  Liste des Patients 
Description :
	Vue en liste ou en tableau avec les informations principales : photo, nom, prénom, téléphone ;
	Barre de recherche prominente en haut de l'écran ;
	Filtres rapides pour afficher les "Patients du jour", "Nouveaux patients", etc ;
	Bouton "+" flottant pour ajouter un nouveau patient ;
	Icônes d'action (Voir, Modifier) sur chaque ligne de la liste.



4.1.6 Fiche Patient filtrer
Objectif : Gérer efficacement la liste des patients et d'accéder rapidement aux fonctions principales.
 
                              Figure 4.6 : Filtrer les Patients
Description :
	Interface simplifiée dédiée à l'assistant dentaire ;
	Affichage du nombre total de patients gérés ;
	Fiche patient détaillée avec informations essentielles (nom, âge, contact, profession) ;
	Menu de navigation latéral pour les fonctions principales(Patients, Rendez-vous, Dossiers) ;
	Bouton d'action principal pour ajouter un nouveau patient ;
	Design épuré et fonctionnel optimisé pour l'usage quotidien ;
	Indication visuelle des détails disponibles pour chaque patient.




4.1.7 Formulaire de Création / Édition d'un Patient
Objectif : Saisir ou modifier les informations complètes d'un patient de manière ergonomique et exhaustive.
 
                                 Figure 4.7 : Formulaire Patient 
Description :
	Formulaire progressif ou à onglets reprenant la structure de la fiche détaillée ;
	Champs groupés logiquement : Identité, Coordonnées, Antécédents médicaux ;
	Champs de saisie avec validation (email, téléphone) ;
	Cases à cocher pour les allergies et antécédents courants ;
	Possibilité d'ajouter des pièces jointes (scan de carte vitale, etc.) ;
	Boutons de soumission ("Créer" / "Sauvegarder") et d'annulation.
4.1.8 Dossiers Médicaux

Objectif : Permettre au docteur d'accéder et de consulter l'historique médical complet des patients.
 
              Figure 4.8 :  Dossiers Médicaux
Description :
	Interface dédiée à la consultation des dossiers médicaux ;
	Menu de sélection des patients avec recherche intégrée ;
	Message d'instruction pour guider l'utilisateur ;
	Accès à l'historique complet des consultations ;
	Design médical professionnel et épuré ;
	Navigation intuitive vers les dossiers patients.



    4.1.9 Fiche Médicale Patient

Objectif : Présenter l'historique médical complet d'un patient avec les diagnostics et traitements associés.
 
                           Figure 4.9:  Fiche Médicale Patient
Description :
	Entête avec le nom du patient et nombre total de consultations ;
	Section "Contrôle" avec date et type de consultation ;
	Section "Diagnostic" avec état général et recommandations ;
	Section "Traitement" avec prescriptions médicales ;
	Organisation chronologique des informations médicales ;
	Interface structurée pour une consultation rapide des antécédents ;
	Design médical clair et professionnel.

4.1.10 Détail de Consultation Médicale

Objectif : Afficher le détail complet d'une consultation médicale avec toutes les informations cliniques.
 
                                                                Figure 4.10 : Détail de Consultation Médicale
Description :
	En-tête avec métriques (nombre de données, période) ;
	Date et type de consultation ("Contrôle") ;
	Sections organisées : Diagnostic, Notes, Traitement ;
	Informations détaillées sur l'état du patient ;
	Recommandations pour le suivi médical ;
	Mention du praticien ayant créé la consultation ;
	Notes complémentaires et observations médicales ;
	Interface structurée pour une revue complète du dossier.
4.1.11 Création d'un Dossier Médical
Objectif : Saisir et enregistrer toutes les informations relatives à une nouvelle consultation médicale.

 
               Figure 4.11 : Création d'un Dossier Médical
Description :
	Champs obligatoires : type et date de consultation, diagnostic, traitement ;
	Fonctionnalité d'enregistrement vocal avec transcription automatique ;
	Section dédiée à la prescription médicamenteuse (ordonnance) ;
	Zone de notes complémentaires pour informations supplémentaires ;
	Interface complète de saisie des données cliniques ;
	Validation des champs requis avant enregistrement .
4.1.12 Dossier Médical Patient apres creation

Objectif : Consulter l'historique détaillé des consultations et traitements d'un patient.
 
                  Figure 4.12 : Dossier Médical Patient apres creation
Description :
	En-tête avec identité du patient et nombre total de consultations ;
	Date de consultation et type d'acte médical ;
	Sections détaillées : Diagnostic, Traitement, Notes médicales ;
	Ordonnance complète avec posologie et médicaments prescrits ;
	Notes supplémentaires pour observations cliniques ;
	Historique chronologique des soins prodigués ;
	Interface médicale complète pour le suivi patient.


4.1.13 Dossier Médical Patient - Consultation Téléchargée
Objectif : Visualiser le dossier médical complet d'un patient après téléchargement depuis le système.
 
                Figure 4.13 : Telechargement de Consultation

Description :
	En-tête d'ordonnance médicale avec date de consultation (01/09/2025) .
	Identification patient : Samira Hafid avec diagnostic de sensibilité au froid ; 
	Section prescription médicamenteuse détaillée ;
	Instructions de traitement : Préparation de la dent pour une couronne ; 
	Notes cliniques : Inflammation légère de la gencive autour de la zone de la carie ; 
	Contrôle programmé dans six mois et suivi post-traitement ;
	Signature et cachet du praticien : Dr. [Docteur Asma EL AARKOUBI] ; 
	Format PDF téléchargeable pour archivage et impression .




4.1.14 Interface de Gestion des Ordonnances
Objectif : Gérer et consulter l'ensemble des ordonnances créées avec fonctionnalités de recherche et création.
 
                                 Figure 4.14 : Interface de Gestion des Ordonnances
Description :
	Navigation principale du système DentalAARAKOUBI ;
	Section "Gestion des Ordonnances" avec barre de recherche ; 
	Bouton "Nouvelle Ordonnance" pour créer une prescription ;
	Liste des ordonnances avec informations patient ;
	Détails affichés : date de création, durée de validité, posologie ;
	Actions disponibles : consultation, téléchargement, modification ; 
	Statut "Active" pour le suivi des ordonnances valides .


4.1.15 Détails de l'Ordonnance
Objectif : Consulter les informations détaillées d'une ordonnance sélectionnée depuis la liste de gestion.
 
                     Figure 4.15 : Détails de l'Ordonnance
Description :
	Fenêtre popup modale "Détails de l'Ordonnance" ;
	En-tête avec nom du patient : "Ordonnance - ammor doha" ;
	Date de prescription : 31/08/2025 ;
	Section "Médicaments Prescrits" avec liste des médicaments ; 
	Posologie détaillée pour chaque prescription ;
	Durée du traitement : 7 jours avec statut "Active" ; 
	Zone "Instructions Particulières" pour notes médicales ; 
	Bouton "Télécharger Ordonnance" pour export PDF ;
	Interface de consultation rapide en overlay ;
	Arrière-plan grisé pour focus sur les détails.


4.1.16 Modifier l'Ordonnance
Objectif : Consulter l'ensemble des transactions financières (encaissements, remboursements) de la journée pour une clôture de caisse précise.
 
                    Figure 4.16 : Modifier l'Ordonnance
Description :
	Fenêtre popup modale "Modifier l'Ordonnance" ;
	Sélection du patient via menu déroulant ;
	Champ date de prescription modifiable ;
	Zone de texte "Médicaments" pour éditer les prescriptions ;
	Champ "Posologie" pour ajuster les dosages ;
	Section "Durée du Traitement" avec durée modifiable ;
	Zone "Instructions Particulières" pour notes supplémentaires ;
	Menu déroulant "Statut" (Active/Inactive) ;
	Boutons d'action : "Annuler" et "Modifier" ;
	Formulaire complet de modification en overlay ; 
	Interface d'édition intuitive pour mise à jour rapide.
4.1.17 Ordonnance Médicale Téléchargée
Objectif : Visualiser l'ordonnance médicale au format texte après téléchargement depuis le système.
 
                    Figure 4.17 : Ordonnance Médicale Téléchargée
Description :
	Document texte "ordonnance_ammor_doha_2025-08-30T23_00_00.000Z" ;
	Format d'ordonnance médicale standardisé ;
	En-tête avec titre "ORDONNANCE MÉDICALE" ;
	Date de prescription : 31/08/2025 ;
	Identification patient : ammor doha ; 
	Section "MÉDICAMENTS PRESCRITS" avec dolipranine ;
	Posologie indiquée : 1 ;
	Durée du traitement : 7 jours ;
	Instructions particulières : après ;
	Signature praticien : Dr. [Docteur Asma EL AARKOUBI] ;
	Mention cabinet : Cabinet Dentaire DentalCare ;
	Bouton "Télécharger Ordonnance" pour sauvegarde ;
	Format texte lisible pour impression et archivage.




4.1.18 Interface Diagnostic Assisté par IA
Objectif : Utiliser l'intelligence artificielle pour analyser des images dentaires et diagnostiquer des symptômes.
 
                       Figure 4.18  : Interface Diagnostic Assisté par IA
Description :
	Navigation principale du système DentalAARAKOUBI ;
	Section "Diagnostic Assisté par IA" avec bouton "Historique" ;
	Zone "Nouvelle Analyse" pour création d'un diagnostic ;
	Champ "Nom du Patient" avec placeholder ;
	Section "Image Dentaire" avec zone de téléchargement ;
	Icône d'upload pour ajouter une image ;
	Champ "Description Vocale" pour symptômes audio ;
	Bouton "Analyser avec l'IA" pour lancer le diagnostic ;
	Panneau "Résultats de l'Analyse" avec état d'attente ;
	Message "Prêt pour l'Analyse" avec instructions ;
	Interface moderne pour diagnostic intelligent ;
	Analyse d'images et symptômes par intelligence artificielle.


     4.1.19 Résultats du Diagnostic IA - Gingivite Modérée
Objectif : Afficher les résultats d'analyse par intelligence artificielle pour un diagnostic de gingivite.
  
                                    Figure 4.19 : Résultats du Diagnostic IA - Gingivite Modérée
Description :
	Patient analysé : samira hafid avec image dentaire uploadée ;
	Niveau de confiance IA : 87% pour le diagnostic ;
	Diagnostic suggéré : "Gingivite modérée" ;
	Niveau de gravité : "Gravité faible" (indicateur vert) ;
	Recommandations thérapeutiques ; 
	Détartrage professionnel ;
	Amélioration de l'hygiène bucco-dentaire ;
	Bain de bouche antiseptique ;
	Boutons d'action : "Nouvelle Analyse" et "Exporter" ; 
	Interface de résultats claire avec codes couleur ;
	Analyse automatisée fiable pour aide au diagnostic.


4.1.20 Résultats du Diagnostic IA - Carie Dentaire Profonde
Objectif : Présenter les résultats d'analyse IA pour un diagnostic de carie dentaire sévère.
 
             Figure 4.20 : Résultats du Diagnostic IA - Carie Dentaire Profonde
Description :
	Patient analysé : akram Salahi avec image dentaire ;
	Niveau de confiance IA : 92% pour le diagnostic ;
	Diagnostic suggéré : "Carie dentaire profonde" ;
	Niveau de gravité : "Gravité Modérée" (indicateur orange) ;
	Recommandations de traitement ;
	Description vocale des symptômes enregistrée ;
	Interface diagnostic avec export des résultats disponible.








      4.1.21 Plans de Traitement - Fiche Patient
                Objectif : Afficher et gérer les plans de traitement pour un patient spécifique.

 
                   Figure 4.21 : Plans de Traitement - Fiche Patient


       Description :
	Page : Plans de Traitement ;
	Patient sélectionné : ammor doha ;
	Contrôles :
	Un menu déroulant pour sélectionner un patient ;
	Un champ de recherche pour trouver un patient rapidement ;
	Un bouton "+ Nouveau Plan" pour créer un nouveau plan de traitement.










4.1.22 Interface de Gestion des Plan
Objectif : Créer un nouveau plan de traitement pour un patient en remplissant les informations nécessaires.


 
                       Figure 4.22 : Capture d'écran :  Interface de Gestion des Plan

Description :
	Titre : Formulaire de création de "Nouveau Plan de Traitement" ;
	Fonction : Permet au professionnel de saisir les détails d'un plan de traitement pour un patient ;
	Contenu : Le formulaire inclut des champs pour le titre du plan, la description, le coût estimé, le statut, ainsi que les dates de début et de fin prévues ;
	Actions : L'utilisateur peut annuler ou enregistrer le plan de traitement une fois le formulaire rempli.














4.1.23  Plans de Traitement - Fiche de Détail

Objectif : Afficher les informations détaillées d'un plan de traitement enregistré.


 
                    Figure 4.23 : Plans de Traitement - Fiche de Détail
Description :

	Titre : Page d'affichage d'un plan de traitement existant ;
	Fonction : Permet de visualiser les détails d'un plan de traitement après son enregistrement ;
	Contenu : Affiche la fiche du plan de traitement "Détartrage complet", avec les informations clés :
	La période du traitement (Du 06/08/2025 au 26/08/2025) ;
	Le coût (450,00 DH) ;
	Une description détaillée du traitement ;
	Le statut actuel (En cours) ;
	Actions : La fiche du plan de traitement inclut des icônes pour modifier, visualiser ou supprimer.






4.1.24 Analyses et Statistiques - Tableau de Bord
Objectif : Fournir un aperçu des performances et des activités du cabinet dentaire.

 
                                                        Figure 4.24 : Analyses et Statistiques - Tableau de Bord


Description :
	Page : "Analyses et Statistiques", un tableau de bord ;
	Indicateurs Clés : Affiche des métriques essentielles avec leur évolution, comme le nombre de Patients Totaux, de RDV, de Consultations et le taux de Satisfaction ;
	Statut des Rendez-vous : Représente graphiquement le nombre de rendez-vous confirmés, en attente et terminés ;
	Évolution Mensuelle : Montre, mois par mois, l'évolution du nombre de patients, de rendez-vous (RDV) et du chiffre d'affaires (CA) ;
	Fonctionnalité : Permet une vue d'ensemble rapide de l'activité du cabinet pour prendre des décisions éclairées.


4.1.25 Dashboard Assistante Principal 
Objectif : Tableau de bord principal avec vue d'ensemble des activités et accès rapide aux fonctionnalités.
 
Figure 4.25 : Dashboard Assistante Principal 
Description :
	Message d'accueil "Bonjour Assistant(e)!" avec statistiques du jour ;
	Métriques principales : 12 RDV, 4 patients en attente, 6 confirmés, 2 appels ;
	Section "Actions Rapides" avec raccourcis système ;
	Planning journalier avec liste des rendez-vous ;
	Détails par RDV : heure, patient, type, statut (Confirmé/En attente/Reporté) ;
	Interface de navigation rapide vers toutes les fonctionnalités ;
	Dashboard complet pour gestion quotidienne du cabinet.
4.1.26 Interface de Gestion des Patients 
Objectif : Gérer et consulter la base de données des patients avec recherche et création de nouveaux dossiers.
 
     Figure 4.26  : Interface de Gestion des Patients
Description :
	Section "Gestion des Patients" avec total de 7 patients ;
	Barre de recherche et bouton "Nouveau Patient" ;
	Grille de fiches patients avec nom, âge, téléphone, email ;
	Actions disponibles : "Détails" et modification par fiche ;
	Interface en cartes pour navigation rapide des dossiers.






4.1.27 Formulaire Nouveau Patient
Objectif : Créer un nouveau dossier patient avec saisie des informations personnelles et médicales de base.
 
        Figure 4.27 : Formulaire Nouveau Patient
Description :
	Popup modal "Nouveau Patient" avec formulaire de création ;
	Champs obligatoires : Nom et Prénom du patient ;
	Informations de contact : Téléphone et Email ;
	Date de naissance avec sélecteur de date ;
	Menu déroulant "Sexe" (Masculin/Féminin) ;
	Champ "Profession" pour informations complémentaires ;
	Zone de texte "Adresse" pour coordonnées complètes ;
	Boutons d'action : "Annuler" et "Ajouter" ;
	Formulaire complet pour création rapide de dossier patient.


4.1.28 Calendrier des Rendez-vous
Objectif : Gérer et visualiser la planification des consultations avec vue d'ensemble des rendez-vous quotidiens.
 
Figure 4.28 : Calendrier des Rendez-vous
Description :
	En-tête "Calendrier des Rendez-vous" avec date sélectionnée (01/09/2025) ;
	Statistiques du jour : 6 Planifiés, 5 Confirmés, 1 En cours, 1 Terminé ;
	Liste chronologique des rendez-vous avec horaires précis ;
	Informations par RDV : patient type de consultation ;
	États visuels avec codes couleur : Confirmé, Reporté, Planifié, Annulé ;
	Actions disponibles : modification, suppression, confirmation ;
	Barre de recherche et bouton "Nouveau RDV" ;
	Interface de planification complète pour gestion quotidienne.





4.1.29 Formulaire Nouveau Rendez-vous
Objectif : Créer un nouveau rendez-vous avec sélection du patient, type de consultation et planification horaire.
 
                                                     Figure 4.29 : Formulaire Nouveau Rendez-vous
Description :
	Popup modal "Nouveau Rendez-vous" avec formulaire de création ;
	Menu déroulant "Patient" pour sélectionner depuis la base ;
	Sélection "Type de Consultation" via menu déroulant ;
	Champ "Date" avec sélecteur (01/09/2025) ;
	Menu "Heure" pour choisir le créneau (08:00) ; 
	Statut par défaut "Planifié" modifiable ;
	Zone "Notes" pour informations particulières ;
	Boutons d'action : "Annuler" et "Ajouter" ;
	Interface de planification rapide et intuitive.





4.1.30 Interface Assistant(e) - Confirmation des rendez-vous
Objectif : Valider et confirmer les rendez-vous planifiés des patients, en assurant une gestion fluide et sans erreur de l'agenda.
                     
Figure 4.30 : Capture d'écran : Confirmation des rendez-vous

       Description :
	Le tableau de bord affiche le nombre de rendez-vous en attente de confirmation et le nombre de rendez-vous confirmés pour la journée ;
	Une liste détaillée présente les rendez-vous à confirmer, avec l'heure, le nom du patient, le type de consultation (Orthodontie, Consultation générale, etc.) et les informations de contact ;
	L'assistant(e) peut confirmer chaque rendez-vous individuellement en cliquant sur le bouton "Confirmer" à côté de chaque entrée.


4.1.31 Interface Dossiers Médicaux
Objectif : Saisir de manière structurée et complète les antécédents médicaux et les allergies d'un nouveau patient.
 
Figure 4.31 : Capture d'écran : Interface Dossiers Médicaux
Description :
	Section "Dossiers Médicaux" avec sélection patient ;
	Barre de recherche pour navigation rapide ;
	En-tête patient avec nombre de consultations au total ; 
	Consultation affichée du 30/08/2025 avec statut "Ouvert" ; 
	Sections détaillées : Diagnostic, Traitement, Notes ;
	Informations cliniques : "RDV de contrôle dans 6 mois" ;
	Interface de consultation médicale pour suivi patient ;
	Historique chronologique des soins et traitements.






4.1.32 Interface Rappels et Notifications
Objectif : Informer l'utilisateur en temps réel d'un événement important nécessitant son attention immédiate.
 
Figure 4.32 : Capture d'écran : Interface Rappels et Notifications
Description :
	Section "Rappels et Notifications" avec filtres par type et statut ;
	Compteurs : 3 Planifiés, 0 Envoyés, 1 SMS, 1 Appels ;
	Liste des rappels avec patients et dates programmées ;
	Actions disponibles : Envoyer, éditer, supprimer ;
	Interface de communication automatisée pour suivi patient .
4.1.33 Modifier Rappel
Objectif : Modifier un rappel existant avec mise à jour des paramètres de notification et du contenu du message.
 
Figure 4.33 : Capture d'écran : Modifier Rappel
Description :
	Formulaire de modification avec patient (akram Salahi) et type "Rendez-vous" ; 
	Méthode "SMS", date (01/09/2025) et heure (09:00) modifiables ;
	Zone de texte pour personnaliser le message ;
	Boutons "Annuler" et "Programmer" pour validation.

4.1.34 Interface Rappels et Notifications - État Mis à Jour
Objectif : Visualiser l'état actualisé des rappels après modification avec nouveaux compteurs d'activité.
 
                Figure 4.34 : Interface Rappels et Notifications - État Mis à Jour
Description :
	Compteurs actualisés : 3 Planifiés, 0 Envoyés, 2 SMS, 1 Appels ;
	Liste des rappels programmés avec dates et heures ;
	Bouton "Envoyer" disponible pour chaque rappel ;
	Interface de suivi des notifications mises à jour.










4.1.35 Interface Liste des Appels
Objectif : Gérer et suivre l'historique des appels entrants et sortants avec les patients.
 
                   Figure 4.35 : Interface Liste des Appels
Description :
	Section "Liste des Appels" avec recherche et bouton "Nouvel Appel" ;
	Historique des communications avec patients et statuts ;
	Compteurs : 1 En attente, 0 En cours, 1 Terminé, 0 Manqué ; 
	Boutons d'appel direct pour contact immédiat ;
	Interface de gestion des communications téléphoniques.

4.1.36 Interface Appel en Cours
Objectif : Gérer un appel téléphonique actif avec contrôles d'appel et interface de communication en temps réel.
 
                              Figure 4.36 : Capture d'écran : Interface Appel en Cours
Description :
	Barre d'appel active avec patient "ammor doha" et numéro affiché ;
	Contrôles d'appel : sourdine, micro, raccrocher ;
	Zone centrale "Aucun appel trouvé" avec message de recherche ;
	Compteurs mis à jour : 0 En attente, 1 En cours, 1 Terminés, 0 Manqués ;
	Interface de gestion d'appel en temps réel intégrée au système.




4.1.37 Statistique- Rôle d'Assistante

Objectif : Fournir à l'assistante dentaire les statistiques clés liées à ses responsabilités quotidiennes,comme la gestion des rendez-vous et le suivi administratif.


 
                                 Figure 4.37 : Capture d'écran : Statistique- Rôle d'Assistante

     Description :

	Page : Tableau de bord adapté pour les assistantes ;
	Indicateurs clés : Affiche des métriques comme les rendez-vous créés, les rappels envoyés, les patients confirmés et les nouveaux dossiers patients ;
	Statut des Rendez-vous : Présente la répartition des rendez-vous par statut ;
	Évolution : Suit l'activité administrative et le nombre de rendez-vous gérés sur une période donnée pour évaluer la charge de travail.


4.1.38 Interface Assistant(e) - Chatbot d'urgence
Objectif : Fournir à l'assistant(e) un outil de support intelligent pour la gestion des cas d'urgence, en lui donnant des conseils basés sur les symptômes décrits par le patient.


  
                                  Figure 4.38 : Capture d'écran : Chatbot d'urgence
                       Description :
	Un chatbot IA (DentalAssist AI) apparaît pour fournir un support en cas d'urgence ;
	L'assistant(e) peut décrire les symptômes du patient ou choisir des mots-clés prédéfinis (Douleur  intense, Saignement) pour obtenir des conseils immédiats.





4.1.39 Interface Assistant(e) - Chatbot d'urgence exemple de gonflement
Objectif : Fournir à l'assistant(e) un outil de support intelligent pour la gestion des cas d'urgence, en lui donnant des conseils basés sur les symptômes décrits par le patient.

                          
Figure 4.39 : Capture d'écran : Chatbot d'urgence exemple de gonflement
Description :
	Un chatbot IA (DentalAssist AI) apparaît pour fournir un support en cas d'urgence ;
	L'assistant(e) peut décrire les symptômes du patient ou choisir des mots-clés prédéfinis (par exemple, "Douleur intense", "Saignement gencives", "Gonflement", "Dent cassée", "Infection", "Sensibilité") pour obtenir des conseils immédiats.ici c`est le cas Gonflement.


Conclusion  
 
Ce chapitre a concrétisé les efforts d'analyse et de conception en présentant les aspects clés de la mise en œuvre de l` application web dentaire. J`avais détaillé la structure modulaire du projet, divisée entre le frontend React.js et le backend Express.js, essentielle pour une gestion de code efficace et une collaboration fluide. La stratégie de tests, avec des exemples de scénarios unitaires, d'intégration  a démontré l` engagement envers la qualité et la fiabilité d'une application destinée au domaine médical. Enfin, les maquettes détaillées des interfaces graphiques ont illustré l'ergonomie, la modernité et l'intuitivité de l'application, avec un accent sur le design moderne, les gradients, les animations et les icônes Lucide React. Ces éléments constituent la base solide sur laquelle l'application peut être développée, testée et déployée pour transformer la gestion des cabinets dentaires.

Conclusion Générale et Perspectives 

Ce projet de fin d'études a représenté une expérience particulièrement enrichissante et formatrice, tant sur le plan technique que fonctionnel et personnel. La conception et le développement d'une application web pour la gestion d'un cabinet dentaire, en utilisant un stack technologique moderne (React.js, Express.js, MySQL) et en intégrant des tableaux de bord personnalisés sans authentification complexe, m'ont permis d'appliquer et d'approfondir l'ensemble des connaissances acquises durant mon cursus en Ingénierie Informatique et Réseaux à l'EMSI, ainsi que lors de mes autoformations.
Sur le plan fonctionnel, ce projet a offert une immersion profonde dans les besoins spécifiques et les défis opérationnels du secteur médical, et plus précisément des cabinets dentaires. Comprendre les flux de travail des Docteurs et des Assistant(e)s, identifier les points de friction dans la gestion quotidienne, et traduire ces observations en fonctionnalités logicielles utiles a été un apprentissage précieux. La distinction des rôles avec des dashboards et des interfaces personnalisées a renforcé ma compréhension de l'importance de l'ergonomie et de l'expérience utilisateur dans le succès d'une application métier. L'approche "sans authentification" pour la sélection de rôle a posé un défi intéressant en termes de conception de l'expérience utilisateur et de la gestion des accès via le backend.
Sur le plan technique, j'ai pu réaliser une montée en compétences significative dans le développement web full-stack. La maîtrise de React.js pour le frontend, Express.js pour l'API backend, et MySQL pour la base de données relationnelle a été un défi stimulant. L'intégration de librairies comme Axios pour les requêtes HTTP, React Router pour la navigation, et des outils de design modernes (gradients, animations, Lucide React) a enrichi mon expertise en matière de développement web moderne et performant. La pratique du développement piloté par les tests (TDD) a, quant à elle, consolidé ma compréhension de l'importance de la qualité et de la robustesse du code.
Sur le plan personnel, la gestion d'un projet de cette envergure, depuis l'analyse jusqu'aux maquettes détaillées, a développé mes compétences en autonomie, en résolution de problèmes et en organisation. Bien que réalisé individuellement pour ce rapport, la réflexion sur les méthodologies agiles (SCRUM) m'a préparé au travail collaboratif en équipe.
Cependant, comme tout projet, des défis ont été rencontrés :
Gestion des états React : Maintenir un état cohérent et synchronisé entre les nombreux composants React, surtout avec des données en temps réel.
Optimisation des requêtes API : Assurer la performance de l'API Express.js et optimiser les requêtes MySQL pour gérer des volumes de données potentiellement importants.
Sécurité sans authentification : Concevoir une logique d'autorisation robuste côté backend pour un système qui permet une sélection de rôle sans authentification par identifiant/mot de passe.
Responsive Design : Adapter l'interface pour une expérience optimale sur une multitude d'appareils et de tailles d'écran.


▪	Perspectives
L'application web dentaire développée dans le cadre de ce projet constitue une base solide, mais offre de nombreuses perspectives d'évolution pour l'avenir :
Implémentation d'un système d'authentification robuste : Ajouter un système d'authentification par identifiant/mot de passe plus classique, avec gestion des utilisateurs et des sessions, pour une sécurité accrue et une traçabilité complète des actions.
Intégration de l'Intelligence Artificielle :
	Développement de fonctionnalités d'IA pour l'Docteur au diagnostic visuel (analyse d'images dentaires, radios) ou la recommandation de plans de traitement. Cela pourrait impliquer l'intégration avec des services cloud d'IA (ex: Google Cloud AI, AWS SageMaker) ou des modèles auto-hébergés.
	Intégration de la reconnaissance vocale pour la saisie de notes de consultation.
Module de communication patient : Mettre en place un système de notifications automatisées (email/SMS) pour les rappels de rendez-vous et un chat sécurisé avec les patients.
Portail Patient : Création d'une version simplifiée de l'application destinée aux patients, leur permettant de consulter leurs prochains rendez-vous, l'historique de leurs visites, leurs ordonnances, et de communiquer avec le cabinet.
Intégration avec des systèmes tiers :
	Connectivité avec des logiciels de facturation et de comptabilité externes pour automatiser le processus de facturation et de remboursement.
	Intégration avec des laboratoires dentaires pour l'envoi et le suivi des commandes.
Gestion des stocks : Module pour suivre l'inventaire des consommables et des équipements du cabinet, avec des alertes pour les seuils bas.
Support multi-cabinet : Adapter l'application pour gérer plusieurs cabinets dentaires sous une seule instance, avec des droits d'accès spécifiques.
Améliorations continues de l'UX/UI : Recueillir les retours des utilisateurs réels pour affiner continuellement l'ergonomie, les animations et la fluidité de l'interface.
En somme, ce projet a démontré la faisabilité et la valeur ajoutée d'une application web moderne pour les cabinets dentaires. Il ouvre la voie à une digitalisation complète du secteur, contribuant à des soins plus efficaces, plus précis et une meilleure gestion administrative.




                     Webographie 
(1)	projet, C. de. Méthode Scrum : Le guide complet pour tout comprendre. Chef-de-projet.fr. https://chef-de-projet.fr/methodologie-scrum/ (accessed 2025-08-22).

(2)	Qu’est-ce que le développement piloté par les tests (TDD) ? Exemple. https://www.guru99.com/fr/test-driven-development.html (accessed 2025-08-24).

(3)	Polimetro. UML : définition, types de diagrammes et utilisations dans le développement de logiciels. Polimetro. https://www.polimetro.com/fr/qu%2UML(accessed 2025-08-24).

(4)	Qu’est-ce que le JavaScript ? - Apprendre le développement web | MDN. MDN Web Docs. https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/What_is_JavaScript (accessed 2025-08-24).

(5)	TecnoDigital. Qu’est-ce que le HTML et à quoi ça sert ? Informática y Tecnología Digital. https://informatecdigital.com/fr/Qu%27est-ce-que-le-HTML (accessed 2025-08-24).

(6)	dire ? Q. CSS : Définition & principes de base | Que veut dire. Que veut dire ? https://queveutdire.com/technologie/css-definition/(accessed 2025-08-24).

(7)	Robert, J. SQL : Tout savoir sur le langage des bases de données. DataScientest. https://datascientest.com/sql-tout-savoir (accessed 2025-08-24).

(8)	React – Une bibliothèque JavaScript pour créer des interfaces utilisateurs. https://fr.legacy.reactjs.org/ (accessed 2025-08-24).

(9)	Express - Node.js web application framework. https://expressjs.com/ (accessed 2025-08-24).

(10)	Guide complet pour travailler avec Axios - En Cause. https://encause.fr/. https://encause.fr/guide-complet-pour-travailler-avec-axios/ (accessed 2025-08-28).
(11)	React Router. GeeksforGeeks. https://www.geeksforgeeks.org/reactjs/reactjs-router/ (accessed (accessed 2025-08-28).

(12)	Lucide Icons. Lucide. https://lucide.dev (accessed 2025-08-29).

(13)	Visual Studio : IDE et Éditeur de Code pour les Développeurs de Logiciels et les Équipes. Visual Studio. https://visualstudio.com/fr/(accessed 2025-08-29).

(14)	IntelliJ IDEA. https//datascientest.com/intellij 2024(accessed 2025-08-28).

pour ranner le projet le backend ouvrir sur intelij tapper dans le terminal :node server.js
le rest du projet ouvrir avec vs code tapper dans le terminal :npm run dev 




