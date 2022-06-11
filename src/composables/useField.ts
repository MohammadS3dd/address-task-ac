import { reactive, ref, Ref, watch } from "vue";

const min = {
  name: "min",
  argsLength: 1,
  func: (val: string, min: number) => {
    return val.length >= min
      ? { error: false }
      : { error: true, message: `ورودی حداقل باید ${min} کاراکتر باشد.` };
  },
};

const required = {
  name: "required",
  argsLength: 0,
  func: (val: string) => {
    return val.length > 0
      ? { error: false }
      : { error: true, message: "این مقدار الزامی است." };
  },
};
const phone = {
  name: "phone",
  argsLength: 0,
  func: (val: string) => {
    return val.match(/^0[0-9]{2,}[0-9]{7,}$/g)
      ? { error: false }
      : { error: true, message: "شماره تلفن صحیح نیست." };
  },
};
const mobile = {
  name: "phone",
  argsLength: 0,
  func: (val: string) => {
    return val.match(/^(\+98|0098|98|0)?9\d{9}$/g)
      ? { error: false }
      : { error: true, message: "شماره تلفن صحیح نیست." };
  },
};

const rules = {
  min,
  required,
  phone,
  mobile,
};

// validation in form of name:arg1,arg2. ie. min:3 . len:2,10
const parseValidation = (validation: string) => {
  return {
    rule: validation.split(":")[0],

    args:
      (validation.split(":")[1] && validation.split(":")[1].split(",")) || [],
  };
};
const useField = function (
  field: Ref<string | number>,
  validations: Array<string>,
  stopValidation: Ref<boolean>
) {
  const res = reactive({ errors: [] });
  if (!stopValidation) {
    stopValidation = ref(false);
  }
  watch(field, function (newValue) {
    res.errors.splice(0, res.errors.length);
    if (stopValidation.value) return;

    validations.forEach((validation) => {
      const { rule, args } = parseValidation(validation);

      if (!rules[rule]) throw new Error(`${rule} is not a valid rule.`);
      if (rules[rule].argsLength !== args.length)
        throw new Error(`${rule} has wrong number of arguments.`);
      const ruleFunc = rules[rule];
      const validated = ruleFunc.func(newValue, ...args);
      if (validated.error) {
        res.errors.push(validated.message);
      }
    });
  });
  return res;
};
export default useField;
