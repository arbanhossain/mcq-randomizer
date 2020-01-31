String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

document.getElementById('doButton').disabled = true;

let regex = /^([^\.]+\.[^\.]+)$/;

let pictureFolder = "images",
    width = 400;

let options = 4,
    choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    answerIndicator = "[*]";

const readfile = (e) => {
    //console.log('gg')

    let reader = new FileReader();
    reader.onload = () => {
        let text = reader.result;
        let node = document.getElementById('output');
        node.innerText = text;
        //console.log(reader.result.substring(0, 200));
    }
    reader.readAsText(e.target.files[0]);

    document.getElementById('doButton').disabled = false;
    //doStuff();
}

const shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const doStuff = (e) => {
    let qsn = document.getElementById('output').innerText;
    qsn = qsn.split("\n").filter(x => x != "");
    //console.log(qsn);
    const randomized = [];
    let qsnpart = [];

    qsn.forEach(item => {
        if (!isNaN(parseInt(item[0]))) {
            if (qsnpart != []) {
                randomized.push(qsnpart)
                qsnpart = [];
            }
            //console.log('gg')
        }
        qsnpart.push(item);
        //console.log(qsnpart)
    });
    randomized.push(qsnpart);
    //console.log(randomized)
    shuffled = shuffle(randomized);
    //console.log(shuffled);
    randomizeOptions(shuffled);
}

const randomizeOptions = (array) => {
    //console.log(array);
    array.forEach(item => {
        let ln = item.length;
        let workArray = item.slice(ln - options, ln);
        workArray = sortOptions(shuffle(workArray));
        //console.log(workArray);
        for (let i = 0; i < options; i++) {
            item[ln - 1 - i] = workArray[options - 1 - i];
        }
        //console.log(workArray);
    });
    //console.log(array);
    print(array);
}

const sortOptions = (array) => {
    let sortedArray = [];
    if (array.length == options) {
        for (let i = 0; i < options; i++) {
            sortedArray.push(choices[i] + array[i].substr(1));
        }
    }
    //console.log(sortedArray);
    return sortedArray;
}

const print = (array) => {
    let answers = "";
    let no = 1;
    let text = ``;
    ran = document.getElementById('randomized');
    array.forEach(item => {
        if (item.length != 0) {
            item.forEach(subitem => {
                if (subitem.endsWith(answerIndicator)) {
                    answers += subitem[0];
                    subitem = subitem.replace(answerIndicator, "");
                }
                let splitted = subitem.split(" ");
                //console.log(splitted);
                if (!isNaN(parseInt(subitem[0]))) {
                    subitem = subitem.replace(splitted[0], no.toString() + '.')
                    splitted = subitem.split(" ");
                    no++;
                    if (splitted[splitted.length - 1].match(regex)) {
                        let ext = splitted[splitted.length - 1];
                        //console.log(`found ${splitted}`)
                        splitted.pop();
                        subitem = splitted.join(" ") + "<br>" + `<img src="./${pictureFolder}/${ext}" width=${width}>`
                    }
                }
                //console.log(splitted[splitted.length - 1]);
                text += `${subitem} <br>`
            })
        }
        text += '<br>';
    });
    text += `Answers: ${answers}`;
    //console.log(text);
    console.log(answers);
    ran.innerHTML = text;
}