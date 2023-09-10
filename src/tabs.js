export default class Tabs {
    constructor(idInfo) {
        this.tabs = document.getElementById(idInfo);
        this.navTabs = this.tabs.querySelector('.tabs')

        this.navTabs.addEventListener('click', (e) => {
            //si exite dentro de la pestana una etiqueta con esa clase
            console.log([...e.target.classList].includes('tabs__button'))
            if([...e.target.classList].includes('tabs__button')) {
                //obtenemos la clase personalizada de la etiquete
                const tab = e.target.dataset.tab;

                if(this.tabs.querySelector('.tab--active')) {
                    //si encuengtras un contenedor con esta clase queita la clase
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }

                if(this.tabs.querySelector('.tabs__button--active')) {
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                e.target.classList.add('tabs__button--active');
            }
        })
    }
}