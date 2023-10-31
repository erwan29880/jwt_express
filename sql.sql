CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

INSERT INTO jee.users (nom,prenom) VALUES
	 ('epongee','bob'),
	 ('bunny','bugs'),
	 ('ourson','winnie'),
	 ('duck','daffy'),
	 ('BOB','Truc');