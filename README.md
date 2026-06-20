# Monitor de Cultivo e Botânica Doméstica 

Este projeto foi desenvolvido como requisito para a Segunda Verificação de Aprendizagem (VA2) da disciplina de **Infraestrutura para Sistemas de Informação**, do curso de Sistemas de Informação da Universidade Estadual de Goiás (UEG).

##  Equipe
* **João Marcos de Araújo Martins**
* **Matheus Felipe da Silva Felicio**
* **Docente:** Prof. Guiliano Rangel Alves

##  Objetivo
O sistema é uma aplicação web fullstack focada no rastreamento e histórico de cuidados com plantas. O foco principal deste repositório é demonstrar o provisionamento, orquestração e deploy contínuo (CI/CD) da aplicação em um ambiente de nuvem real, cumprindo todos os requisitos de administração de infraestrutura.

##  Stack Tecnológica
* **Infraestrutura:** Oracle Cloud Infrastructure (OCI) - Instância ARM.
* **Orquestração e CI/CD:** Dokploy, Docker.
* **Servidor Web e Proxy:** Traefik (Externo) e Nginx (Interno/Frontend).
* **Backend:** Java 17 + Spring Boot 3.x.
* **Frontend:** Angular 16+.
* **Banco de Dados:** PostgreSQL 15.

##  Decisões de Arquitetura de Contêineres

A equipe optou por não usar buildpacks automáticos (como Nixpacks), escrevendo **Dockerfiles Multi-stage** customizados para garantir imagens menores, mais seguras e com maior controle sobre a topologia de rede interna.

### 1. Frontend (Angular + Nginx Reverso)
O frontend possui um duplo estágio: utiliza `node:20-alpine` para gerar os artefatos de build e `nginx:alpine` como servidor web leve. 
Uma decisão crucial de infraestrutura foi injetar uma configuração de roteamento diretamente no Nginx do contêiner. Além de resolver rotas de SPA (`try_files`), o Nginx age como um **Proxy Reverso Interno**. Toda requisição com rota `/api/` bate no Nginx e é despachada na rede fechada do Docker diretamente para o contêiner do Spring Boot (`http://backend:8080/api/`), resolvendo elegantemente problemas de CORS.

### 2. Backend (Spring Boot + JRE 17)
O backend adota a mesma premissa multi-stage. O empacotamento é realizado via `maven:3.9.6-eclipse-temurin-17` baixando as dependências de forma otimizada (`dependency:go-offline`). A imagem final roda sobre um JRE Alpino (`eclipse-temurin:17-jre-alpine`), descartando o JDK completo da imagem final de produção para economizar memória na instância Always Free.

### 3. Banco de Dados e Roteamento Edge
* **Persistência:** O PostgreSQL roda de forma isolada na rede interna do Docker, utilizando Docker Volumes para salvaguardar os dados do banco, garantindo resiliência em reboots.
* **Proxy Edge:** O acesso público é gerido pelo **Traefik** (via Dokploy). Ele escuta as portas públicas, gera os certificados SSL automáticos via DNS dinâmico (DuckDNS) e entrega a requisição inicial na porta do contêiner de Frontend.

##  Como Acessar
* **Aplicação Principal:** [https://infrabotanica.duckdns.org](https://infrabotanica.duckdns.org)
* **Documentação Detalhada:** [http://painel.infrabotanica.duckdns.org:8181](http://painel.infrabotanica.duckdns.org:8181)
