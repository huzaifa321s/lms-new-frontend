// It will combine words randomly from any letter
export const createNewSentenceArray = (sentenceArr) => {
    while (sentenceArr.length > 6) {
        let ri = Math.floor(Math.random() * (sentenceArr.length - 1));
        sentenceArr[ri] = `${sentenceArr[ri]} ${sentenceArr[ri + 1]}`;
        sentenceArr.splice(ri + 1, 1);
    }

    return sentenceArr;
};