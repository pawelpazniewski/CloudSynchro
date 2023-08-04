const toggleButton = document.querySelector('.toggle');
    const card = document.querySelector('.card');
    const job = document.querySelector('.job');
    const cloudPercent = document.querySelector('.cloud-percent');
    const solutionPercent = document.querySelector('.solution-percent');
    const cloudLoader = document.querySelector('.loader');
    const solutionLoader = document.querySelector('.solution-loader');
    const filePercent = document.querySelector('.file-percent');
    const fileLoader = document.querySelector('.file-loader');
    const fileGear = document.getElementById('fgear');
    const cloudGear = document.getElementById('cgear');
    const solutionGear = document.getElementById('sgear');


    let levelsCompleted = 0;

    // Add an event listener to the toggle button
    toggleButton.addEventListener('click', function () {
        if (card.classList.contains('hide')) {
            card.classList.remove('hide')
            job.classList.add('hide')
        } else {
            card.classList.add('hide')
            job.classList.remove('hide')
        }
    });

    function waitFiveSeconds() {
        return new Promise(resolve => setTimeout(resolve, 4000));
    }

    async function counter(item, itemLoader, gear) {
        itemLoader.innerHTML = '<div class="circle"><div class="inner-circle"></div></div>';
        const countDisplay = item;
        const targetValue = 100;
        let currentValue = 0;
        const intervalDuration = 50; // czas trwania pojedynczego kroku (w milisekundach)
        const steps = targetValue / (4000 / intervalDuration); // liczba kroków na każdą sekundę

        function count() {
            if (currentValue < targetValue) {
                currentValue += steps;
                if (currentValue > targetValue) {
                    currentValue = targetValue;
                }
                countDisplay.textContent = Math.floor(currentValue) + ' %';

                checkPercentValue(item);
            } else {
                clearInterval(counterInterval);
            }
        }

        const counterInterval = setInterval(count, intervalDuration);

        function checkPercentValue(item) {
            const percentValue = parseInt(countDisplay.textContent, 10);

            if (percentValue === 100) {
                itemLoader.innerHTML = "<i class='bx bxs-check-circle'></i>";
                item.innerText = 'Up to date';
                gear.classList.remove('hide')
            }
        }

        await waitFiveSeconds(); // Poczekaj 5 sekund przed rozpoczęciem następnego licznika
        levelsCompleted++;

        if (levelsCompleted < 3) {
            if (levelsCompleted === 1) {
                counter(cloudPercent, cloudLoader,cloudGear);
            } else if (levelsCompleted === 2) {
                counter(solutionPercent, solutionLoader,solutionGear);
            } else {
                counter(filePercent, fileLoader);
            }
        }
    }

    // Wywołujemy pierwszy licznik
    counter(filePercent, fileLoader,fileGear);