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
    ];

    const tempChoices = [
        ['red', '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'],
        ['orange', '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'],
        ['yellow', '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'],
        ['green', '🍁🍁🍂_🍁🌲🌽🎃🎃🍂🍁_🍁'],
        ['teal', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'],
    ];

    const defaultCity = 'Seattle';

    let temp = 65;
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
        let record = tempChoices[4];

        if (temp >= 80) { record = tempChoices[0]; }
        else if (temp >= 70) { record = tempChoices[1]; }
        else if (temp >= 60) { record = tempChoices[2]; }
        else if (temp >= 50) { record = tempChoices[3]; }

        return record;
    };

    const getGardenColor = (temp) => {
        const record = getTempRecord(temp);
        return record[0];
    };

    const getGardenGround = (temp) => {
        const record = getTempRecord(temp);
        return record[1];
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
            elOpt.text = choice[0];
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