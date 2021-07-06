(function(){
    const loadPage = () => {
        const btnTempUp = document.getElementById('btnTempUp');
        const btnTempDown = document.getElementById('btnTempDown');
        const selSky = document.getElementById('selSky');
        const txtCity = document.getElementById('txtCity');
        const elCity = document.getElementById('elCity');
        const elTemp = document.getElementById('elTemp');
        const elGarden = document.getElementById('elGarden');
        const elGround = document.getElementById('elGround');

        const skyChoices = [
            [ 'Sunny', '☁️ ☁️ ☁️ ☀️ ☁️ ☁️' ],
            [ 'Cloudy', '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️' ],
            [ 'Rainy', '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧' ],
            [ 'Snowy', '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨' ],
            [ 'End-of-Days', '☄️🔥⚡️☄️🔥⚡️☄️🔥⚡️☄️🔥⚡️☄️🔥' ],
        ];

        const tempChoices = [
            { lower: null, color: 'teal', ground: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'},
            { lower: 50, color: 'green', ground: '🍁🍁🍂_🍁🌲🌽🎃🎃🍂🍁_🍁'},
            { lower: 60, color: 'yellow', ground: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'},
            { lower: 70, color: 'orange', ground: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'},
            { lower: 80, color: 'red', ground: '🔥🏘🔥🏠🔥🔥🏢🔥🦖'},
        ];

        const defaultCity = 'Seattle';

        let temp = 75;
        let sky = '';
        let skyColor = '';
        let city = defaultCity;

        const increaseTemp = () => {
            ++temp;
        };

        const decreaseTemp = () => {
            --temp;
        };

        const setSky = () => {
            const i = selSky.selectedOptions[0].value;
            skyColor = skyChoices[i][0];
            sky = skyChoices[i][1];
        };

        const setCity = () => {
            city = txtCity.value;
        };

        const resetCity = () => {
            city = defaultCity;
        };

        const getTempRecord = (temp) => {
            let record = tempChoices[0];

            for (let i = 1; i < tempChoices.length; ++i) {
                const choice = tempChoices[i];

                if (temp < choice.lower) { break; }

                record = choice;
            }

            return record;
        };

        const getGardenColor = (temp) => {
            const record = getTempRecord(temp);
            return record.color;
        };

        const getGardenGround = (temp) => {
            const record = getTempRecord(temp);
            return record.ground;
        };

        const updateGround = () => {
            const ground = getGardenGround(temp);
            elGround.innerText = ground;
        };

        const updateSky = () => {
            elSky.innerText = sky;
            elGarden.className = skyColor;
        };

        const updateCity = () => {
            elCity.innerText = city;
            txtCity.value = city;
        };

        const updateTemp = () => {
            const colorStyle = getGardenColor(temp);
            elTemp.className = colorStyle;
            elTemp.innerText = temp;
        };

        const updateGarden = () => {
            updateCity();
            updateTemp();
            updateGround();
            updateSky();
        };

        const redraw = () => {
            updateGarden();
        };

        const initializeSkyChoices = () => {
            skyChoices.forEach((choice, i) => {
                const elOpt = document.createElement('option');
                elOpt.text = choice[0].replaceAll("-", " ");
                elOpt.value = i;

                selSky.options.add(elOpt);
            });

            setSky();
        };

        initializeSkyChoices();
        resetCity();

        btnTempUp.addEventListener('click', (event) => {
            increaseTemp();
            redraw();
        });

        btnTempDown.addEventListener('click', (event) => {
            decreaseTemp();
            redraw();
        });

        selSky.addEventListener('change', (event) => {
            setSky();
            redraw();
        });

        txtCity.addEventListener('input', (event) => {
            setCity();
            redraw();
        });

        btnReset.addEventListener('click', (event) => {
            resetCity();
            redraw();
        });

        redraw();
    };

    window.addEventListener('DOMContentLoaded', (event) => {
        loadPage();
    });
})();