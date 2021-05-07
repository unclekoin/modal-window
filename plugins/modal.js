 function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay">
        <div class="modal__window">
            <div class="modal__header">
                <span class="modal__title">Modal title</span>
                <span class="modal__close">&times;</span>
            </div>
            <div class="modal__body">
                <p>Lorem ipsum dolor sit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
            <div class="modal__footer">
                <button class="modal__btn">Ok</button>
                <button class="modal__btn">Cancel</button>
            </div>
        </div>
    </div>
  `);

  document.body.insertBefore(modal, document.body.firstChild);
  return modal;
 }

$.modal = function (options) {
  const $modal = _createModal(options);

    return {
      open() {},

      close() {},

      destroy() {}
    }
  }
