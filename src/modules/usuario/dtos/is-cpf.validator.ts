import { registerDecorator, ValidationOptions } from 'class-validator';

export function cpfValido(cpf: string): boolean {
    if(!/^\d{11}$/.test(cpf)) {
        return false;
    }

    if(/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for(let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let digito = (soma * 10) % 11;
    if(digito === 10) {
        digito = 0;
    }

    if(digito !== Number(cpf[9])) {
        return false;
    }

    soma = 0;
    for(let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    digito = (soma * 10) % 11;
    if(digito === 10) {
        digito = 0;
    }

    return digito === Number(cpf[10]);
}

export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isCpf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    return typeof value === 'string' && cpfValido(value);
                },
            },
        });
    };
}