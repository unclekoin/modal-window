const fruits = [
  {
    id: 1, title: 'Apple',
    price: 20,
    img: 'https://supermarket.nop-templates.com/images/thumbs/0000228_red-apples.png'
  },
  {
    id: 2, title: 'Orange',
    price: 30,
    img: 'https://images.ctfassets.net/96ftuyamizgy/3RYl3Whe7jnllT00HAWvYw/d31f58db5e625ecc64777ca8b9b2bd27/ingredient-vitamin-c.jpg.png'
  },
  {
    id: 3, title: 'Mango',
    price: 50,
    img: 'https://svit24.net/wp-content/uploads/2014/10/mango.png'
  },
  {
    id: 4, title: 'Strawberry',
    price: 200,
    img: 'https://www.dampfmatiker.de/wp-content/uploads/2020/02/Inawera-Shisha-Strawberry.png'
  },
  {
    id: 5, title: 'Lemon',
    price: 35,
    img: 'https://tgroenselof.be/wp-content/uploads/2018/09/t_Groenselof-Lokeren-groentebox-citroenen.png'
  },
  {
    id: 6, title: 'Merry',
    price: 150,
    img: 'https://yesfrukt.com/storage/source/417445f38227c75fe787cd12edce54c8/product/1/QCoSz_J-cWHVjtsKn8M2EgMfWWlRV-WL.png'
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
      console.log('Delete')
    }).catch(() => {
      console.log('Cancel')
    })
  }
})
