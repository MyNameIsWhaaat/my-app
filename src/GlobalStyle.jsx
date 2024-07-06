import { createGlobalStyle } from 'styled-components';
import { standard } from '@salutejs/plasma-typo';
import { light, dark } from '@salutejs/plasma-tokens-web/themes';
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@salutejs/plasma-tokens-web';

console.log(background)
const DocumentStyle = createGlobalStyle`
    html {
        color: ${text};
        background-color: var(--plasma-colors-background, #f1f5f7);
    }
`;
const ThemeStyle = createGlobalStyle(light);
const TypoStyle = createGlobalStyle(standard);

export const GlobalStyle = () => (
    <>
        <DocumentStyle/>
        <ThemeStyle />
        <TypoStyle />
    </>
);