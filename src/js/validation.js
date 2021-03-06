import '../css/style.css';
import '../css/validation.css';

const VALIDATORS = {
  required(formData, name) {
    const value = formData.get(name) || '';
    if (value.trim() === '') {
      return `Field "${name}" is required`;
    }
  },

  email(formData, name) {
    const value = formData.get(name);
    if (!/^[a-zA-Z0-9\.-_]+\@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value.trim())) {
      return `Invalid email "${value}" in field "${name}"`;
    }
  },

  maxLength(formData, name, max) {
    const value = formData.get(name);
    if (value.trim().length > parseInt(max, 10)) {
      return `The value of field "${name}" is greater then ${max}`;
    }
  },

  minLength(formData, name, min) {
    const value = formData.get(name);
    if (value.trim().length < parseInt(min, 10)) {
      return `The value of field "${name}" is less then ${min}`;
    }
  },

  matchField(formData, name, field) {
    const value1 = formData.get(name);
    const value2 = formData.get(field);
    if (value1.trim() !== value2.trim()) {
      return `Field "${name}" does not match field "${field}"`;
    }
  },

  withinRange(formData, name, from, to) {
    const value = parseFloat(formData.get(name) || 0);
    const min = parseFloat(from);
    const max = parseFloat(to);

    if (value < min || value > max) {
      return `The value of field "${name}" is out of range: ${from}-${to}`;
    }
  }
};

const parseValidators = (str) => {
  const tokens = str.split(';');
  return tokens.map(token => {
    const [name, paramsStr] = token.split(/\(|\)/);
    const params = paramsStr ? paramsStr.split(',').map(x => x.trim()) : [];

    console.log(token, '\nname:', name, '\nargs:', paramsStr);

    if (!VALIDATORS[name]) {
      throw new Error(`Invalid validator "${name}"`);
    }

    const validator = VALIDATORS[name];
    return (formData, name) => validator(formData, name, ...params);
  });
};

const highlightErrors = ($form) => {

};

const tokenValidation = ($form) => {
  const errors = new Map();

  const formData = new FormData($form);

  $form.querySelectorAll('.form-field').forEach($field => {
    const $el = $field.querySelector('[data-type="field"]');
    if (!$el) {
      return;
    }

    const validateBy = $el.dataset.validateBy;
    if (!validateBy) {
      return null
    }

    const name = $el.name;
    const value = formData[$el.name];
    const validators = parseValidators(validateBy);

    const fieldErrors = [];
    for (const validator of validators) {
      const maybeError = validator(formData, name);
      if (typeof maybeError !== 'undefined') {
        fieldErrors.push(maybeError);
      }
    }

    if (fieldErrors.length > 0) {
      errors.set(name, fieldErrors);
    }

    const $errors = $field.querySelector('[data-type="field-errors"]');
    if ($errors) {
      $errors.remove();
    }

    if (fieldErrors.length > 0) {
      $field.classList.add('form-field_error');
      const $newErrors = document.createElement('ul');
      $newErrors.classList.add('field-errors');
      $newErrors.setAttribute('data-type', 'field-errors');

      const $fr = document.createDocumentFragment();
      for (const err of fieldErrors) {
        const $li = document.createElement('li');
        $li.innerText = err;
        $fr.appendChild($li);
      }

      $newErrors.appendChild($fr);
      $field.appendChild($newErrors);
    } else {
      $field.classList.remove('form-field_error');
    }

    if (errors.size !== 0) {
      event.preventDefault();
    }
  });
};

const VALIDATORS_PLAIN = {
  'first_name': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.minLength(formData, name, 3),
    (name, formData) => VALIDATORS.maxLength(formData, name, 20),
  ],
  'last_name': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.minLength(formData, name, 3),
    (name, formData) => VALIDATORS.maxLength(formData, name, 20),
  ],
  'age': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.withinRange(formData, name, 18, 99),
  ],
  'email': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.email(formData, name),
  ],
  'country': [
    (name, formData) => VALIDATORS.required(formData, name),
  ],
  'password': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.minLength(formData, name, 6),
    (name, formData) => VALIDATORS.maxLength(formData, name, 30),
    (name, formData) => VALIDATORS.matchField(formData, name, 'password_confirm'),
  ],
  'password_confirm': [
    (name, formData) => VALIDATORS.required(formData, name),
    (name, formData) => VALIDATORS.minLength(formData, name, 6),
    (name, formData) => VALIDATORS.maxLength(formData, name, 30),
    (name, formData) => VALIDATORS.matchField(formData, name, 'password'),
  ],
  'agree': [
    (name, formData) => VALIDATORS.required(formData, name),
  ],
};

const plainValidation = ($form) => {
  const errors = new Map();
  const formData = new FormData($form);

  Object.keys(VALIDATORS_PLAIN).forEach(fieldName => {
    const fieldValidators = VALIDATORS_PLAIN[fieldName];

    const fieldErrors = [];
    for (const validator of fieldValidators) {
      const maybeError = validator(fieldName, formData);
      if (typeof maybeError !== 'undefined') {
        fieldErrors.push(maybeError);
      }
    }

    console.log(fieldName, fieldErrors)

  });

}

const handleFormSubmit = ($form) => {
  // tokenValidation($form);
  plainValidation($form);
};

document.addEventListener('submit', (event) => {
  const { target } = event;
  if (target.dataset.type === 'form') {
    event.preventDefault()
    handleFormSubmit(target);
  }
});