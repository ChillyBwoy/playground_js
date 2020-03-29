(function () {
  /**
   * Here is a sample html file with a submit button. Now modify the style of the paragraph text through javascript code
   */
  const $button = document.getElementById('jsstyle_button');
  $button.addEventListener('click', event => {
    const $p = document.getElementById('jsstyle_text');

    $p.style.fontFamily = 'Arial, sans-serif';
    $p.style.fontSize = 24;
    $p.style.color = '#f00';
  });
}());


(function () {
  /**
   * Write a JavaScript function to get the values of First and Last name of the following form
   */
  const $form = document.getElementById('form1');
  $form.addEventListener('submit', event => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    console.log(formData.get('fname'), formData.get('lname'));

    const $fname = target.querySelector('[name="fname"]');
    const $lname = target.querySelector('[name="lname"]');
    console.log($fname.value, $lname.value);


    console.log(
      document.forms.form1.elements.fname.value,
      document.forms.form1.elements.lname.value,
    );

  });
}());


(function () {
  /**
   * Write a JavaScript program to set the background color of a paragraph
   */

  const $p = document.getElementById('paragrah_color_text');
  const $button = document.getElementById('paragrah_color_button');

  $button.addEventListener('click', event => {
    $p.style.backgroundColor = 'red';
  });
}());


(function () {
  /**
   * Here is a sample html file with a submit button. Write a JavaScript function to get the value of the href, hreflang, rel, target, and type attributes of the specified link.
   */

  const $button = document.getElementById('attributes_button');
  const $a = document.getElementById('attributes_link');
  $button.addEventListener('click', event => {
    for (let attr of $a.attributes) {
      console.log(`${attr.name} = ${attr.value}`);
    }
  });
}());

(function () {
  /**
   * Write a JavaScript function to add rows to a table
   */

  const $button = document.getElementById('table_rows_button');
  const $table = document.getElementById('table_rows_table');

  $button.addEventListener('click', event => {
    let $tr = document.createElement('tr');
    let rowSize = 0;
    let size = $table.querySelectorAll('tr').length;

    $table.querySelectorAll('tr').forEach($el => {
      let len = $el.querySelectorAll('td').length;
      if (len > rowSize) {
        rowSize = len;
      }
    });

    let $frag = document.createDocumentFragment();

    for (let i = 1; i <= rowSize; i++) {
      let $tr = document.createElement('td');
      $tr.innerText = `Row${size + 1} cell${i}`;
      $frag.appendChild($tr);
    }

    $tr.appendChild($frag);
    $table.appendChild($tr);
  });
}());


(function () {
  /**
   * Write a JavaScript function that accept row, column, (to identify a particular cell) and a string to update the content of that cell
   */

  const $form = document.getElementById('table_row_col_form');
  const $table = document.getElementById('table_row_col_table');

  function update(row, col) {
    const $row = $table.rows[row];
    if (!$row) {
      return;
    }
    const $col = $row.cells[col];
    if (!$col) {
      return;
    }

    $col.innerText = `${Math.random()}`;
  }

  $form.addEventListener('submit', event => {
    event.preventDefault();
    const row = parseInt($form.querySelector('[name="row"]').value, 10);
    const col = parseInt($form.querySelector('[name="col"]').value, 10);
    update(row, col);
  });
}());


(function () {
  /**
   * Write a JavaScript function that creates a table, accept row, column numbers from the user, and input row-column number as content (e.g. Row-0 Column-0) of a cell.
   */

  const $form = document.getElementById('create_table_form');
  const $table = document.getElementById('create_table_table');

  function create(rows, cols) {
    const $frag = document.createDocumentFragment();

    for (let i = 0; i < rows; i++) {
      const $trFrag = document.createDocumentFragment();

      for (let j = 0; j < cols; j++) {
        const $td = document.createElement('td');
        $td.innerText = `Row-${i} Column-${j}`;
        $trFrag.appendChild($td);
      }

      const $tr = document.createElement('tr');
      $tr.appendChild($trFrag);
      $frag.appendChild($tr);
    }

    $table.appendChild($frag);
  }

  $form.addEventListener('submit', event => {
    event.preventDefault();

    create(3, 4);
  });
}());


(function () {
  /**
   * Write a JavaScript program to remove items from a dropdown list
   */

  const $form = document.getElementById('dropdown_form');
  const $select = document.getElementById('dropdown_select');

  $form.addEventListener('submit', event => {
    event.preventDefault();

    const index = $select.selectedIndex;
    $select.remove(index);
  });
}());


(function () {
  /**
   * Write a JavaScript program to count and display the items of a dropdown list, in an alert window.
   */

  const $form = document.getElementById('dropdown_items_form');
  const $select = document.getElementById('dropdown_items_select');

  $form.addEventListener('submit', event => {
    event.preventDefault();

    const $elems = $select.options;

    let txt = `Count: ${$elems.length}\n`;

    for (let $el of $elems) {
      txt += `${$el.text}\n`;
    }

    alert(txt);
  });
}());


(function () {
  /**
   * Write a JavaScript program to calculate the volume of a sphere
   */

  const $form = document.getElementById('sphere_form');
  $form.addEventListener('submit', event => {
    event.preventDefault();

    const radius = parseFloat($form.elements.radius.value);
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    $form.elements.volume.value = volume.toFixed(4);
  });
}());


(function () {
  /**
   * Write a JavaScript program to display a random image (clicking on a button) from the following list
   */

  var IMAGES = [{
    src: "http://farm4.staticflickr.com/3691/11268502654_f28f05966c_m.jpg",
    width: "240",
    height: "160"
  }, {
    src: "http://farm1.staticflickr.com/33/45336904_1aef569b30_n.jpg",
    width: "320",
    height: "195"
  }, {
    src: "http://farm6.staticflickr.com/5211/5384592886_80a512e2c9.jpg",
    width: "500",
    height: "343"
  }];

  const $form = document.getElementById('random_image_form');
  const $container = document.getElementById('random_image_img');

  $form.addEventListener('submit', event => {
    event.preventDefault();

    const index = Math.floor(IMAGES.length * Math.random());
    const $img = document.createElement('img');

    $img.width = IMAGES[index].width;
    $img.height = IMAGES[index].height;
    $img.src = IMAGES[index].src;

    $container.innerHTML = '';
    $container.appendChild($img);
  });

}());

(function () {
  /**
   *  Write a JavaScript program to highlight the bold words of the following paragraph, on mouse over a certain link
   */

  const $link = document.getElementById('bold_link');
  const $p = document.getElementById('bold_p');

  const handleOver = () => {
    const $els = $p.querySelectorAll('strong');
    $els.forEach($el => {
      $el.style.color = 'red';
    });
  };
  const handleOut = () => {
    const $els = $p.querySelectorAll('strong');
    $els.forEach($el => {
      $el.style.color = 'inherit';
    });
  };

  $link.addEventListener('mouseover', handleOver);
  $link.addEventListener('mouseout', handleOut);
}());


(function () {
  /**
   * Write a JavaScript program to get the width and height of the window (any time the window is resized
   */

  window.addEventListener('resize', () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    console.log(width, height);
  });
}());
