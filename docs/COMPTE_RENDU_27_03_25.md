## Ce qui a été réalisé dans le projet du 10/02/2025 au 28/03/2025 ##

- Création de composant générique (Input, SelectInput, Tbody, Thead, FormationCard, EquipeMember)

- Centralisation des messages d'erreur via apiClient et Toastify

- Remplacement du CSS par du Bootstrap (certains éléments utilisent quand meme du css notemment pour les variant de couleur)

- Page Admin de gestion des utilisateurs :
    * L'ajout d'utilisateur admin, formateur et étudiant est fonctionnel
    * La modification d'utilisateur est fonctionnel
    * le tri et la recherche d'utilisateur est fonctionnel

- Page Admin Formation :
    * Ajouter une formation est fonctionnel et complète
    * Modifier une formation est fonctionnel
    * le tri et la recherche de formation est fonctionnel

- Page Admin Promotion :
    * Ajouter une promotion
    * Modifier une promotion et ses modules
    * le tri et la recherche de promotion est fonctionnel

- Page de Login :
    * Utilisation d'un compteur retry qui s'affiche dynamiquement en cas de multiple mot de passe érronnés

- Navbar : 
    * Utilisation d'une navbar (header) pour les non-connectés
    * NavBar pour les connectés

- HomePage : 
    * Utilisation des user avec le role admin en base de donnée pour l'équipe
    * Utilisation des trainings en base de donnée pour les formations cards

## Ce qui est à améliorer ##

- Page Utilisateur : 
    * Ajout de tuteur
    * Au lieu de supprimer un utilisateur, passer son compte en désactivé (Obligation de garder les informations pour le centre de formation pas de problèmes RGPD)
    * Rendre dynamique le changement de rôle dans le formulaire de modification

- Page Formation :
    * Ajouter un option de module "Alternance"

- Navbar :
    * Remettre en forme le responsive

- Gestion de rôle dans le Authcontext :
    * Dans le but d'une amélioration globale du code, il serait interessant de remplacer les isAdmin, isTrainer, par un état Role récupéré par le token. ( et donc remplacer dans toutes les pages isAdmin && isTrainer par une lecture du rôle)


## Ce qui reste à créer ##
- Test Unitaires pour l'ensemble du code

- Formulaire d'ajout d'entreprise pour les alternances

- Ajout de champs pour l'utilisateur tuteur 

- Construire toute la partie Evaluation :
    * Un formateur doit choisir le type d'évaluation
    * Il doit choisir le statut unique de résultat, et ajouter un commentaire/appréciation
    * Le formateur ne doit pas pouvoir modifier l'évaluation
    * Le formateur ne doit voir QUE les évaluations des modules dont il est formateur 

    * Un admin ne peut pas créer une évaluation
    * Un admin doit pouvoir modifier une évaluation réalisé par un formateur
    
    * Un tuteur doit pouvoir voir l'intégralité des évaluations de l'apprenant dont il est en charge
    * Un tuteur doit pouvoir laisser une seule et unique appréciation sur l'alternance : Creer une vue Tuteur

    * Un apprenant doit pouvoir consulter toute ses évaluations : Creer une vue apprenant

- Créer le contenu des pages "CGU, Confidentialité, Règlement et politique"

