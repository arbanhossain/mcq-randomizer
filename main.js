String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

document.getElementById('doButton').disabled = true;

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

    console.log(shuffled);
    print(shuffled)
}

const print = (array) => {
    let no = 1;
    let text = ``;
    ran = document.getElementById('randomized');
    array.forEach(item => {
        if(item.length !=0 ){
            item.forEach(subitem => {
                if (!isNaN(parseInt(subitem[0]))){
                    subitem = subitem.substr(1)
                    subitem = no.toString()+subitem;
                    no++;
                }
                text += `${subitem}\n`
            })
        }
    })
    console.log(text);
    ran.innerText = text;
}