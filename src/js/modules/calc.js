function calc() {
    const result = document.querySelector('.calculating__result span');
    let     sex = localStorage.getItem('sex') || 'female',
            height = localStorage.getItem('height') || '',
            weight = localStorage.getItem('weight') || '', 
            age = localStorage.getItem('age') || '', 
            ratio = localStorage.getItem('ratio') || '1.375';

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (localStorage.getItem('sex') && elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (localStorage.getItem('height') && elem.getAttribute('id') === 'height') {
                elem.value = localStorage.getItem('height');
            }
            if (localStorage.getItem('weight') && elem.getAttribute('id') === 'weight') {
                elem.value = localStorage.getItem('weight');
            }
            if (localStorage.getItem('age') && elem.getAttribute('id') === 'age') {
                elem.value = localStorage.getItem('age');
            }
            if (localStorage.getItem('ratio') && elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    if (localStorage.getItem('sex')) {
        initLocalSettings('#gender div', 'calculating__choose-item_active');
    }
    if (localStorage.getItem('height') || localStorage.getItem('weight') || localStorage.getItem('age')) {
        initLocalSettings('.calculating__choose_medium input');
    }
    if (localStorage.getItem('ratio')) {
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height': {
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                }
                case 'weight': {
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                }
                case 'age': {
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
                }
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;