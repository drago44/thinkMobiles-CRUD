import { defineRule, configure } from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  alpha_spaces as alphaSpaces,
  confirmed
} from '@vee-validate/rules';

defineRule('required', required);
defineRule('min', min);
defineRule('max', max);
defineRule('email', email);
defineRule('alpha_spaces', alphaSpaces);
defineRule('password_mismatch', confirmed);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The field ${ctx.field} is required.`,
      min: `The field ${ctx.field} is too short.`,
      max: `The field ${ctx.field} is too long.`,
      email: `The field ${ctx.field} must be a valid email.`,
      alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
      password_mismatch: "The password don't match."
    };

    const message = messages[ctx.rule.name]
      ? messages[ctx.rule.name]
      : `The field ${ctx.field} is invalid`;

    return message;
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true
});
