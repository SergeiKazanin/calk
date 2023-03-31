
window.onload = int;

let a = "";
let b = "";
let sign = "";
let finish = false;

let out = "0";


const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];

function int() {
    out = document.querySelector(".calc-screen p");

    document.querySelector(".ac").onclick = clearAll;

    document.querySelector(".buttons").onclick = (event) => {
        if (!event.target.classList.contains("btn")) return;
        if (event.target.classList.contains("ac")) return;
        out.textContent = "";

        const key = event.target.textContent;
        if (digit.includes(key)) {
            if (b === "" && sign === "") {
                if (a === "" && key === "0") {
                    out.textContent = 0;
                    return;
                }
                a += key;
                out.textContent = a;
            } else if (a !== "" && b !== "" && finish) {
                b = key;
                finish = false;
                out.textContent = b;

            } else {
                if (b === "0" && key === "0") {
                    out.textContent = 0;
                    return;
                }
                b += key;
                out.textContent = b;
            }
        }

        if (action.includes(key)) {
            sign = key;
            out.textContent = sign;
            return;
        }

        if (key === "+/-") {
            if (a !== "" && b == "") {
                a = a * -1;
                out.textContent = a;
                return;
            } else if (a !== "" && b !== "") {
                b = b * -1;
                out.textContent = b;
                return;
            }
        }

        if (key === "%") {
            if (a !== "" && b == "") {
                clearAll();
                return;
            } else if (a !== 0 && b !== 0 && (sign === "+" || sign === "-")) {
                b = a * b / 100;
                out.textContent = b;
                return;
            } else if (a !== 0 && b !== 0 && (sign === "/" || sign === "X")) {
                b = b / 100;
                out.textContent = b;
                return;
            }
        }

        if (key === "=") {
            if (b === "") b = a;
            switch (sign) {
                case "+":
                    a = (+a) + (+b);
                    break;
                case "-":
                    a = (+a) - (+b);
                    break;
                case "X":
                    a = (+a) * (+b);
                    break;
                case "/":
                    if (b === "0") {
                        clearAll();
                        out.textContent = "Ошибка";
                        document.getElementById("audio").play();
                        return;
                    }
                    a = (+a) / (+b);
                    break;
            }
            finish = true;
            out.textContent = a;
        }

    }
}

function clearAll() {
    a = "";
    b = "";
    sign = "";
    finish = false;
    out.textContent = 0;
}



