'use client';

import styled, { keyframes } from 'styled-components';
import { Text } from '@bigcommerce/big-design';
import { CheckIcon } from '@bigcommerce/big-design-icons';

import React from 'react';

interface AnimatedButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}


export default function AnimatedButton({ text, onClick }: AnimatedButtonProps) {

  return (
    <NewButton
    onClick={onClick}
      >
        <CheckIcon color={'primary'} /> 
        <Text as="span">{text}</Text>
    </NewButton>
  );
}



const extend = keyframes`
  0% {
    width: 155px;
    height: 36px;
    border-radius: 6px;  // Proportional to original 100px
  }
  10% {
    width: 160px;  // Small increase
    height: 37.5px; // Small increase
    background: #9EB3FC;
    margin-left: -2.5px;  // Half of before
    margin-top: -0.75px;  // Proportional adjustment
  }
  20% {
    width: 155px;
    height: 36px;
    background: #DBE3FE;
    margin-left: 0px;
    margin-top: 0px;
  }
  100% {
    width: 85px;  // Adjusted proportionally
    height: 36px;
    border-radius: 6px;  // Proportional to original 100px
    margin-left: 35px;  // Adjusted proportionally
    background: #ffffff;
    border-color: #3C64F4;
  }
`;

const disappear = keyframes`
  0% {
    opacity: 1;
  }
  20% {
    color: #fff;
  }
  100% {
    opacity: 0;
  }
`;

const appear = keyframes`
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const NewButton = styled.button`
  && {
    -webkit-transition: all 150ms ease-out;
    transition: all 150ms ease-out;
    -webkit-transition-property: background-color,border-color,box-shadow,color;
    transition-property: background-color,border-color,box-shadow,color;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #D9DCE9;
    border-radius: 0.25rem;
    color: #FFFFFF;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;

    height: 2.25rem;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 2rem;
    outline: none;
    padding: 0 1rem;
    position: relative;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
    background-color: #3C64F4;
    border-color: #3C64F4;
    font-weight: 600;
  }
  &&:hover {
    background-color: #2852EB;
  }
  & + .bd-button {
    margin-left: 0.5rem;
  }
  &:focus {
    animation: ${extend} 1s ease-in-out forwards;
  }

  &:focus > span {
    animation: ${disappear} 1s ease-in-out forwards;
  }

  &:focus > svg {
    animation: ${appear} 1s ease-in-out forwards;
  }

  & > span {
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 600;

    &:focus {
      animation: ${disappear} 1s ease-in-out forwards;
      opacity: 0;
    }
  }

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;

    &:focus {
      animation: ${appear} 1s ease-in-out forwards;
    }
  }
`;