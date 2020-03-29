const $table = document.getElementById('table');

let currentElem = null;

$table.addEventListener('mouseover', (event) => {
  // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
  // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
  // это переход внутри - игнорируем такое событие
  if (currentElem) {
    return;
  }
  let target = event.target;
  // target = target.closest('td');

  while (target !== null && target.tagName !== 'TD') {
    target = target.parentNode;
  }
  // переход не на <td> - игнорировать
  if (!target) {
    return;
  }

  // ура, мы зашли на новый <td>
  currentElem = target;
  target.style.background = 'pink';
});

$table.addEventListener('mouseout', (event) => {
  // если мы вне <td>, то игнорируем уход мыши
  // это какой-то переход внутри таблицы, но вне <td>,
  // например с <tr> на другой <tr>
  if (!currentElem) {
    return;
  }

  // мы покидаем элемент – но куда? Возможно, на потомка?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
    // если да, то это переход внутри элемента – игнорируем
    if (relatedTarget == currentElem) {
      return;
    }
    relatedTarget = relatedTarget.parentNode;
  }
  // мы действительно покинули элемент
  currentElem.style.background = '';
  currentElem = null;
});