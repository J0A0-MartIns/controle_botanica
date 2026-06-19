# Monitor de Cultivo e Botânica Doméstica 🌱

Este projeto foi desenvolvido como requisito para a Segunda Verificação de Aprendizagem (VA2) da disciplina de **Infraestrutura para Sistemas de Informação**, do curso de Sistemas de Informação da Universidade Estadual de Goiás (UEG).

##  Equipe
* **João Marcos de Araújo Martins**
* *(Adicione sua dupla aqui, se houver)*
* **Docente:** Prof. Guiliano Rangel Alves

##  Objetivo
O sistema é uma aplicação web fullstack focada no rastreamento e histórico de cuidados com plantas (regas, podas e tratamentos). O foco principal deste repositório é demonstrar o provisionamento, orquestração e deploy contínuo (CI/CD) da aplicação em um ambiente de nuvem real, cumprindo os requisitos de infraestrutura e DevOps da disciplina.

## 🛠️ Stack Tecnológica
* **Infraestrutura:** Oracle Cloud Infrastructure (OCI) - Instância ARM (Always Free / PAYG).
* **Orquestração e CI/CD:** Dokploy, Docker.
* **Servidor Web e Proxy:** Traefik (via Dokploy) e Nginx (nativo para a página descritiva).
* **Backend:** Java 17 + Spring Boot 3.x.
* **Frontend:** Angular 16+.
* **Banco de Dados:** PostgreSQL 15.

##  Decisões de Arquitetura e Deploy

### 1. Estratégia de Build (Nixpacks)
Em vez de utilizar `Dockerfiles` estáticos tradicionais, a equipe optou pela adoção do **Nixpacks** integrado ao Dokploy. O Nixpacks analisa o código-fonte (identificando o `pom.xml` do Java e o `package.json` do Angular), determinando automaticamente as dependências do ambiente e compilando imagens OCI otimizadas. Isso acelera o pipeline de deploy e reduz a manutenção de arquivos de configuração de contêiner.

### 2. Persistência de Dados
O banco de dados PostgreSQL foi provisionado como um serviço isolado na rede interna do Docker. Os dados são persistidos utilizando **Docker Volumes** (`/var/lib/postgresql/data`), garantindo que o histórico botânico não seja perdido em caso de reinicialização do contêiner.

### 3. Segurança e Roteamento
* A aplicação não expõe portas internamente para a rede pública, mitigando ataques diretos.
* O roteamento externo é feito pelo **Traefik**, atuando como Proxy Reverso, que intercepta as chamadas nas portas padrão (80/443).
* O DNS dinâmico **DuckDNS** foi utilizado para mascarar o IP público e permitir a geração automatizada de certificados SSL/TLS via Let's Encrypt.
* Variáveis de ambiente sensíveis (como credenciais do banco) não estão versionadas no código, sendo injetadas em tempo de execução diretamente pelo painel do Dokploy.

##  Como Acessar
* **Aplicação Principal:** [https://app.infrabotanica.duckdns.org](https://app.infrabotanica.duckdns.org)
* **Documentação de Infraestrutura:** [http://painel.infrabotanica.duckdns.org:8181](http://painel.infrabotanica.duckdns.org:8181)
