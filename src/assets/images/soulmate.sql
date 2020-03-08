-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 07 mars 2020 à 19:56
-- Version du serveur :  5.7.26
-- Version de PHP :  7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `soulmate`
--

-- --------------------------------------------------------

--
-- Structure de la table `album`
--

DROP TABLE IF EXISTS `album`;
CREATE TABLE IF NOT EXISTS `album` (
  `id_user` int(11) NOT NULL,
  `photo` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `album`
--

INSERT INTO `album` (`id_user`, `photo`) VALUES
(1, 'https://i.picsum.photos/id/210/200/300.jpg'),
(1, 'https://i.picsum.photos/id/212/200/300.jpg'),
(1, 'https://i.picsum.photos/id/214/200/300.jpg'),
(1, 'https://i.picsum.photos/id/211/200/300.jpg'),
(1, 'https://i.picsum.photos/id/213/200/300.jpg'),
(3, 'https://i.picsum.photos/id/211/200/300.jpg'),
(3, 'https://i.picsum.photos/id/214/200/300.jpg'),
(4, 'https://i.picsum.photos/id/210/200/300.jpg'),
(4, 'https://i.picsum.photos/id/211/200/300.jpg'),
(4, 'https://i.picsum.photos/id/212/200/300.jpg'),
(4, 'https://i.picsum.photos/id/213/200/300.jpg'),
(5, 'https://i.picsum.photos/id/210/200/300.jpg'),
(3, 'https://i.picsum.photos/id/213/200/300.jpg'),
(5, 'https://i.picsum.photos/id/212/200/300.jpg'),
(3, 'https://i.picsum.photos/id/212/200/300.jpg'),
(5, 'https://i.picsum.photos/id/211/200/300.jpg'),
(3, 'https://i.picsum.photos/id/210/200/300.jpg'),
(6, 'https://i.picsum.photos/id/210/200/300.jpg'),
(6, 'https://i.picsum.photos/id/211/200/300.jpg'),
(6, 'https://i.picsum.photos/id/212/200/300.jpg'),
(6, 'https://i.picsum.photos/id/213/200/300.jpg'),
(6, 'https://i.picsum.photos/id/214/200/300.jpg'),
(7, 'https://i.picsum.photos/id/210/200/300.jpg'),
(7, 'https://i.picsum.photos/id/211/200/300.jpg'),
(7, 'https://i.picsum.photos/id/213/200/300.jpg'),
(7, 'https://i.picsum.photos/id/212/200/300.jpg'),
(7, 'https://i.picsum.photos/id/214/200/300.jpg'),
(4, 'https://i.picsum.photos/id/214/200/300.jpg'),
(5, 'https://i.picsum.photos/id/214/200/300.jpg'),
(5, 'https://i.picsum.photos/id/213/200/300.jpg'),
(8, 'https://i.picsum.photos/id/210/200/300.jpg'),
(8, 'https://i.picsum.photos/id/212/200/300.jpg'),
(8, 'https://i.picsum.photos/id/211/200/300.jpg'),
(8, 'https://i.picsum.photos/id/213/200/300.jpg'),
(8, 'https://i.picsum.photos/id/214/200/300.jpg'),
(9, 'https://i.picsum.photos/id/211/200/300.jpg'),
(9, 'https://i.picsum.photos/id/210/200/300.jpg'),
(9, 'https://i.picsum.photos/id/212/200/300.jpg'),
(9, 'https://i.picsum.photos/id/214/200/300.jpg'),
(9, 'https://i.picsum.photos/id/213/200/300.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `blacklist`
--

DROP TABLE IF EXISTS `blacklist`;
CREATE TABLE IF NOT EXISTS `blacklist` (
  `id_user` int(11) NOT NULL,
  `id_blocker` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `centreinteret`
--

DROP TABLE IF EXISTS `centreinteret`;
CREATE TABLE IF NOT EXISTS `centreinteret` (
  `id_user` int(11) NOT NULL,
  `music` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `film` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passeTemps` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sport` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `aime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deteste` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `centreinteret`
--

INSERT INTO `centreinteret` (`id_user`, `music`, `film`, `passeTemps`, `sport`, `aime`, `deteste`) VALUES
(1, 'Gospel', 'Titanic', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_exp` int(11) NOT NULL,
  `id_dest` int(11) NOT NULL,
  `dates` varchar(255) NOT NULL,
  `messages` text NOT NULL,
  `etat` int(11) NOT NULL,
  `chaine` text NOT NULL,
  `photo` text NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id`, `id_exp`, `id_dest`, `dates`, `messages`, `etat`, `chaine`, `photo`, `nom`) VALUES
(1, 11, 3, 'sa 03.2020 Ã  20:32', 'xxxx', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(2, 11, 3, 'sa 03.2020 Ã  20:53', 'vsdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `id_user` int(11) NOT NULL,
  `id_son_favoris` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `flash`
--

DROP TABLE IF EXISTS `flash`;
CREATE TABLE IF NOT EXISTS `flash` (
  `id_flasher` int(11) NOT NULL,
  `id_flasheur` int(11) NOT NULL,
  `reponse` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `flash`
--

INSERT INTO `flash` (`id_flasher`, `id_flasheur`, `reponse`) VALUES
(11, 2, NULL),
(11, 3, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `modevie`
--

DROP TABLE IF EXISTS `modevie`;
CREATE TABLE IF NOT EXISTS `modevie` (
  `id_user` int(11) NOT NULL,
  `situation` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `habitation` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enfants` int(11) DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apparence` int(11) DEFAULT NULL,
  `taille` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poids` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `modevie`
--

INSERT INTO `modevie` (`id_user`, `situation`, `habitation`, `enfants`, `profession`, `apparence`, `taille`, `poids`) VALUES
(1, 'Marié', NULL, 3, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_exp` int(11) NOT NULL,
  `id_desti` int(11) NOT NULL,
  `etat` int(11) NOT NULL,
  `messages` varchar(255) NOT NULL,
  `nom_exp` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `types` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `id_exp`, `id_desti`, `etat`, `messages`, `nom_exp`, `createdAt`, `types`) VALUES
(1, 11, 3, 0, 'Anthony Vous a ecrit sur le chat. Clic pour voir le message', 'Anthony', '2020-03-07T20:28:28+01:00', 'chat'),
(2, 11, 3, 0, 'Anthony Vous a ecrit sur le chat. Clic pour voir le message', 'Anthony', '2020-03-07T20:29:56+01:00', 'chat'),
(3, 11, 3, 0, 'Anthony Vous a ecrit sur le chat. Clic pour voir le message', 'Anthony', '2020-03-07T20:32:13+01:00', 'chat'),
(4, 11, 3, 0, 'Anthony Vous a ecrit sur le chat. Clic pour voir le message', 'Anthony', '2020-03-07T20:53:30+01:00', 'chat');

-- --------------------------------------------------------

--
-- Structure de la table `suggestions`
--

DROP TABLE IF EXISTS `suggestions`;
CREATE TABLE IF NOT EXISTS `suggestions` (
  `id_user` int(11) NOT NULL,
  `id_suggereur` int(11) NOT NULL,
  `sujet` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `suggestions`
--

INSERT INTO `suggestions` (`id_user`, `id_suggereur`, `sujet`) VALUES
(2, 11, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genre` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `datenaiss` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `adresse` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passwords` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` text COLLATE utf8_unicode_ci,
  `dateInscri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `insc_type` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chaine_notif` text COLLATE utf8_unicode_ci,
  `confirm` int(11) DEFAULT NULL,
  `numero` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `about` text COLLATE utf8_unicode_ci,
  `latitude` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `longitude` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `genre`, `datenaiss`, `email`, `adresse`, `passwords`, `images`, `dateInscri`, `insc_type`, `chaine_notif`, `confirm`, `numero`, `about`, `latitude`, `longitude`) VALUES
(1, 'Dean Simon', 'Femme', '1991-01-09', 'deansimon@xumonk.com', '522 Harman Street, Dante, West Virginia', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/230/200/300.jpg', '2020-03-05T23:03:34+01:00', 'formulaire', 'pOFLOucIhpSFXyiArkAewmi6w3sLJ0C1tAy5Z9Xnx3TMLdb7I5', 0, '+1 (926) 519-2963', NULL, '48.627463', '2.401714'),
(2, 'Justine Drake', 'Femme', '1996-10-09', 'justinedrake@xumonk.com', '124 Arlington Place, Hinsdale, Indiana', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/231/200/300.jpg', '2020-03-05T23:03:34+01:00', 'formulaire', '229s8K91GX44NXqBPg775iNgUGrTzSbH7Tn8nQl04MPOwrdFBf', 0, '+1 (957) 533-2571', NULL, '48.640055', '2.410061'),
(3, 'Morgan Reeves', 'Homme', '1999-11-08', 'morganreeves@xumonk.com', '961 Glendale Court, Glenbrook, Arkansas', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/232/200/300.jpg', '2020-03-05T23:03:34+01:00', 'formulaire', '4HKyYh7cp1fml3mGh640wLCQViYydybC02SQMGdge2aMcLLBbc', 0, '+1 (972) 411-2773', NULL, '48.636454', '2.403710'),
(4, 'Tabatha Pope', 'Homme', '1990-05-02', 'tabathapope@xumonk.com', '330 Oliver Street, Loma, Tennessee', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/233/200/300.jpg', '2020-03-05T23:03:34+01:00', 'formulaire', 'IcfTemGW8QXAzEij4wZtPCGQUmx381nPR2pRI5n8oSQRGUz2EH', 0, '+1 (933) 428-3956', NULL, '48.623605', '2.396243'),
(5, 'Fields Wise', 'Femme', '1993-05-18', 'fieldswise@xumonk.com', '397 Frank Court, Nicut, Minnesota', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/234/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'QvFeuCDkNP0FV5VM3R28PQuOc498bjiwfoODXgCrXlJDoaGcph', 0, '+1 (970) 480-2231', NULL, '48.644054', '2.337663'),
(6, 'Lesley Kelley', 'Femme', '1997-07-19', 'lesleykelley@xumonk.com', '602 Dakota Place, Statenville, New Mexico', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/235/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'oghNrMS7s0C7Hq2sHBiQ89kLJ41CoPHGW1TJbCdnCWV133Ivjf', 0, '+1 (807) 457-3074', NULL, '43.552309', '153.440847'),
(7, 'Rhodes Walter', 'Homme', '1998-06-20', 'rhodeswalter@xumonk.com', '512 Post Court, Norvelt, North Carolina', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/236/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'i4isNpoZcJUwejRhSGsxHK2j5bxE6nTHFnCTDTM3tfKnuDeXyt', 0, '+1 (895) 578-3717', NULL, '48.646691', '2.377918'),
(8, 'Malinda Maynard', 'Femme', '1994-08-19', 'malindamaynard@xumonk.com', '390 School Lane, Ribera, Virginia', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/237/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'PbbZXgyR9YjtJ0QC5wOUGgLcs8TlTXIh9nudhfcseP7K0TKczz', 0, '+1 (838) 600-3895', NULL, '48.652134', '2.387445'),
(9, 'Aurora Mueller', 'Homme', '1999-11-19', 'auroramueller@xumonk.com', '291 Alice Court, Grenelefe, Delaware', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/238/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'p9fSMoHRoQiIpqKggtIqphO8KGxVoLFIomF2nlVoNHtm18ZaXs', 0, '+1 (913) 507-3642', NULL, '48.623378', '2.406521'),
(10, 'Jane Britt', 'Homme', '1992-03-17', 'janebritt@xumonk.com', '613 Newkirk Placez, Neibert, Rhode Island', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'https://i.picsum.photos/id/239/200/300.jpg', '2020-03-05T23:03:35+01:00', 'formulaire', 'K8UU46MmbEtH3xklEjcRE6LyzdX5LmUHahY25kqXqxpYo6RL2e', 0, '+1 (959) 505-2802', NULL, '48.615662', '2.432957'),
(11, 'Anthony', 'Femme', '1998-07-05T23:03:35.988+02:00', 'anthony@gmail.com', '91025 Cedex, 2 Rue AndrÃ© Lalande, 91000 Ã‰vry, France', '1234', '../assets/images/homme.png', '2020-03-05T23:04:41+01:00', 'formulaire', 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', 0, '01234567', NULL, '48.623446699999995', '2.4257705');

-- --------------------------------------------------------

--
-- Structure de la table `visitefaite`
--

DROP TABLE IF EXISTS `visitefaite`;
CREATE TABLE IF NOT EXISTS `visitefaite` (
  `id_user` int(11) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `dates` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
