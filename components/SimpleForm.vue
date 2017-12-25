<template>
  <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <div v-show="hasError('email')" class="alert alert-warning" role="alert">
              {{ getInputErrorMessage('email') }}
          </div>
          <input name="muno-email" v-model="inputData.email" @focus="touchInput('email')" @focusout="input('email')" type="email" class="form-control" placeholder="Địa chỉ email của bạn">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Mật khẩu</label>
          <div v-show="hasError('password')" class="alert alert-warning" role="alert">
              {{ getInputErrorMessage('password') }}
          </div>
          <input name="muno-password" v-model="inputData.password" @focus="touchInput('password')" @focusout="input('password')" type="password" class="form-control" placeholder="Mật khẩu" aria-describedby="passwordHelp" >
          <small id="passwordHelp" class="form-text text-muted">Mật khẩu phải dài ít nhất 8 kí tự, trong đó có phải có kí tự số, kí tự thường & kí tự in hoa</small>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
</template>

<script>
import Joi from 'joi';

const validationRules = {
  email: Joi.string().trim().email().required().error((errors) => {
    const errorType = errors[0].type;
  
    if (/email/.test(errorType)) {
      return new Error('Có vẻ như email của bạn không hợp lệ');
    }

    return new Error('Vui lòng nhập địa chỉ email');    
  }),
  password: Joi.string().min(8).regex(/\d/, 'digit').regex(/[a-z]/, 'lower').regex(/[A-Z]/, 'upper').required().error((errors) => {
    const errorType = errors[0].type;

    if (/min/.test(errorType)) {
      return new Error('Mật khẩu phải dài ít nhất 8 kí tự');
    }

    if (/regex/.test(errorType)) {
      const contrainstType = errors[0].context.name; 
      if (contrainstType === 'digit') {
        return new Error('Mật khẩu phải có ít nhất một ký tự số')
      }

      if (contrainstType === 'lower') {
        return new Error('Mật khẩu phải có ít nhất một ký tự thường')
      }

      if (contrainstType === 'upper') {
        return new Error('Mật khẩu phải có ít nhất một ký tự in hoa')
      }
    }

    return new Error('Vui lòng nhập mật khẩu');
  }),
};
const validationMessages = {

};

const validationSchema = Joi.object()
  .keys(validationRules);

export default {
  data: () => ({
    inputValidations: {
      email: {
        touched: false,
        inputted: false,
        valid: false,
        message: '',
        drity: '',
      },
      password: {
        touched: false,
        inputted: false,
        valid: false,
        message: '',
        drity: '',
      },
    },
    inputData: {
      email: null,
      password: null,
    }
  }),

  computed: {

  },

  methods: {
    isDirty(key) {
      return this.inputValidations[key].touched && this.inputValidations[key].inputted;
    },

    hasError(key) {
      if (!this.isDirty(key)) return false;
      const validationResult = validationRules[key].validate(this.inputData[key]);

      if (validationResult.error) {
        this.inputValidations[key].message = validationResult.error.message;
        return true;
      }

      return false;
    },

    getInputErrorMessage(key) {
      return this.inputValidations[key].message;
    },

    touchInput(key) {
      this.inputValidations[key].touched = true;
    },

    input(key) {
      this.inputValidations[key].inputted = true;
    }
  },
}
</script>

