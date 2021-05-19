let fruits = [
  {
    id: 1, title: 'Apple',
    price: 20,
    img: 'images/apple.png'
  },
  {
    id: 2, title: 'Orange',
    price: 30,
    img: 'images/orange.png'
  },
  {
    id: 3, title: 'Mango',
    price: 50,
    img: 'images/mango.png'
  },
  {
    id: 4, title: 'Strawberry',
    price: 200,
    img: 'images/strawberry.png'
  },
  {
    id: 5, title: 'Lemon',
    price: 35,
    img: 'images/lemon.png'
  },
  {
    id: 6, title: 'Merry',
    price: 150,
    img: 'images/merry.png'
  },
];

toHTML = ({ id, title, img }) => `
  <div class="card">
      <img alt=${ title } class="card__image"
           src=${ img }>
      <h3 class="card__title">${ title }</h3>
      <div class="card__btn-block">
          <button class="card__btn green" data-btn="price" data-id=${ id }>Price</button>
          <button class="card__btn red" data-btn="delete" data-id=${ id }>Delete</button>
      </div>
  </div>
`

function render() {
  document.getElementById('fruits').innerHTML = fruits.map(toHTML).join('');
}

render();

const priceModal = $.modal({
  title: 'Cost per kilogram',
  closable: false,
  width: '400px',
  footerButtons: [
    {
      text: 'Close',
      color: 'green',
      handler() {
        priceModal.close();
      }
    }
  ]
});

document.addEventListener('click', (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;

  if (btnType === 'price') {
    const fruit = fruits.find((item) => item.id === id);
    priceModal.setContent(`
    <h3 style="text-transform: uppercase;">${ fruit.title } $${ fruit.price }</h3>
    `)
    priceModal.open();
  }

  if (btnType === 'delete') {
    const fruit = fruits.find((item) => item.id === id);
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You are deleting the card <strong>"${fruit.title}"</strong></p>`
    }).then(() => {
      fruits = fruits.filter((fruit) => fruit.id !== id);
      render();
    }).catch(() => {
      console.log('Cancel')
    })
  }
})
