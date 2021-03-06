/**
 * Реализация глобальных функций (валидация и сбор данных с форм)
 * @param input 
 */

// сбор данных с форм (input)
window.onChange = (input: HTMLInputElement) => {
    console.log(`${input.id}: ${input.value}`);
}

// общая валидация форм 
window.inputOnblur = (input: HTMLInputElement) => {
    let isEmpty = CheckInputValueEmpty(input);
    let message = isEmpty ? 'Данное поле должно быть заполнено' : '';

    window.applyValidation([input], isEmpty, message);
};

window.inputPasswordOnblur = (input: HTMLInputElement) => {
    let isEmpty = CheckInputValueEmpty(input);
    let message = isEmpty 
                    ? 'Данное поле должно быть заполнено'
                        : (input.value.length < 10)
                            ? 'Пароль должен содержать не менее 10 символов'
                                : '';

    let invalid = message !== '';

    window.applyValidation([input], invalid, message);
};

window.inputEmailOnblur = (input: any) => {
    let isEmpty = CheckInputValueEmpty(input);
    let message = isEmpty 
                    ? 'Данное поле должно быть заполнено'
                        : (!input.value.includes('@') || input.value.length < 10)
                            ? 'Email некорректный'
                                : '';

    let invalid = message !== '';

    window.applyValidation([input], invalid, message);
};

// удаляем индикатор ошибки, когда курсор снова установлен на форме
window.inputOnfocus = (input: HTMLInputElement) => {
    if (!input.classList.contains('invalid')) return;

    input.classList.remove('invalid');
    let error = document.getElementById(`${input.id}_error`);
    if (!error) return;
    error.textContent = '';
  };

/** Функция проверяет валидность введённых параметров перед сохранением. 
  * Если хотя бы одно поле не валидно (т. е. имеется индикатор ошибки, значение - пусто/null/undefined) или пароли не совпадают, то возвращать false.
  * @param parameters - список параметров 
  */
 window.checkOnValid = (parameters: any[]) => {
     let valid = true;

     parameters.forEach((x: { id: string; title: string; value: string; }) => {
            let element = document.getElementById(x.id) as HTMLInputElement
            if (element) {
                let errorElement = document.getElementById(`${x.id}_error`);
                if (errorElement?.textContent !== '') {
                    valid = false;
                    return;
                }

                if (CheckInputValueEmpty(element)) {
                    valid = false;
                    window.applyValidation([element], !valid, 'Данное поле должно быть заполнено');
                    return;
                }

                if (element.id === 'newPassword') {
                    let newPassword = element;
                    let newPasswordAgain = document.getElementById('newPasswordAgain') as HTMLInputElement;
                    
                    if (newPassword.value !== newPasswordAgain.value) {
                        valid = false;
                        window.applyValidation([newPassword, newPasswordAgain], !valid, 'Пароли не совпадают');
                        return;
                    }
                } 
            }
        });

        return valid;
    }

// если поле/поля невалидны, выделить формы (цветом), вывести сообщение об ошибке
window.applyValidation = (inputs: HTMLInputElement[], invalid: boolean, message: string) => {
    if (!invalid) return;

    Array.prototype.forEach.call(inputs, (x: HTMLInputElement) =>
    { 
        x.classList.add('invalid');
        let error = document.getElementById(`${x.id}_error`);
        if (!error) return;
        error.textContent = message;
    });
}

function CheckInputValueEmpty(input: HTMLInputElement) {
    return !input || input?.value?.trim()?.length == 0;
}