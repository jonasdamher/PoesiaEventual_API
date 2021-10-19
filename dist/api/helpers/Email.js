'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Email_to, _Email_subject, _Email_text;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const logger_1 = require("./logger");
/**
 * Para enviar correos electrónicos
 */
class Email {
    constructor() {
        _Email_to.set(this, '');
        _Email_subject.set(this, '');
        _Email_text.set(this, '');
    }
    set to(to) {
        __classPrivateFieldSet(this, _Email_to, to, "f");
    }
    set subject(subject) {
        __classPrivateFieldSet(this, _Email_subject, subject, "f");
    }
    set text(text) {
        __classPrivateFieldSet(this, _Email_text, text, "f");
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const mail_transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: config_1.default.nodemailer.email,
                    pass: config_1.default.nodemailer.password
                }
            });
            let mail_details = {
                from: config_1.default.nodemailer.email,
                to: __classPrivateFieldGet(this, _Email_to, "f"),
                subject: __classPrivateFieldGet(this, _Email_subject, "f"),
                text: __classPrivateFieldGet(this, _Email_text, "f")
            };
            mail_transporter.sendMail(mail_details, function (err, data) {
                if (err) {
                    logger_1.logger_email.info({ err }, 'error to send');
                }
            });
        });
    }
}
exports.default = Email;
_Email_to = new WeakMap(), _Email_subject = new WeakMap(), _Email_text = new WeakMap();
//# sourceMappingURL=Email.js.map