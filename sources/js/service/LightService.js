class LightService {
  constructor({
    lightClass,
    lightText,
    lightColorA,
    lightColorB,
    lightOn,
    lightOff,
  }) {
    this.lightClass = lightClass;
    this.lightText = lightText;
    this.lightColorA = lightColorA;
    this.lightColorB = lightColorB;
    this.lightOn = lightOn;
    this.lightOff = lightOff;
  }

  switchLight() {
    this.createLightButton();

    // document.body.setAttribute(
    //   'style',
    //   `background-color: ${this.lightColorA}`
    // );
    const light = document.querySelector(`#${this.lightText}`);

    light.addEventListener('click', () => {
      const bodyDocument = document.body;
      const container = bodyDocument.style.backgroundColor;
      if (container === this.lightColorA) {
        bodyDocument.style.backgroundColor = this.lightColorB;
        bodyDocument.classList.add(this.lightOn);
        bodyDocument.classList.remove(this.lightOff);
      } else {
        bodyDocument.style.backgroundColor = this.lightColorA;
        bodyDocument.classList.add(this.lightOff);
        bodyDocument.classList.remove(this.lightOn);
      }
    });
  }

  createLightButton() {
    const switchColor = document.querySelector(this.lightClass);
    const addLightOnOff = document.createElement('div');
    addLightOnOff.id = this.lightText;
    addLightOnOff.innerText = this.lightText;
    switchColor.appendChild(addLightOnOff);
  }
}

export default LightService;
