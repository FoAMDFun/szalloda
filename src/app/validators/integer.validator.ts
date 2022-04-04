import { AbstractControl, ValidationErrors } from '@angular/forms';

// 1.0000000000000001 erre már nem ad hibát => az már 1
export function integerValidator(input: AbstractControl):ValidationErrors|null {
  if (+input.value != input.value) {
    return null
  }
  return (input.value*10)%10===0 ? null :{integerError:'A szám nem egész'}
}


