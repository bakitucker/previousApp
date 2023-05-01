var checkPalindrome = document.getElementsByClassName("check");
var trash = document.getElementsByClassName("fa-trash");

Array.from(checkPalindrome).forEach(function(element) {
      element.addEventListener('click', function(){
        const word = this.parentNode.parentNode.childNodes[1].innerText
        const checkP = this.parentNode.parentNode.childNodes[3].innerText
        fetch('words', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'word': word,
            'checkP': checkP,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const word = this.parentNode.parentNode.childNodes[1].innerText
        const checkP = this.parentNode.parentNode.childNodes[3].innerText
        fetch('words', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'word': word,
            'checkP': checkP
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
