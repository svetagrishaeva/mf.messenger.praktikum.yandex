import { Block } from "../../utils/block.js";

export class PageBase extends Block {
    // общая валидация форм   
    inputOnblur(e: InputEvent) {
        let input = e.target as HTMLInputElement;
        let isEmpty = this.сheckInputValueEmpty(input);
        let message = isEmpty ? 'Данное поле должно быть заполнено' : '';

        this.applyValidation([input], isEmpty, message);
    };

    inputPasswordOnblur(e: InputEvent) {
        let input = e.target as HTMLInputElement;
        let isEmpty = this.сheckInputValueEmpty(input);
        let message = isEmpty 
                        ? 'Данное поле должно быть заполнено'
                            : (input.value.length < 8)
                                ? 'Пароль должен содержать не менее 8 символов'
                                    : '';

        let invalid = message !== '';

        this.applyValidation([input], invalid, message);
    };

    inputEmailOnblur(e: InputEvent) {
        let input = e.target as HTMLInputElement;
        let isEmpty = this.сheckInputValueEmpty(input);
        let message = isEmpty 
                        ? 'Данное поле должно быть заполнено'
                            : (!input.value.includes('@') || input.value.length < 8)
                                ? 'Email некорректный'
                                    : '';

        let invalid = message !== '';

        this.applyValidation([input], invalid, message);
    };

    // удаляем индикатор ошибки, когда курсор снова установлен на форме
    inputOnfocus(e: InputEvent) {
        let input = e.target as HTMLInputElement;
        if (!input.classList.contains('invalid')) return;

        input.classList.remove('invalid');
        let error = document.getElementById(`${input.id}_error`);
        if (!error) return;
        error.textContent = '';
    };

    // если поле/поля невалидны, выделить формы (цветом), вывести сообщение об ошибке
    applyValidation(inputs: HTMLInputElement[], invalid: boolean, message: string) {
        if (!invalid) return;

        Array.prototype.forEach.call(inputs, (x: HTMLInputElement) =>
        { 
            x.classList.add('invalid');
            let error = document.getElementById(`${x.id}_error`);
            if (!error) return;
            error.textContent = message;
        });
    }

    /*
     * Функция проверяет валидность введённых параметров перед сохранением. 
     * Если хотя бы одно поле не валидно (т. е. имеется индикатор ошибки, значение - пусто/null/undefined) или пароли не совпадают, то возвращать false.
     * @param parameters - список параметров 
     */
    checkOnValid = (parameters: any[], isPasswordChange: boolean = false) => {
        let valid = true;
   
        parameters.forEach((x: { id: string; title: string; value: string; }) => {
            let element = document.getElementById(x.id) as HTMLInputElement
            if (element) {
                let errorElement = document.getElementById(`${x.id}_error`);
                if (errorElement?.textContent !== '') {
                    valid = false;
                    return;
                }

                if (this.сheckInputValueEmpty(element)) {
                    valid = false;
                    this.applyValidation([element], !valid, 'Данное поле должно быть заполнено');
                    return;
                }

                let password = !isPasswordChange ? 'password' : 'newPassword';
                if (element.id === password) {
                    let newPassword = element;
                    let newPasswordAgain = document.getElementById('passwordAgain') as HTMLInputElement;
                    if (!newPasswordAgain) return;
                    
                    if (newPassword.value !== newPasswordAgain.value) {
                        valid = false;
                        this.applyValidation([newPassword, newPasswordAgain], !valid, 'Пароли не совпадают');
                        return;
                    }
                } 
            }
        });
   
        return valid;
    }

    private сheckInputValueEmpty(input: HTMLInputElement) {
        return !input || input?.value?.trim()?.length == 0;
    }
}
