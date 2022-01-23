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
  PRIMARY KEY (`eventId`,`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
