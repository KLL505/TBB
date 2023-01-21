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
const discord_js_1 = require("discord.js");
const simpleWolframAPI = "http://api.wolframalpha.com/v1/result?appid=" + process.env.WOLFRAMAPPID;
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask the bot a question resulting in a simple answer')
        .addStringOption(option => option.setName('question').setDescription('The question you want answered').setRequired(true)),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var question = (_a = interaction.options.getString('question')) !== null && _a !== void 0 ? _a : "";
            var query = simpleWolframAPI + "&i=" + encodeURIComponent(question);
            fetch(query).then(res => {
                return res.text();
            }).then(data => {
                interaction.reply({
                    content: `Q: ${question}\nA: ${data}`
                });
            });
        });
    },
};
