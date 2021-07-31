
<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Ask Me Anything</h3>

  <p align="center">
    Forum built on react and node for the purposes of NTUA school project
    <br />
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This project is built for the course Software As A Service of NTUA University. A project aiming to develop a basic forum web app with two different architectures. Our team chose MVC and SOA architectures. The code is available to you through this repo.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Nest](https://nestjs.com/)
* [Next](https://jquery.com)
* [Passport](http://www.passportjs.org/)


<!-- GETTING STARTED -->
## Getting Started

You can see below the instructions to run this project locally

### Prerequisites


* docker
  ```sh
  sudo apt-get update

  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

  sudo apt-get update

  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```
* docker-compose
   ```sh
   pip uninstall docker-compose
   ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adonistseriotis/askmeanything.git
   ```
3. Install NPM packages
   ```sh
   docker-compose up    
   ```
4. Go to http://localhost:8000 for Service Oriented Architecture.

5. Go to http://localhost:8001 for Model View Template.


<!-- CONTACT -->
## Contact

* Mello Angelos el17857- [https://github.com/MelloAngelos]
* Adonis Tseriotis el17838 - [https://github.com/adonistseriotis]

Project Link: [https://github.com/adonistseriotis/askmeanything](https://github.com/adonistseriotis/askmeanything)