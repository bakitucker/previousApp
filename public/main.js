var makeFav = document.getElementsByClassName("fa-solid fa-heart");
var unFav = document.getElementsByClassName("fa-regular fa-heart");
var trash = document.getElementsByClassName("fa-trash");











Array.from(makeFav).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const num = this.parentNode.parentNode.childNodes[3].innerText
        const makeFav = this.parentNode.parentNode.childNodes[9].innerText
        const address = this.parentNode.parentNode.childNodes[5].innerText
        const email = this.parentNode.parentNode.childNodes[7].innerText
        fetch('addresses', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'number': num,
            'makeFav': makeFav,
            'address': address,
            'email': email
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

Array.from(unFav).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const num = this.parentNode.parentNode.childNodes[3].innerText
    const makeFav = this.parentNode.parentNode.childNodes[9].innerText
    const address = this.parentNode.parentNode.childNodes[5].innerText
    const email = this.parentNode.parentNode.childNodes[7].innerText
    fetch('addresses/unFav', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'number': num,
        'makeFav': makeFav,
        'address': address,
        'email': email
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
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const num = this.parentNode.parentNode.childNodes[3].innerText
        fetch('addresses', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'number': num
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
