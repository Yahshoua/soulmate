-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  sam. 07 mars 2020 à 21:36
-- Version du serveur :  10.1.41-MariaDB-0+deb9u1
-- Version de PHP :  7.1.14

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
-- Structure de la table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `id_exp` int(11) NOT NULL,
  `id_dest` int(11) NOT NULL,
  `dates` varchar(255) NOT NULL,
  `messages` text NOT NULL,
  `etat` int(11) NOT NULL,
  `chaine` text NOT NULL,
  `photo` text NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id`, `id_exp`, `id_dest`, `dates`, `messages`, `etat`, `chaine`, `photo`, `nom`) VALUES
(1, 11, 3, 'sa 03.2020 Ã  20:32', 'xxxx', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(2, 11, 3, 'sa 03.2020 Ã  20:53', 'vsdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(3, 11, 3, 'sa 03.2020 à 21:05', 'ddd', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(4, 11, 3, 'sa 03.2020 à 21:09', 'ddd', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(5, 11, 3, 'sa 03.2020 à 21:10', 'hello', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(6, 11, 3, 'sa 03.2020 à 21:12', 'hellos', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(7, 11, 3, 'sa 03.2020 à 21:14', 'he', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(8, 11, 3, 'sa 03.2020 à 21:14', 'hedfg', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(9, 11, 3, 'sa 03.2020 à 21:15', 'gfb', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(10, 11, 3, 'sa 03.2020 à 21:16', 'slt', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(11, 11, 3, 'samedi mars.2020 à 21:18', 'yy', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(12, 11, 3, 'samedi 07 mars.2020 à 21:19', 'rer', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(13, 11, 3, 'samedi 07 mars.2020 à 21:27', 'sd', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(14, 11, 3, 'samedi 07 mars.2020 à 21:28', 'sdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(15, 11, 3, 'samedi 07 mars.2020 à 21:28', 'sdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(16, 11, 3, 'samedi 07 mars.2020 à 21:28', 'sdvsdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(17, 11, 3, 'samedi 07 mars.2020 à 21:28', 'vsdvs', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(18, 11, 3, 'samedi 07 mars.2020 à 21:28', 'vsdvsdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(19, 11, 3, 'samedi 07 mars.2020 à 21:28', 'vsdvsdv', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(20, 11, 3, 'samedi 07 mars.2020 à 21:28', 'hiha', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(21, 11, 3, 'samedi 07 mars.2020 à 21:28', 'youpi', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(22, 11, 3, 'samedi 07 mars.2020 à 21:30', 'zefz', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(23, 11, 3, 'samedi 07 mars.2020 à 21:30', 'zefzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(24, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fzefe', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(25, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fzefz', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(26, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fzefzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(27, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fezfzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(28, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(29, 11, 3, 'samedi 07 mars.2020 à 21:30', 'fzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(30, 11, 3, 'samedi 07 mars.2020 à 21:31', 'fzef', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony'),
(31, 11, 3, 'samedi 07 mars.2020 à 21:31', 'uuuu', 0, 'urjUaHf9aMTwwEfN7MyqIfvMu86DR8XdUbHgrnrsWcSSbMmmB2', '../assets/images/homme.png', 'Anthony');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
