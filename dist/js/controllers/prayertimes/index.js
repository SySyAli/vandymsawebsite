"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getTodayPrayerTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const data = yield fetch(`http://api.aladhan.com/v1/calendar?latitude=36.14479431053963&longitude=-86.80420024114342&method=2&month=${date.getMonth() + 1}&year=${date.getFullYear()}`);
            console.log(data);
            res.status(201).json({ "prayerTimes": data });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.default = getTodayPrayerTime;
