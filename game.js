let game;
let startPlay;

window.onload = function () {
    const playerImage = document.getElementById('playerImage');
    const computerImage = document.getElementById('computerImage');
    const result = document.getElementById('result');
    const score1Element = document.getElementById('score1');
    const score2Element = document.getElementById('score2');
    const img1 = document.getElementById('plyr');
    const img2 = document.getElementById('pc');
    const sound1 = document.getElementById('win')
    const sound2 = document.getElementById('lose')
    const sound3 = document.getElementById('egalite')
    const modal1 = document.querySelector('.modal1');
    const modal2 = document.querySelector('.modal2');
    const btnContinuer = document.querySelector('.okBtn');
    const btnQuitter = document.querySelector('.cancelBtn');
    const dashboard = document.getElementById('dashboard');
    const modalTitle = "";
    const modalText = "";
    document.getElementById('modal-title').innerText = modalTitle;
    document.getElementById('modal-text').innerText = modalText;

    function updateImage(element, choice) {
        element.src = `./img/${choice}.jpeg`;
    }

    function showElement(elementId) {
        const element = document.getElementById(elementId);
        element.style.display = "flex";
    }

    startPlay = function () {
        const winAudio = new Audio('effects/open.wav');
        winAudio.play();
        score1Element.textContent = '0';
        score2Element.textContent = '0';
        const modalTitle = "";
        const modalText = "";
        btnQuitter.classList.add('hidden');
        btnContinuer.classList.add('hidden');
        modal1.classList.add('hidden');
        modal2.classList.add('hidden');
        showElement('player1');
        showElement('player2');
        showElement('gameframe');
    };

    function checkGameOver() {
        const score1 = parseInt(score1Element.textContent);
        const score2 = parseInt(score2Element.textContent);

        if (score1 + score2 === 5) {

            setTimeout(function () {
                document.getElementById('modal-title').innerText = "Jeu Terminé";
                document.getElementById('emoji').src = "./img/bonjour.gif";
                modal2.classList.remove('hidden');
                btnContinuer.classList.remove('hidden');
                btnQuitter.classList.remove('hidden');
            }, 2100);

        }
    }

    function updateScore(element) {
        element.textContent = parseInt(element.textContent) + 1;
        checkGameOver();
    }

    game = function (playerChoice) {
        const choices = ['pp', 'ff', 'cc'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        result.textContent = '';
        updateImage(playerImage, playerChoice);
        updateImage(computerImage, computerChoice);

        if (playerChoice === computerChoice) {
            result.textContent = 'Égalité';
            img1.style.backgroundColor = "#2B2A2D";
            img2.style.backgroundColor = "#2B2A2D";
            sound3.play();
            setTimeout(function () {
                result.textContent = '';
            }, 1000);

        } else if (
            (playerChoice === 'pp' && computerChoice === 'cc') ||
            (playerChoice === 'cc' && computerChoice === 'ff') ||
            (playerChoice === 'ff' && computerChoice === 'pp')
        ) {
            updateScore(score1Element);
            img1.style.backgroundColor = "green";
            img2.style.backgroundColor = "red";
            sound1.play();
            document.getElementById('modal-title').innerText = "Bravo! 1 point de plus.";
            document.getElementById('emoji').src = "./img/happy.gif";
            modal2.classList.remove('hidden');
            setTimeout(function () {
                modal2.classList.add('hidden');
            }, 2000);
            checkGameOver();


        } else {
            updateScore(score2Element);
            img1.style.backgroundColor = "red";
            img2.style.backgroundColor = "green";
            sound2.play();
            document.getElementById('modal-title').innerText = "Malheuresement !!! 1 point perdu.";
            document.getElementById('emoji').src = "./img/sad.gif";
            modal2.classList.remove('hidden');
            setTimeout(function () {
                modal2.classList.add('hidden');
            }, 2000);
            checkGameOver();
        }
    };
};

