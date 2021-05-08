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
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let closing = false;

    return {
      open() {
        !closing && $modal.classList.add('open');
      },

      close() {
        closing = true;
        $modal.classList.remove('open');
        $modal.classList.add('hidden');
        setTimeout(() => {
          $modal.classList.remove('hidden');
          closing = false;
        }, ANIMATION_SPEED)
      },

      destroy() {}
    }
  }
