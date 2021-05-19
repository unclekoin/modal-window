function noop() {}

function _createModalFooter(buttons = []) {
  if (!buttons.length) {
    return document.createElement('div');
  }
  const wrap = document.createElement('div');
  wrap.classList.add('modal__footer')

  buttons.forEach((button) => {
    const $button = document.createElement('button');
    $button.classList.add('modal__btn');
    $button.textContent = button.text;
    $button.onclick = button.handler || noop;
    if (button.color) {
      $button.classList.add(button.color);
    }
    wrap.appendChild($button);
  })

  return wrap;
}

function _createModal(options) {
  const {title, content, closable, width} = options;
  const DEFAULT_WIDTH = '600px'
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window" style="width: ${width || DEFAULT_WIDTH}">
            <div class="modal__header">
                <span class="modal__title">${title || 'Window'}</span>
                ${closable ? `<span class="modal__close" data-close="true">&times;</span>` : ''}           
            </div>
            <div class="modal__body" data-content>
                ${content || ''}
            </div> 
        </div>
    </div>
  `);

  document.body.insertBefore(modal, document.body.firstChild);
  const footer = _createModalFooter(options.footerButtons)
  modal.querySelector('.modal__window').appendChild(footer)
  return modal;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed!')
      }
      !closing && $modal.classList.add('open');
    },

    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hidden');
      const closeTimeout = setTimeout(() => {
        $modal.classList.remove('hidden');
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED)
    }
  }

  const listenerClose = (e) => {
    if (e.target.dataset.close) modal.close();
  }

  $modal.addEventListener('click', listenerClose)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listenerClose)
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  });
}



