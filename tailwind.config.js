import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './resources/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                montane: {
                    DEFAULT: '#0F382C',
                    950: '#002218',
                    900: '#0F382C',
                    800: '#184E3F',
                    700: '#274E41',
                    600: '#3F6658',
                    500: '#527F6F',
                    200: '#A6D0BE',
                    100: '#C1ECDA',
                    50: '#F0F9F5',
                },
                terroir: {
                    DEFAULT: '#8B5A2B',
                    900: '#2E1500',
                    800: '#683D0F',
                    700: '#835425',
                    600: '#8B5A2B',
                    500: '#C27D38',
                    200: '#F9BA82',
                    100: '#FFDCC1',
                    50: '#FDF8F3',
                },
                hydro: {
                    DEFAULT: '#0EA5E9',
                    900: '#001E2F',
                    800: '#00354F',
                    700: '#0369A1',
                    600: '#0284C7',
                    500: '#0EA5E9',
                    200: '#89CEFF',
                    100: '#C9E6FF',
                    50: '#F0F9FF',
                },
                ground: '#F8FAF8',
                semaforo: {
                    sobresaliente: '#0EA5E9',
                    alto: '#10B981',
                    moderado: '#F59E0B',
                    alerta: '#F97316',
                    critico: '#EF4444',
                },
                cafe: {
                    50: '#f7f3ee',
                    100: '#ede2d3',
                    200: '#dbc4a7',
                    300: '#c5a276',
                    400: '#ad7f4f',
                    500: '#8f6339',
                    600: '#734d2e',
                    700: '#5a3b25',
                    800: '#432b1c',
                    900: '#2e1d13',
                },
            },
            boxShadow: {
                'glass-subtle': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 56, 44, 0.02)',
                'glass-card': '0 4px 14px -2px rgba(15, 56, 44, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
                'glass-elevated': '0 12px 28px -4px rgba(15, 56, 44, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
                'glass-modal': '0 24px 48px -12px rgba(15, 56, 44, 0.22)',
            },
        },
    },
    plugins: [forms],
};
