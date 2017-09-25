function h(tag, props, children) {
  var el = document.createElement(tag);

  props && Object.keys(props).forEach(function(prop) {
    el[prop] = props[prop];
  });

  if (children && Array.isArray(children)) {
    children.forEach(function(child) {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });
  } else if (children && (typeof children === 'string' || typeof children === 'number')) {
    el.textContent = children;
  } else if (children !== null && children !== undefined) {
    try {
      el.appendChild(children);
    } catch(err) {
      throw new Error(err);
    }
  }

  return el;
}

function render(el, parent) {
  parent.appendChild(el);
}
