
document.addEventListener('DOMComponentsLoaded', function(){
    var prevButton = document.querySelector(".btn_prev");
    var nextButton = document.querySelector(".btn_next");
    var deck = document.querySelector("x-deck");

    prevButton.addEventListener("click", function(){
            deck.shufflePrev();
    });
    nextButton.addEventListener("click", function(){
            deck.shuffleNext();
    });
    toButton.addEventListener("click", function(){
            deck.shuffleTo(1);
    });
});
