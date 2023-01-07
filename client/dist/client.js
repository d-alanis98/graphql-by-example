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
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const graphqlResponseElement = document.querySelector('#graphql_response');
    if (!graphqlResponseElement)
        return console.error('Element not found');
    const initializeGraphqlResponseElement = () => {
        graphqlResponseElement.textContent = 'Fetching...';
    };
    const fetchGreeting = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query { 
                        greeting 
                    }
                `
            })
        });
        const data = yield response.json();
        if (data.hasOwnProperty('error'))
            throw new Error(data.error);
        renderResponseInGraphqlResponseElement(data);
    });
    const renderResponseInGraphqlResponseElement = (response) => {
        graphqlResponseElement.textContent = response.data.greeting;
    };
    initializeGraphqlResponseElement();
    yield fetchGreeting();
}));
