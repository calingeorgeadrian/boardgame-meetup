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
  `participantId` varchar(36) DEFAULT NULL,
  `inviterId` varchar(36) NOT NULL,
  `email` varchar(128) NOT NULL,
  `status` int(11) NOT NULL,
  `checkedIn` bit(1) DEFAULT NULL,
  PRIMARY KEY (`eventId`,`email`,`inviterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `user` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `email` varchar(256) CHARACTER SET utf8 NOT NULL,
  `firstName` varchar(128) CHARACTER SET utf8 NOT NULL,
  `lastName` varchar(128) CHARACTER SET utf8 NOT NULL,
  `location` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `bggUsername` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `passwordHash` varbinary(128) NOT NULL,
  `passwordSalt` varbinary(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `game` (
  `id` varchar(36) NOT NULL,
  `bggId` bigint(20) DEFAULT NULL,
  `title` varchar(128) CHARACTER SET utf8 NOT NULL,
  `type` varchar(128) CHARACTER SET utf8 NOT NULL,
  `imageUrl` varchar(1024) DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8 DEFAULT NULL,
  `minPlayers` int(11) DEFAULT NULL,
  `maxPlayers` int(11) DEFAULT NULL,
  `minPlayTime` int(11) DEFAULT NULL,
  `maxPlayTime` int(11) DEFAULT NULL,
  `complexity` float DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_bgg_id` (`bggId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `collection` (
  `userId` varchar(36) NOT NULL,
  `gameBggId` bigint(20) NOT NULL,
  PRIMARY KEY (`userId`,`gameBggId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `proposed_game` (
  `eventId` varchar(36) NOT NULL,
  `gameId` varchar(36) NOT NULL,
  `ownerId` varchar(36) NOT NULL,
  `proposerId` varchar(36) NOT NULL,
  `isChosen` bit(1) NOT NULL,
  PRIMARY KEY (`eventId`,`gameId`,`ownerId`,`proposerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `vote` (
  `eventId` varchar(36) NOT NULL,
  `gameId` varchar(36) NOT NULL,
  `ownerId` varchar(36) NOT NULL,
  `voterId` varchar(36) NOT NULL,
  PRIMARY KEY (`eventId`,`gameId`,`ownerId`,`voterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `score` (
  `id` varchar(36) NOT NULL,
  `eventId` varchar(36) NOT NULL,
  `gameId` varchar(36) NOT NULL,
  `participantId` varchar(36) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `feedback` (
  `id` varchar(36) NOT NULL,
  `eventId` varchar(36) NOT NULL,
  `gameId` varchar(36) NOT NULL,
  `participantId` varchar(36) NOT NULL,
  `feedbackGiverId` varchar(36) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `friends` (
    `id` varchar(36) NOT NULL,
    `userId` varchar(36) NOT NULL,
    `friendId` varchar(36) NOT NULL,
    `name` varchar(36) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pending_friend_request` (
    `senderId` varchar(36) NOT NULL,
    `receiverId` varchar(36) NOT NULL,
    PRIMARY KEY (`senderId`, `receiverId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;