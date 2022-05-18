/*
  @author TAB_mk https://tab.mk <tabmk.contact@gmail.com>
 
  Usage:

  Simple script for debug purpose

  include it on top of <head>:
  <script src="_def.js"></script>

  Only one function is public:
  _def(name, value)
  
  name -- String -- search param key
  value -- Any -- default variable value

  _def('speed', 10)
  => returns 'speed' query param or 10

  _def('speed')
  => returns 'speed' query param or false

  Examples:
  > https://localhost/?speed=123
  > _def('speed', 10)
  => 123

  > https://localhost/
  > _def('speed', 10)
  => 10

  > https://localhost/
  > _def('speed')
  => false

  Params editor included:
  by opening page with 'editor' param (Ex.: https://localhost/?editor)
  Page will be replaced with editor

  It just print input for each configured key with its type
  And by submiting form, it will forward you to page with your params

  How to configure editor:
  Create global variable and call it "OPTIONS"
  And fill object
  ( HTMLInputTypeAttribute = https://www.w3schools.com/tags/att_input_type.asp )
  {
    [key: string]: {
      type: HTMLInputTypeAttribute
    }
  }

  Example:
  const OPTIONS = {
    speed: {
      type: 'number'
    },
    difficulty: {
      type: 'text'
    },
    final: {
      type: 'checkbox'
    }
  }

  After finishing debug you can just remove this lib
  And if you don want to change code declare new varibale
  const _def = (a, b = false) => b;
  
  it will just return your default variables or false
*/

let _def;

{
  let _OPT = typeof OPTIONS !== 'undefined' ? OPTIONS : {};
  let urlParams = new URLSearchParams(window.location.search);
  
  console.log('%cParams debug is on!', 'background: #000; color: #bada55; font-size: 25px;');
  console.log(JSON.stringify(Object.fromEntries(urlParams), null, 2));

  /**
   * @param   {String}  name search param key
   * @param   {Any}     value=false any value to be default
   * @return  {Any}     passed data to value
   */
  _def = (name, value = false) => {
    const data = urlParams.get(name);
    if (data !== null) {
      return data;
    }

    return value
  }

  // generate editor page on "/?editor" open
  if (urlParams.get('editor') !== null) {
    document.addEventListener('DOMContentLoaded', function(event) {
      // add form element
      const f = document.createElement('form');
      f.setAttribute('method', 'GET');
      f.setAttribute('action', '?');

      // add each key as input
      Object.keys(_OPT).forEach((e) => {
        const br = document.createElement('br');
        const span = document.createElement('p');
        span.textContent = e;
        const i = document.createElement('input');
        i.setAttribute('type', _OPT[e].type);
        i.setAttribute('name', e);
        f.appendChild(span);
        f.appendChild(i);
        f.appendChild(br);
      });

      // add sumbmit btn
      const s = document.createElement('input');
      s.setAttribute('type', 'submit');
      s.setAttribute('value', 'Submit');

      f.appendChild(s);
      document.write('<body></body>');
      document.body.appendChild(f);

      // handle sumbmit
      f.addEventListener('submit', (e) => {
        e.preventDefault();

        // generate object of filled values
        const params = {};
        Array.from(document.getElementsByTagName('input')).forEach((e) => {
          if (e.value === '' || (e.type === 'checkbox' && !e.checked)) return;
            
          switch (e.type) {
            case 'number':
              params[e.name] = e.value;
              break;
            case 'text':
              params[e.name] = e.value;
              break;
            case 'checkbox':
              params[e.name] = e.checked;
              break;
          }
        });
 
        // open page with params
        window.location.href = `?${new URLSearchParams(params).toString()}`;
      });
    });
  }
}
