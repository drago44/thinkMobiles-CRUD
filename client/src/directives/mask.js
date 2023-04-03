export default {
  beforeMount(el, binding) {
    const mask = binding.value;
    const first = mask.indexOf('_');
    const fieldsL = mask.replace(/[^_]/gm, '').length;
    const clean = mask.replace(/[^0-9_]/gm, '');
    const indexes = [];

    for (let i = 0; i < clean.length; i++) {
      if (!isNaN(clean[i])) {
        indexes.push(i);
      }
    }

    el.value = mask;
    el.clean = mask.replace(/[^0-9]/gm, '');

    function maskIt(event, start) {
      let value = el.value;
      let filtered = value.replace(/[^0-9]/gm, '');
      let result = '';

      if (value.length < first) {
        value = mask + value;
        filtered = value.replace(/[^0-9]/gm, '');
      }

      for (let i = 0; i < filtered.length; i++) {
        if (indexes.indexOf(i) == -1) {
          result += filtered[i];
        }
      }

      value = '';
      let cursor = 0;

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] == '_' && result) {
          value += result[0];
          result = result.slice(1);
          cursor = i + 1;
        } else {
          value += mask[i];
        }
      }

      if (cursor < first) {
        cursor = first;
      }

      el.value = value;
      el.clean = el.value.replace(/[^0-9]/gm, '');
      el.setSelectionRange(cursor, cursor);
    }

    el.addEventListener('focus', (event) => {
      event.preventDefault();
    });

    el.addEventListener('click', (event) => {
      event.preventDefault();
      let start = el.value.indexOf('_');

      if (start == -1) {
        start = el.value.length;
      }

      el.setSelectionRange(start, start);
    });

    el.addEventListener('paste', (event) => {
      const start = el.selectionStart;

      if (start < first) {
        el.value = '_' + el.value;
      }
    });

    el.addEventListener('input', (event) => {
      const start = el.selectionStart;
      maskIt(event, start);
    });
  }
};
