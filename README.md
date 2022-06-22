Partie backend du projet clickcollect

## Lancer la base de données

Afin de lancer l'application avec la base de données Postgres, il est nécessaire avant
de démarrer les containers docker correspondants

Installez docker compose s'il n'est pas encore sur la machine: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-fr

Ensuite faitez:

    docker-compose up -d

Pour vérifier que les containeurs sont bien lancés, tapez la commande:


    docker ps

Deux containers sont censés d'apparare, celui de postres et un autre pour pgadmin
Avec pgadmin c'est possible de accéder la BDD plus facilement en local.

Allez sur: localhost:5050

Ensuite utilisez les idéntifiants:

<ol>
  <li>User: admin@admin.com</li>
  <li>MP: root</li>
</ol>

## Comment lancer l'application

    npm run serve

L'API sera ainsi lancé sur le port 3333 sur local
