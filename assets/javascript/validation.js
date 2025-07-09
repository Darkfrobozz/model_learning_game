const INITIALCOLOR = document.querySelector("#validation").style.color;

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("change");
    }, time);
  });
}

/**
 *
 * @param {String} sequence
 * @returns {Boolean}
 */
function level_one_checker(sequence) {
  const arr = sequence.split(/, ?/);
  console.log(sequence);
  let ans = true;
  for (let index = 1; index < arr.length; index++) {
    const element = arr[index];
    if (element / 2 != arr[index - 1]) {
      ans = false;
      break;
    }
  }
  return ans;
}

const sequenceValidator = {
  /** @type {HTMLInputElement} */
  SEQUENCEINPUT: document.querySelector("#sequence"),
  /** @type {HTMLInputElement} */
  VALIDATEBUTTON: document.querySelector("#validation"),
  async checkSequence(element, event) {
    if (level_one_checker(this.SEQUENCEINPUT.value)) {
      this.VALIDATEBUTTON.style.color = "green";
    } else {
      this.VALIDATEBUTTON.style.color = "red";
    }
    await delay(1000);
    this.VALIDATEBUTTON.style.color = INITIALCOLOR;
  },
  init() {
    console.log(this.SEQUENCEINPUT);
    console.log(this.VALIDATEBUTTON);
    this.VALIDATEBUTTON.addEventListener(
      "click",
      this.checkSequence.bind(this)
    );
    this.checker = level_one_checker;
  },
};

sequenceValidator.init();
