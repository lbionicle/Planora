import { hexWithOpacity } from '../lib';

export const palette = {
  blue: {
    900: '#001166',
    700: '#08257A',
    500: '#1C398E',
    80: hexWithOpacity('#1C398E', 80),
    60: hexWithOpacity('#1C398E', 60),
    50: hexWithOpacity('#1C398E', 50),
    40: hexWithOpacity('#1C398E', 40),
    30: hexWithOpacity('#1C398E', 30),
    20: hexWithOpacity('#1C398E', 20),
    10: hexWithOpacity('#1C398E', 10),
  },
  skyBlue: {
    100: '#A2BFFF',
    20: hexWithOpacity('#A2BFFF', 20),
  },
  darkGray: {
    100: '#79808B',
  },
  lightGray: {
    100: '#F3F4F4',
  },
  gray: {
    100: '#D8DBDD',
    80: hexWithOpacity('#D8DBDD', 80),
    60: hexWithOpacity('#D8DBDD', 60),
    40: hexWithOpacity('#D8DBDD', 40),
    20: hexWithOpacity('#D8DBDD', 20),
  },
  white: {
    100: '#F8F8F8',
    80: hexWithOpacity('#F8F8F8', 80),
  },
  black: {
    100: '#1B1A1D',
    80: hexWithOpacity('#1B1A1D', 80),
    60: hexWithOpacity('#1B1A1D', 60),
    40: hexWithOpacity('#1B1A1D', 40),
    30: hexWithOpacity('#1B1A1D', 30),
    20: hexWithOpacity('#1B1A1D', 20),
    10: hexWithOpacity('#1B1A1D', 10),
    5: hexWithOpacity('#1B1A1D', 5),
  },
  green: {
    100: '#408763',
    50: hexWithOpacity('#408763', 50),
    30: hexWithOpacity('#408763', 30),
    10: hexWithOpacity('#408763', 10),
  },
  red: {
    100: '#DB5454',
    50: hexWithOpacity('#DB5454', 50),
    30: hexWithOpacity('#DB5454', 30),
    10: hexWithOpacity('#DB5454', 10),
  },
} as const;
