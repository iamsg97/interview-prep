/**
 * @description This code defines a class `MyClass` that customizes the behavior of the `instanceof` operator.
 * By implementing a static method using the special symbol `Symbol.hasInstance`,
 * it allows you to control what is considered an "instance" of `MyClass`.
 *
 * In this case, any object with a truthy `customFlag` property will return `true`
 * when checked with `obj instanceof MyClass`,
 * regardless of its prototype chain. This is a way to override the default `instanceof` logic.
 */
class MyClass {
    static [Symbol.hasInstance](obj) {
        return !!obj.customFlag;
    }
}
const obj = { customFlag: true };
console.log(obj instanceof MyClass); // true
