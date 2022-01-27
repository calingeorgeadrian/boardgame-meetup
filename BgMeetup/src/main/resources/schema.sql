CREATE DATABASE `bgmeetup`;

USE bgmeetup;

CREATE TABLE `event` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `hostId` varchar(36) CHARACTER SET utf8 NOT NULL,
  `title` varchar(128) CHARACTER SET utf8 NOT NULL,
  `location` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `reqNumberOfPlayers` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `event_participant` (
  `eventId` varchar(36) NOT NULL,
  `participantId` varchar(36) NOT NULL,
  `inviterId` varchar(36) NOT NULL,
  PRIMARY KEY (`eventId`,`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `email` varchar(256) CHARACTER SET utf8 NOT NULL,
  `firstName` varchar(128) CHARACTER SET utf8 NOT NULL,
  `lastName` varchar(128) CHARACTER SET utf8 NOT NULL,
  `location` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `passwordHash` varbinary(128) NOT NULL,
  `passwordSalt` varbinary(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `game` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `title` varchar(128) CHARACTER SET utf8 NOT NULL,
  `description` mediumtext CHARACTER SET utf8 DEFAULT NULL,
  `minPlayers` int(11) NOT NULL,
  `maxPlayers` int(11) NOT NULL,
  `playingTime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8mb4;
