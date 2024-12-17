function getRandomColor(excludeColor) {
    const pastelColors = [
        '#FFD1DC',
        '#D1E8E2',
        '#FFB3BA',
        '#B5EAEA',
        '#FFEC8B',
        '#C1E1DC'
    ];

    let color = '';
    do {
        color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    } while (color === excludeColor);

    return color;
}

function setRandomColors() {
    const root = document.documentElement;
    const primaryColor = getRandomColor();
    const secondaryColor = getRandomColor(primaryColor);
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
}

document.addEventListener('DOMContentLoaded', setRandomColors);