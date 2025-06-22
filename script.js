   const bugs = ['🐞', '🐛', '🪲', '🪳'];
    const notBugs = ['🦋', '🐝', '🕷️'];
    const goldenBugs = ['🌟'];
    const badBugs = ['💣'];

    let score = 0;
    let timeLeft = 30;
    let interval, timer;
    let difficulty = 'medium';

    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');

    function toggleTheme() {
      document.body.classList.toggle('dark');
      document.getElementById('themeToggle').innerText =
        document.body.classList.contains('dark') ? '☀️' : '🌙';
    }

    function createBug() {
      const bug = document.createElement('div');
      bug.classList.add('bug');

      const chance = Math.random();
      let emoji;

      if (chance < 0.1) {
        emoji = goldenBugs[0];
        bug.classList.add('golden-bug');
      } else if (chance < 0.2) {
        emoji = badBugs[0];
        bug.classList.add('bad-bug');
      } else if (chance < 0.3) {
        emoji = notBugs[Math.floor(Math.random() * notBugs.length)];
        bug.classList.add('not-a-bug');
      } else {
        emoji = bugs[Math.floor(Math.random() * bugs.length)];
      }

      bug.innerText = emoji;
      bug.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      bug.style.top = Math.random() * (window.innerHeight - 40) + 'px';

      if (!bug.classList.contains('not-a-bug')) {
        bug.addEventListener('click', () => {
          bug.remove();
          if (bug.classList.contains('golden-bug')) score += 5;
          else if (bug.classList.contains('bad-bug')) score -= 3;
          else score++;
          document.getElementById('score').innerText = score;
          clickSound.currentTime = 0;
          clickSound.play();
        });
      }

      document.body.appendChild(bug);
      setTimeout(() => bug.remove(), 3000);
    }

    function startGame(selectedDifficulty) {
      difficulty = selectedDifficulty;
      document.getElementById('menu').style.display = 'none';
      document.getElementById('score').innerText = 0;
      document.getElementById('time').innerText = 30;
      score = 0;
      timeLeft = 30;

      let spawnRate = 600;
      if (difficulty === 'easy') spawnRate = 800;
      else if (difficulty === 'hard') spawnRate = 350;

      interval = setInterval(createBug, spawnRate);

      timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          clearInterval(interval);
          if (score >= 15) winSound.play();
          else loseSound.play();
          alert('Game over! Final score: ' + score);
          document.getElementById('menu').style.display = 'flex';
        }
      }, 1000);
    }