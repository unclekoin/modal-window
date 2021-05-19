$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      content: options.content,
      closable: false,
      width: '400px',
      footerButtons: [
        {
          text: 'No',
          color: 'red',
          handler() {
            modal.close();
            reject();
          }
        },
        {
          text: 'Yes',
          color: 'green',
          handler() {
            modal.close();
            resolve();
          }
        }
      ]
    })
    modal.open();
  })
}
